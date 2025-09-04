from flask import Blueprint, request, jsonify
from src.models.property import db, Property, PropertyStatus
from datetime import datetime
import os
from werkzeug.utils import secure_filename

property_bp = Blueprint('property', __name__)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@property_bp.route('/properties', methods=['POST'])
def submit_property():
    """Submit a new property spotting"""
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data or not data.get('address') or not data.get('spotter_email'):
            return jsonify({'error': 'Address and spotter email are required'}), 400
        
        # Create new property
        property = Property(
            address=data['address'],
            postcode=data.get('postcode'),
            latitude=data.get('latitude'),
            longitude=data.get('longitude'),
            photo_url=data.get('photo_url'),
            description=data.get('description'),
            spotter_email=data['spotter_email'],
            spotter_name=data.get('spotter_name'),
            status=PropertyStatus.SUBMITTED
        )
        
        db.session.add(property)
        db.session.commit()
        
        return jsonify({
            'message': 'Property submitted successfully!',
            'property_id': property.id,
            'property': property.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@property_bp.route('/properties', methods=['GET'])
def get_properties():
    """Get all properties with optional filtering"""
    try:
        # Get query parameters
        status = request.args.get('status')
        spotter_email = request.args.get('spotter_email')
        limit = request.args.get('limit', type=int)
        
        # Build query
        query = Property.query
        
        if status:
            query = query.filter(Property.status == PropertyStatus(status))
        
        if spotter_email:
            query = query.filter(Property.spotter_email == spotter_email)
        
        # Order by submission date (newest first)
        query = query.order_by(Property.submission_date.desc())
        
        if limit:
            query = query.limit(limit)
        
        properties = query.all()
        
        return jsonify({
            'properties': [prop.to_dict() for prop in properties],
            'total': len(properties)
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@property_bp.route('/properties/<int:property_id>', methods=['GET'])
def get_property(property_id):
    """Get a specific property by ID"""
    try:
        property = Property.query.get_or_404(property_id)
        return jsonify({'property': property.to_dict()}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@property_bp.route('/properties/<int:property_id>/status', methods=['PUT'])
def update_property_status(property_id):
    """Update property status (admin only)"""
    try:
        data = request.get_json()
        
        if not data or not data.get('status'):
            return jsonify({'error': 'Status is required'}), 400
        
        property = Property.query.get_or_404(property_id)
        
        # Update status
        try:
            new_status = PropertyStatus(data['status'])
            property.status = new_status
            property.last_updated = datetime.utcnow()
            
            # Handle special status updates
            if new_status == PropertyStatus.QUALIFIED and not property.voucher_sent:
                property.voucher_sent = True
                property.voucher_sent_date = datetime.utcnow()
            
            # Update admin notes if provided
            if data.get('admin_notes'):
                property.admin_notes = data['admin_notes']
            
            # Update financial information if provided
            if data.get('estimated_value'):
                property.estimated_value = data['estimated_value']
            if data.get('purchase_price'):
                property.purchase_price = data['purchase_price']
            if data.get('sale_price'):
                property.sale_price = data['sale_price']
                
            # If sold, calculate and mark commission
            if new_status == PropertyStatus.SOLD and property.purchase_price and not property.commission_paid:
                commission_rate = 0.01  # 1%
                max_commission = 2000  # £2000 max
                commission = min(property.purchase_price * commission_rate, max_commission)
                property.commission_amount = commission
                property.commission_paid = True
                property.commission_paid_date = datetime.utcnow()
            
            db.session.commit()
            
            return jsonify({
                'message': 'Property status updated successfully',
                'property': property.to_dict()
            }), 200
            
        except ValueError:
            return jsonify({'error': 'Invalid status value'}), 400
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@property_bp.route('/properties/stats', methods=['GET'])
def get_property_stats():
    """Get property statistics"""
    try:
        total_properties = Property.query.count()
        qualified_properties = Property.query.filter(Property.status == PropertyStatus.QUALIFIED).count()
        sold_properties = Property.query.filter(Property.status == PropertyStatus.SOLD).count()
        
        total_vouchers_sent = Property.query.filter(Property.voucher_sent == True).count()
        total_commissions_paid = Property.query.filter(Property.commission_paid == True).count()
        
        # Calculate total money paid out
        voucher_amount = total_vouchers_sent * 50  # £50 per voucher
        commission_total = db.session.query(db.func.sum(Property.commission_amount)).filter(
            Property.commission_paid == True
        ).scalar() or 0
        
        total_paid_out = voucher_amount + commission_total
        
        return jsonify({
            'total_properties': total_properties,
            'qualified_properties': qualified_properties,
            'sold_properties': sold_properties,
            'total_vouchers_sent': total_vouchers_sent,
            'total_commissions_paid': total_commissions_paid,
            'total_paid_out': total_paid_out,
            'voucher_amount': voucher_amount,
            'commission_total': commission_total
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@property_bp.route('/properties/recent', methods=['GET'])
def get_recent_properties():
    """Get recent property submissions for homepage display"""
    try:
        recent_properties = Property.query.filter(
            Property.status.in_([PropertyStatus.QUALIFIED, PropertyStatus.SOLD])
        ).order_by(Property.submission_date.desc()).limit(10).all()
        
        return jsonify({
            'recent_properties': [
                {
                    'id': prop.id,
                    'address': prop.address,
                    'status': prop.status.value,
                    'submission_date': prop.submission_date.isoformat(),
                    'spotter_name': prop.spotter_name or 'Anonymous'
                }
                for prop in recent_properties
            ]
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


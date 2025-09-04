from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from enum import Enum

db = SQLAlchemy()

class PropertyStatus(Enum):
    SUBMITTED = "submitted"
    UNDER_REVIEW = "under_review"
    OWNER_CONTACTED = "owner_contacted"
    NEGOTIATION = "negotiation"
    QUALIFIED = "qualified"
    LISTED = "listed"
    SOLD = "sold"
    REJECTED = "rejected"

class Property(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String(500), nullable=False)
    postcode = db.Column(db.String(20), nullable=True)
    latitude = db.Column(db.Float, nullable=True)
    longitude = db.Column(db.Float, nullable=True)
    photo_url = db.Column(db.String(500), nullable=True)
    description = db.Column(db.Text, nullable=True)
    
    # Spotter information
    spotter_email = db.Column(db.String(120), nullable=False)
    spotter_name = db.Column(db.String(100), nullable=True)
    
    # Status and tracking
    status = db.Column(db.Enum(PropertyStatus), default=PropertyStatus.SUBMITTED, nullable=False)
    submission_date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    last_updated = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    
    # Rewards
    voucher_sent = db.Column(db.Boolean, default=False, nullable=False)
    voucher_sent_date = db.Column(db.DateTime, nullable=True)
    commission_paid = db.Column(db.Boolean, default=False, nullable=False)
    commission_amount = db.Column(db.Float, nullable=True)
    commission_paid_date = db.Column(db.DateTime, nullable=True)
    
    # Property details (filled by admin)
    estimated_value = db.Column(db.Float, nullable=True)
    purchase_price = db.Column(db.Float, nullable=True)
    sale_price = db.Column(db.Float, nullable=True)
    
    # Admin notes
    admin_notes = db.Column(db.Text, nullable=True)
    
    def __repr__(self):
        return f'<Property {self.id}: {self.address}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'address': self.address,
            'postcode': self.postcode,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'photo_url': self.photo_url,
            'description': self.description,
            'spotter_email': self.spotter_email,
            'spotter_name': self.spotter_name,
            'status': self.status.value,
            'submission_date': self.submission_date.isoformat() if self.submission_date else None,
            'last_updated': self.last_updated.isoformat() if self.last_updated else None,
            'voucher_sent': self.voucher_sent,
            'voucher_sent_date': self.voucher_sent_date.isoformat() if self.voucher_sent_date else None,
            'commission_paid': self.commission_paid,
            'commission_amount': self.commission_amount,
            'commission_paid_date': self.commission_paid_date.isoformat() if self.commission_paid_date else None,
            'estimated_value': self.estimated_value,
            'purchase_price': self.purchase_price,
            'sale_price': self.sale_price,
            'admin_notes': self.admin_notes
        }


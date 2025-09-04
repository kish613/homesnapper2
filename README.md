# HomeSnapper - Property Spotting Platform

A modern web application that allows users to spot empty or derelict properties and earn rewards when those properties are successfully purchased and renovated.

## 🌐 Live Demo
- **Production Website:** https://ogh5izc66kkw.manus.space
- **Status:** Fully deployed and operational

## 🏗️ Project Structure

```
homesnapper2/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── App.jsx          # Main React component
│   │   ├── App.css          # Custom styles
│   │   └── assets/          # Logo and static assets
│   ├── package.json         # Frontend dependencies
│   └── dist/                # Built frontend files
├── src/                     # Flask backend application
│   ├── main.py             # Flask app entry point
│   ├── models/             # Database models
│   │   ├── user.py         # User model
│   │   └── property.py     # Property model with status tracking
│   ├── routes/             # API endpoints
│   │   ├── user.py         # User routes
│   │   └── property.py     # Property management routes
│   ├── static/             # Built React frontend (served by Flask)
│   └── database/           # SQLite database
├── requirements.txt        # Python dependencies
└── README.md              # This file
```

## 🚀 Features

### Frontend Features
- **Modern React Interface:** Clean, professional design matching the HomeSnapper brand
- **Responsive Design:** Optimized for desktop, tablet, and mobile devices
- **Brand Integration:** Perfect color scheme matching the HomeSnapper logo (teal, orange, gold)
- **User Experience:** Intuitive navigation and clear call-to-actions

### Backend Features
- **RESTful API:** Complete Flask backend with comprehensive endpoints
- **Database Management:** SQLite database with property and user tracking
- **Property Status Tracking:** 8 different status levels from submission to sale
- **Reward Management:** Automatic voucher and commission calculation
- **CORS Enabled:** Proper frontend-backend communication

### API Endpoints
- `POST /api/properties` - Submit new property
- `GET /api/properties` - List properties with filtering
- `GET /api/properties/{id}` - Get specific property
- `PUT /api/properties/{id}/status` - Update property status (admin)
- `GET /api/properties/stats` - Get platform statistics
- `GET /api/properties/recent` - Get recent successful properties

## 💰 Business Model

### User Rewards
- **£50 Amazon Voucher:** Instant reward when property qualifies
- **Up to £2,000 Commission:** 1% of purchase price (max £2,000) when property sells
- **Community Impact:** Help revitalize neighborhoods

### Competitive Advantages
- Higher initial reward than competitors (£50 vs £20)
- Professional, trustworthy design
- Modern technical stack
- Mobile-optimized experience
- Comprehensive tracking system

## 🛠️ Technology Stack

### Frontend
- **React 18+** - Modern JavaScript framework
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Vite** - Fast build tool and dev server

### Backend
- **Flask** - Python web framework
- **SQLAlchemy** - Database ORM
- **Flask-CORS** - Cross-origin resource sharing
- **SQLite** - Lightweight database

### Deployment
- **Manus Platform** - Production hosting
- **Git** - Version control

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ and pnpm
- Python 3.11+ and pip
- Git

### Frontend Development
```bash
cd frontend
pnpm install
pnpm run dev
# Visit http://localhost:5173
```

### Backend Development
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run Flask server
python src/main.py
# Visit http://localhost:5000
```

### Full-Stack Development
1. Build the frontend: `cd frontend && pnpm run build`
2. Copy built files: `cp -r frontend/dist/* src/static/`
3. Run Flask server: `python src/main.py`
4. Visit http://localhost:5000 for the complete application

## 📊 Database Schema

### Properties Table
- **id** - Primary key
- **address** - Property address
- **postcode** - UK postcode
- **latitude/longitude** - GPS coordinates
- **photo_url** - Property photo
- **description** - Additional details
- **spotter_email/name** - Submitter information
- **status** - Current property status (enum)
- **submission_date** - When submitted
- **voucher_sent** - £50 voucher status
- **commission_paid** - Commission payment status
- **estimated_value** - Property valuation
- **purchase_price** - Actual purchase price
- **sale_price** - Final sale price
- **admin_notes** - Internal notes

### Property Status Flow
1. **submitted** - Initial submission
2. **under_review** - Being evaluated
3. **owner_contacted** - Reaching out to owner
4. **negotiation** - In purchase talks
5. **qualified** - Approved for purchase (£50 voucher sent)
6. **listed** - Property purchased and listed
7. **sold** - Property sold (commission paid)
8. **rejected** - Not suitable

## 🎨 Design System

### Colors
- **Primary (Teal):** #1E6A81 - Navigation, headings, trust elements
- **Accent (Orange):** #F98D29 - Call-to-action buttons, highlights
- **Secondary (Gold):** #F2C23E - Rewards, achievements, success states
- **Neutrals:** White, grays for backgrounds and text

### Typography
- **Headings:** Bold, modern sans-serif for authority
- **Body:** Clean, readable font for optimal UX
- **Buttons:** Semi-bold for clear actions

## 🚀 Deployment

The application is configured for easy deployment:

1. **Frontend Build:** `pnpm run build` creates optimized static files
2. **Backend Setup:** Flask serves both API and static frontend
3. **Database:** SQLite for simple deployment (can upgrade to PostgreSQL)
4. **CORS:** Configured for cross-origin requests

## 📈 Future Enhancements

### Phase 1 - Core Features
- [ ] Interactive property submission form
- [ ] User registration and login system
- [ ] Property photo upload functionality
- [ ] Email notifications for status updates

### Phase 2 - Advanced Features
- [ ] Interactive map with submitted properties
- [ ] User dashboard with submission tracking
- [ ] Admin panel for property management
- [ ] Automated payment processing

### Phase 3 - Growth Features
- [ ] Mobile app (Progressive Web App)
- [ ] Gamification (leaderboards, badges)
- [ ] Advanced analytics dashboard
- [ ] Integration with property databases

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software. All rights reserved.

## 📞 Contact

For questions or support, please contact the HomeSnapper team.

---

**HomeSnapper** - Turning daily walks into cash rewards while revitalizing communities across the UK.


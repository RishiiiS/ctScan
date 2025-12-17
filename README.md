# ConnectRemote - Full Stack Application

## Overview
ConnectRemote is a platform that bridges the gap between remote and onsite work, enabling seamless coordination and team building.

## Project Structure

```
ctScan/
├── front_end/
│   └── vite-project/          # Frontend (Vite + Vanilla JS)
│       ├── src/
│       │   ├── main.js        # Main application logic
│       │   └── style.css      # Styles
│       └── index.html
│
└── backend/                    # Backend API (Node.js + Express)
    ├── config/
    │   └── database.js        # MongoDB connection
    ├── controllers/
    │   ├── userController.js
    │   ├── bookingController.js
    │   └── partnershipController.js
    ├── models/
    │   ├── User.js
    │   ├── Booking.js
    │   └── Partnership.js
    ├── routes/
    │   ├── userRoutes.js
    │   ├── bookingRoutes.js
    │   └── partnershipRoutes.js
    ├── middleware/
    │   └── auth.js            # JWT authentication
    └── server.js              # Main server file
```

## Running the Application

### Frontend (Port 5173)
```bash
cd front_end/vite-project
npm run dev
```
Access: http://localhost:5173

### Backend (Port 5001)
```bash
cd backend
./start.sh
# or
npm start
```
Access: http://localhost:5001

## Features Implemented

### Frontend
1. **Home Page** - Landing page with branding
2. **User Signup** - Account creation
3. **Location Selection** - Choose user location
4. **Service Booking** - Select online or offline services
5. **Partnership Toggle** - Partner with the platform
6. **Success Page** - Booking confirmation

### Backend API Endpoints

#### Users
- `POST /api/users/signup` - Register new user
- `POST /api/users/login` - Login user (returns JWT token)
- `GET /api/users/profile` - Get user profile (requires auth)
- `PUT /api/users/location` - Update user location (requires auth)
- `PUT /api/users/partnership` - Toggle partnership status (requires auth)

#### Bookings
- `POST /api/bookings` - Create new booking (requires auth)
- `GET /api/bookings` - Get user's bookings (requires auth)
- `GET /api/bookings/:id` - Get single booking (requires auth)
- `PUT /api/bookings/:id` - Update booking (requires auth)
- `DELETE /api/bookings/:id` - Delete booking (requires auth)
- `GET /api/bookings/all` - Get all bookings (requires auth)

#### Partnerships
- `POST /api/partnerships` - Submit partnership request
- `GET /api/partnerships` - Get all partnerships (requires auth)
- `GET /api/partnerships/:id` - Get single partnership (requires auth)
- `PUT /api/partnerships/:id` - Update partnership (requires auth)
- `DELETE /api/partnerships/:id` - Delete partnership (requires auth)

## Database (MongoDB)

### Collections

**users**
- name, email, password (hashed)
- location
- isPartnered (boolean)
- timestamps

**bookings**
- user (reference to User)
- userName, userEmail
- location (New York, San Francisco, London, Remote)
- serviceType (online, offline)
- status (pending, confirmed, completed, cancelled)
- notes
- timestamps

**partnerships**
- companyName, contactName, email
- phone, website
- partnershipType
- message
- status (pending, approved, rejected)
- user (optional reference)
- timestamps

## MongoDB Setup

### Install MongoDB (macOS):
```bash
brew tap mongodb/brew
brew install mongodb-community
```

### Start MongoDB:
```bash
brew services start mongodb-community
```

### Or start manually:
```bash
mongod --config /usr/local/etc/mongod.conf
```

## Environment Variables

Backend `.env` file:
```
PORT=5001
MONGODB_URI=mongodb://localhost:27017/connectremote
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

## API Testing Examples

### 1. Signup
```bash
curl -X POST http://localhost:5001/api/users/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:5001/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 3. Create Booking (with token)
```bash
curl -X POST http://localhost:5001/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "location": "New York",
    "serviceType": "online",
    "notes": "Team building session"
  }'
```

### 4. Get User Profile
```bash
curl http://localhost:5001/api/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Technologies Used

### Frontend
- Vite (Build tool)
- Vanilla JavaScript
- CSS3
- HTML5

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (JSON Web Tokens)
- bcryptjs (Password hashing)
- CORS

## Next Steps

1. **Install and start MongoDB** - Required for backend to work properly
2. **Connect frontend to backend API** 
3. **Add error handling and validation**
4. **Implement proper authentication flow**
5. **Add admin dashboard**
6. **Deploy to production**

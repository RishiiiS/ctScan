# ConnectRemote Backend API

Backend API for ConnectRemote - Bridge the Gap Between Remote & Onsite

## Features

- User Authentication (Signup/Login with JWT)
- User Profile Management
- Location Selection
- Service Booking (Online/Offline)
- Partnership Requests
- MongoDB Database Integration

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the values as needed

4. Make sure MongoDB is running locally or update the `MONGODB_URI` in `.env`

## Running the Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Users
- `POST /api/users/signup` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/location` - Update user location (protected)
- `PUT /api/users/partnership` - Toggle partnership status (protected)

### Bookings
- `POST /api/bookings` - Create new booking (protected)
- `GET /api/bookings` - Get user's bookings (protected)
- `GET /api/bookings/:id` - Get single booking (protected)
- `PUT /api/bookings/:id` - Update booking (protected)
- `DELETE /api/bookings/:id` - Delete booking (protected)
- `GET /api/bookings/all` - Get all bookings (protected/admin)

### Partnerships
- `POST /api/partnerships` - Submit partnership request (public/optional auth)
- `GET /api/partnerships` - Get all partnerships (protected)
- `GET /api/partnerships/:id` - Get single partnership (protected)
- `PUT /api/partnerships/:id` - Update partnership status (protected)
- `DELETE /api/partnerships/:id` - Delete partnership (protected)

### Health Check
- `GET /api/health` - Server health check
- `GET /` - API information

## Database Models

### User
- name, email, password (hashed)
- location
- isPartnered (boolean)
- timestamps

### Booking
- user (reference to User)
- userName, userEmail
- location (New York, San Francisco, London, Remote)
- serviceType (online, offline)
- status (pending, confirmed, completed, cancelled)
- notes
- timestamps

### Partnership
- companyName, contactName, email
- phone, website
- partnershipType (coworking-space, service-provider, technology-partner, other)
- message
- status (pending, approved, rejected)
- user (optional reference)
- timestamps

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Protected routes require a Bearer token in the Authorization header:

```
Authorization: Bearer <token>
```

## MongoDB Setup

Make sure MongoDB is installed and running:

### macOS (using Homebrew):
```bash
brew services start mongodb-community
```

### Or start manually:
```bash
mongod --config /usr/local/etc/mongod.conf
```

The database will be created automatically when you first run the server.

## Testing with curl

### Signup:
```bash
curl -X POST http://localhost:5000/api/users/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Login:
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Create Booking (with token):
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"location":"New York","serviceType":"online"}'
```

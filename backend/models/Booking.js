import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: [true, 'Please provide a location'],
    enum: ['Pune', 'Mumbai', 'Bangalore', 'Delhi', 'Hyderabad', 'New York', 'San Francisco', 'London', 'Remote']
  },
  serviceType: {
    type: String,
    required: [true, 'Please specify service type'],
    enum: ['online', 'offline']
  },
  companyName: {
    type: String
  },
  companySize: {
    type: String
  },
  eventType: {
    type: String
  },
  timeSlot: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;

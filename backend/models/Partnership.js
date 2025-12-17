import mongoose from 'mongoose';

const partnershipSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Please provide company name']
  },
  contactName: {
    type: String,
    required: [true, 'Please provide contact name']
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    default: ''
  },
  website: {
    type: String,
    default: ''
  },
  partnershipType: {
    type: String,
    enum: ['coworking-space', 'service-provider', 'technology-partner', 'other'],
    default: 'other'
  },
  message: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
}, {
  timestamps: true
});

const Partnership = mongoose.model('Partnership', partnershipSchema);

export default Partnership;

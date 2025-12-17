import express from 'express';
import {
  signup,
  login,
  getUserProfile,
  updateLocation,
  togglePartnership
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', protect, getUserProfile);
router.put('/location', protect, updateLocation);
router.put('/partnership', protect, togglePartnership);

export default router;

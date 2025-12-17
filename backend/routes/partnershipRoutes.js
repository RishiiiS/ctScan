import express from 'express';
import {
  createPartnership,
  getAllPartnerships,
  getPartnershipById,
  updatePartnership,
  deletePartnership
} from '../controllers/partnershipController.js';
import { protect, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .post(optionalAuth, createPartnership)
  .get(protect, getAllPartnerships);

router.route('/:id')
  .get(protect, getPartnershipById)
  .put(protect, updatePartnership)
  .delete(protect, deletePartnership);

export default router;

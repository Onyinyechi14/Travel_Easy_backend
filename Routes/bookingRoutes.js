import express from 'express';
import { getBookings, createBooking } from '../Controller/bookingController.js';
import { protect } from '../middleware/authMiddlewares.js';

const router = express.Router();

router.get('/', protect, getBookings);
router.post('/', createBooking);

export default router;


import express from 'express';
import { getTravelers, createTraveler } from '../Controller/travelerController.js';

const router = express.Router();

router.get('/', getTravelers);
router.post('/', createTraveler);

export default router;

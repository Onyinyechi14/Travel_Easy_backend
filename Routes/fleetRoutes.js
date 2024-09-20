import express from 'express';
import { getFleets, createFleet } from '../Controller/fleetController.js';

const router = express.Router();

router.get('/', getFleets);
router.post('/', createFleet);

export default router;

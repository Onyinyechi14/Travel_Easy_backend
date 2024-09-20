import express from 'express';
import { getStates, createState } from '../Controller/stateController.js';

const router = express.Router();

router.get('/', getStates);
router.post('/', createState);

export default router;

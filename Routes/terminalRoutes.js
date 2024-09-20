import express from 'express';
import { getTerminals, createTerminal } from '../Controller/terminalController.js';

const router = express.Router();

router.get('/', getTerminals);
router.get('/:state_id', getTerminals);
router.post('/', createTerminal);

export default router;

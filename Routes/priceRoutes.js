// routes/priceRoute.js

import express from 'express';
import { createPrice, getPriceByTerminals, getPrices} from '../Controller/priceController.js'



const router = express.Router();


// POST route to calculate the total price
router.post('/', createPrice);
router.get('/', getPrices);
router.get('/:departure/:destination', getPriceByTerminals);


export default router;

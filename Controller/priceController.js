import Terminal from '../Models/terminalModel.js';
import { Price } from '../Models/priceModel.js';

export const createPrice = async (req, res) => {
  try {
    // Log the request body for debugging
    console.log('Request body:', req.body);

    const { departureTerminal, destinationTerminal, basePrice, vehicleCapacity } = req.body;

    // Ensure required fields are provided
    if (!departureTerminal || !destinationTerminal || !basePrice || !vehicleCapacity) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }
    
    const minPrice = 1000;
    const maxPrice = 5000;
    const randomPrice = Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice;


    // Create and save the calculated price object
    const newPrice = new Price({
      departureTerminal,
      destinationTerminal,
      basePrice,
      vehicleCapacity
    });

    const savedPrice = await newPrice.save();
    // Log the saved calculated price for debugging
    console.log('Saved calculated price:', savedPrice);

    // Respond with both saved regular price and calculated price
    res.status(201).json({
      price: savedPrice
    });
  } catch (error) {
    console.error('Error creating price:', error);
    res.status(500).json({ message: 'Error creating calculated price.' });
  }
};

export const getPriceByTerminals = async(req, res) => {
  try {
    const departureTerminal = req.params.departure;
    const destinationTerminal = req.params.destination;
       
    const price = await Price.findOne({ departureTerminal, destinationTerminal });
    if (!price) {
      return res.status(404).json({ message: 'Price not found.' });
    }
    res.json(price);
  }
  catch (error) {
    console.error('Error getting price by terminal:', error);
    res.status(500).json({ message: 'Error getting price.' });
  }
};


export const getPrices = async(req, res) => {
  // res.status(200).json(await automatePriceList());
  try {
    
    const price = await Price.find();
    if (!price) {
      return res.status(404).json({ message: 'Prices not found.' });
    }
    res.json(price);
  }
  catch (error) {
    console.error('Error getting price by terminal:', error);
    res.status(500).json({ message: 'Error getting price.' });
  }
};

const automatePriceList = async() => {
  const terminals = await Terminal.find().populate('state_id', 'nameOfState');
  // return terminals;
  let prices = [];
  for(let i = 0; i < terminals.length; i++)
    {
      for(let j = i + 1; j < terminals.length; j++){
        const randomPrice = Math.floor(Math.random() * (18500 - 30000 + 1)) + 30000;
        if (terminals[i].state_id.nameOfState !== terminals[j].state_id.nameOfState) {
          const priceSet = {
            departureTerminal: terminals[i].nameOfTerminal,
            destinationTerminal: terminals[j].nameOfTerminal,
            basePrice: randomPrice,
            vehicleCapacity: Math.floor(Math.random() * (15 - 7 + 1)) + 7,
          };
          prices.push(priceSet);
        }
      }
    }

  try {
    const price = await Price.insertMany(prices);
    console.log('Automated prices added successfully');
  } catch (error) {
    console.error('Error automating prices:', error);
  }
};



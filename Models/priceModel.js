import mongoose from 'mongoose';

// Schema for price
const priceSchema = new mongoose.Schema({
  departureTerminal: { 
    type: String, 
    required: true 
  },
  destinationTerminal: {
    type: String,
    required: true
  },
  basePrice: {
    type: Number, 
    required: true 
  },
  vehicleCapacity: { 
    type: Number, 
    required: true 
  } 
});


const Price = mongoose.model('Price', priceSchema);

// Export both models using named exports
export { Price };

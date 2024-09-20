// fleetModel.js
import mongoose from 'mongoose';

const fleetSchema = new mongoose.Schema({
    registration_number: 
    { 
      type: String,
      required: true,
      unique: true
     },
    vehicle_make: 
    { 
    type: String, 
    required: true 
    },
    vehicle_model: 
    { 
     type: String,
     required: true 
    },
    capacity:
    { 
    type: Number,
    required: true 
    }
}, {
    timestamps: true, 
});

export default mongoose.model('Fleet', fleetSchema);


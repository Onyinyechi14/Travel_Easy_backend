import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    state_id:
     {
    type: mongoose.Schema.Types.ObjectId, ref: 'State', 
    required: true
    },
    adults: 
    { 
    type: Number, 
    required: true 
    },
    children: 
    {
    type: Number, 
    default: 0
    },
    trip_type:
     { 
    type: String, 
    enum: ['one-way', 'round-trip'], 
    required: true
    },
    terminal_id:
     { 
    type: mongoose.Schema.Types.ObjectId, ref: 'Terminal', 
    required: true
   },
    departure_date: 
    { 
    type: Date,
    required: true
    },
    arrival_date: 
    { 
    type: Date 
    },
    fleet_id:
     { 
    type: mongoose.Schema.Types.ObjectId, ref: 'Fleet', 
    required: true 
},
    seat_number: 
    { 
    type: Number, 
    required: true
     }, 
     price: 
     { 
     type: Number, 
     required: true
      }
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);

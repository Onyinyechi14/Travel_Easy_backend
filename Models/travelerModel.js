// travelerModel.js
import mongoose from 'mongoose';

const travelerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    kin_name: {
        type: String,
        required: true,
        trim: true,
    },
    kin_phone: {
        type: String,
        required: true,
        trim: true,
    },
    kin_address: {
        type: String,
        required: true,
        trim: true,
    },
    booking_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model('Traveler', travelerSchema);

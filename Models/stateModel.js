import mongoose from 'mongoose';

const stateSchema = new mongoose.Schema({
    nameOfState: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
}, {
    timestamps: true,
});

export default mongoose.model('State', stateSchema);

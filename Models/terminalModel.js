import mongoose from 'mongoose';

const terminalSchema = new mongoose.Schema({
    nameOfTerminal: {
        type: String,
        required: true,
        trim: true
    },
    state_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'State',
        required: true
    }
}, {
    timestamps: true
});
const Terminal = mongoose.model('Terminal', terminalSchema);
export default Terminal;

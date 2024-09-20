import Terminal from '../Models/terminalModel.js';
import State from '../Models/stateModel.js';

export const getTerminals = async (req, res) => {
    try {
        //  res.status(200).json(req.params.state_id);
        if(req.params.state_id){
            const stateId = req.params.state_id;
            const terminals = await Terminal.find({state_id: stateId}).populate('state_id', 'nameOfState'); 
            res.status(200).json(terminals);
        }else{
            const terminals = await Terminal.find().populate('state_id', 'nameOfState'); 
            res.status(200).json(terminals);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getTerminal = async (req, res) => {
    try {
        const terminals = await Terminal.find(res.params.state_id).populate('state_id', 'nameOfState'); 
        res.status(200).json(terminals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const createTerminal = async (req, res) => {
    const { nameOfTerminal, state_id } = req.body;

    if (!nameOfTerminal || !state_id) {
        return res.status(400).json({ message: 'Please provide both the terminal name and state ID' });
    }

    try {
        const stateExists = await State.findById(state_id);
        if (!stateExists) {
            return res.status(404).json({ message: 'State not found' });
        }

        const terminalExists = await Terminal.findOne({ nameOfTerminal, state_id });
        if (terminalExists) {
            return res.status(400).json({ message: 'Terminal already exists in this state' });
        }

        const newTerminal = new Terminal({
            nameOfTerminal,
            state_id,
        });

        const savedTerminal = await newTerminal.save();

        res.status(201).json(savedTerminal);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

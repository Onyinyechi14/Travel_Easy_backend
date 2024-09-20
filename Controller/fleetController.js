import Fleet from '../Models/fleetModel.js';


export const getFleets = async (req, res) => {
    try {
        const fleets = await Fleet.find(); 
        res.status(200).json(fleets); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' }); 
    }
};


export const createFleet = async (req, res) => {
    const { registration_number, vehicle_make, vehicle_model, capacity} = req.body;

    if (!registration_number || !vehicle_make || !vehicle_model) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        const newFleet = new Fleet({
            registration_number,
            vehicle_make,
            vehicle_model,
            capacity,
        });

        const savedFleet = await newFleet.save();

        res.status(201).json(savedFleet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

import Traveler from '../Models/travelerModel.js';

export const getTravelers = async (req, res) => {
    try {
        const travelers = await Traveler.find().populate('booking_id', 'bookingDetails');
        res.status(200).json(travelers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const createTraveler = async (req, res, booking_id = false) => {
    const {
        firstName,
        lastName,
        phoneNumber,
        email,
        kin_name,
        kin_phone,
        kin_address,
    } = req.body;

    if (!firstName || !lastName || !phoneNumber || !email || !kin_name || !kin_phone || !kin_address || !booking_id) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        const bookingExists = await Booking.findById(booking_id);
        if (!bookingExists) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        const newTraveler = new Traveler({
            firstName,
            lastName,
            phoneNumber,
            email,
            kin_name,
            kin_phone,
            kin_address,
            booking_id,
        });

        const savedTraveler = await newTraveler.save();

        res.status(201).json(savedTraveler);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

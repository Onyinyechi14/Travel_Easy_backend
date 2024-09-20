import bcrypt from 'bcryptjs';
import User from '../Models/UserModel.js';
import Booking from '../Models/bookingModel.js';
import Traveler from '../Models/travelerModel.js'; 
import { populate } from 'dotenv';


export const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            // .populate('booking_id', 'firstName lastName phoneNumber email kin_name kin_phone kin_address')
            // .populate('state_id', 'nameOfState');
        // res.status(200).json(bookings);

        const traveler = await Traveler.find().populate({
            path: 'booking_id',
            populate: [{path: 'fleet_id', select: 'registration_number vehicle_make vehicle_model capacity'},
            { path: 'state_id', select: 'nameOfState'}],
        })
        res.status(200).json(traveler);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};



export const createBooking = async (req, res) => {
    const booking = {
        state_id: req.body.state_id,
        adults: req.body.adults,
        children: req.body.children,
        trip_type: req.body.trip_type,
        terminal_id: req.body.terminal_id,
        departure_date: req.body.departure_date,
        arrival_date: req.body.arrival_date,
        fleet_id: req.body.fleet_id,
        seat_number: req.body.seat_number,
        price: req.body.price,
    };

    const traveler = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        kin_name: req.body.kin_name,
        kin_phone: req.body.kin_phone,
        kin_address: req.body.kin_address,
    };
    
    const user = {
        phoneNumber: req.body.phoneNumber, 
        email: req.body.email, 
        password: req.body.password, 
        role: req.body.role 
    };
    


    if (!booking.state_id || !booking.adults || !booking.trip_type || !booking.terminal_id || !booking.departure_date || !booking.fleet_id || !booking.seat_number) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        const newBooking = new Booking(booking);
        const savedBooking = await newBooking.save();
        traveler.booking_id = savedBooking._id;
        if(savedBooking){
           const newTraveler = new Traveler(traveler);
           const savedTraveler = await newTraveler.save();
        }
        if(req.body.make_user){
            user.fullName = `${traveler.firstName} ${traveler.lastName}`;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password, salt);
            user.password = hashedPassword;
            const newUser = new User(user);
            const savedUser = await newUser.save();
        }
        res.status(201).json(savedBooking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


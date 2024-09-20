import User from '../Models/UserModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import generateToken from '../utils/generateToken.js';

// Controller to register a new user
export const registerUser = async (req, res) => {
    const { fullName, phoneNumber, email, password } = req.body;

    // Check if all fields are provided
    if (!fullName || !phoneNumber || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        // Check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Generate hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user object
        const newUser = new User({
            fullName,
            phoneNumber,
            email,
            password: hashedPassword,
            role: 'user',  // Assign a default role (adjust as necessary)
        });

        // Save user to database
        const savedUser = await newUser.save();

        // Generate JWT token
        const token = generateToken(savedUser._id, savedUser.role);

        // Respond with user data (excluding password) and token
        res.status(201).json({
            user: {
                id: savedUser._id,
                fullName: savedUser.fullName,
                phoneNumber: savedUser.phoneNumber,
                email: savedUser.email,
                role: savedUser.role,
            },
            token,
        });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide both email and password' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });

        res.status(200).json({
            user: {
                id: user._id,
                fullName: user.fullName,
                phoneNumber: user.phoneNumber,
                email: user.email,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find(); 
        res.status(200).json(users); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' }); 
    }
};


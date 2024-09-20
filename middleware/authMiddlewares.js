// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../Models/UserModel.js';

export const protect = async (req, res, next) => {
    let token;

    // Check if the token is in the authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get the token from the authorization header
            token = req.headers.authorization.split(' ')[1];

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get the user from the token (excluding the password)
            req.user = await User.findById(decoded.id).select('-password');

            // Call the next middleware function
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

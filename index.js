import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"

import bookingRoutes from './Routes/bookingRoutes.js';
import fleetRoutes from './Routes/fleetRoutes.js';
import stateRoutes from './Routes/stateRoutes.js'; 
import terminalRoutes from './Routes/terminalRoutes.js';
import travelerRoutes from './Routes/travelerRoutes.js';
import userRoutes from './Routes/userRoutes.js';
import  priceRoute from './Routes/priceRoutes.js'

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

const PORT = process.env.PORT || 5000;
const URI = process.env.MONGO_URI;

try {
    mongoose.connect(URI);
    console.log("Connected to mongoDB");
} catch (error) {
    console.log("Error: ", error);
}


app.use('/bookings', bookingRoutes);
app.use('/fleets', fleetRoutes);
app.use('/states', stateRoutes); 
app.use('/terminals', terminalRoutes);
app.use('/travelers', travelerRoutes);
app.use('/users', userRoutes);
app.use('/price', priceRoute);

// Utility to list all routes
const showRoutes = () => {
    console.log('Registered routes:');
    app._router.stack.forEach((middleware) => {
        if (middleware.route) { // Routes registered directly on the app
            console.log(`${Object.keys(middleware.route.methods).join(', ').toUpperCase()} ${middleware.route.path}`);
        } else if (middleware.name === 'router') { // Router middleware
            middleware.handle.stack.forEach((handler) => {
                const route = handler.route;
                if (route) {
                    const methods = Object.keys(route.methods).map(method => method.toUpperCase()).join(', ');
                    console.log(`${methods} ${route.path}`);
                }
            });
        }
    });
};

// Call the utility function after all routes have been registered
showRoutes();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
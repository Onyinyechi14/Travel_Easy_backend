import express from 'express';
import { registerUser, loginUser, getUsers } from '../Controller/userController.js';

const router = express.Router();


router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/user', getUsers);


export default router;

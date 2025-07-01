import express from 'express';
import { getCars, getUserData, loginUser, registerUser } from '../controllers/userController.js';
import { protect } from '../middleware/Auth.js';

const userRouter = express.Router();

// add diff endpoint

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/data',protect, getUserData)
userRouter.get('/cars',getCars)

export default userRouter;

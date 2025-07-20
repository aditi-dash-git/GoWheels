import express from 'express';
import { deleteUserAndCars, getCars, getUserById, getUserData, loginUser, registerUser } from '../controllers/userController.js';
import { protect } from '../middleware/Auth.js';

const userRouter = express.Router();

// add diff endpoint

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/data',protect, getUserData)
userRouter.get('/cars',getCars)

userRouter.get('/admin/user/:id', protect, getUserById);
userRouter.delete('/admin/user/:id', protect, deleteUserAndCars);


export default userRouter;

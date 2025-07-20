import express from "express";
import"dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from "./routes/UserRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import otpRouter from "./routes/otpRoutes.js"
// it allows the backend to connect with any frontend url

// express is used to create our app

//Initialize Express App
const app = express() 

//Connect database
await connectDB()

//Middleware
app.use(cors());
app.use(express.json());
//all req ll be passed using json


//creation of route
app.get('/',(req,res)=> res.send("Server is running") )

app.use('/api/user',userRouter)
app.use('/api/owner',ownerRouter)
app.use('/api/bookings',bookingRouter)

//port number to start our backend server 
const PORT = process.env.PORT || 3000;

app.use('/api/otp',otpRouter);

//start the express server
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))
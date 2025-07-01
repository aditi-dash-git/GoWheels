// import Booking from "../models/booking.js";
import Car from "../models/Car.js";

import Booking from "../models/Booking.js";

//function to check the availability of car for a given date
const checkAvailability = async (car, pickupDate, returnDate) => {
  const bookings = await Booking.find({
    car,
    pickupDate: { $lte: returnDate },
    //pickup date should be less than the return date
    returnDate: { $gte: pickupDate },
  });
  //when the above fucntion runs successfully then the booking is confirmed hence for that we set the car as unavailable
  return bookings.length === 0;
};



//api to check availability of car for the given date and location
export const checkAvailabilityOfCar = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.body;
    //fecth all available cars for the given location

    const cars = await Car.find({ location, isAvailable: true });

    //check car availabilty for the given date range using promise
    const availableCarsPromise = cars.map(async () => {
      const isAvailable = await checkAvailability(
        car._id,
        pickupDate,
        returnDate
      );
      return { ...car._doc, isAvailable: isAvailable };
    });

    let availableCars = await Promise.all(availableCarsPromise);
    availableCars = availableCars.filter((car) => car.isAvailable === true);

    res.json({ success: true, availableCars });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};



//api to create booking the car
export const createBooking = async (req, res) => {
  try {
    const { _id } = req.user;
    const { car, pickupDate, returnDate } = req.body;

    const isAvailable = await checkAvailability(car, pickupDate, returnDate);
    if (!isAvailable) {
      return res.json({ success: false, message: "Car is not available" });
    }

    const carData = await Car.findById(car);

    // calculate price based on pickup and return date
    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);
    const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
    //booking amt
    const price = carData.pricePerDay * noOfDays;

    await Booking.create({car,owner: carData.owner, user: _id,pickupDate,returnDate,price})

    res.json({success: true,message: 'Booking Created'})


  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};



//api to get the list of booking by user
export const getUserBookings= async(req,res)=>{
    try {

        const {_id} = req.user;
        const bookings= await Booking.find({user: _id}).populate("car").sort({createdAt: -1})
        //sort the data so that new bookings wll be displayed on the top
        res.json({success:true,bookings});


        
    } catch (error) {
        console.log(error.message);
    res.json({ success: false, message: error.message });
    }
}



//api to get owner bookings
export const getOwnerBookings= async(req,res)=>{
    try {
        if(req.user.role !== 'owner'){
            return res.json({success:false,message:'UnAuthorized'})
        }
        const bookings=await Booking.find({owner: req.user._id}).populate('car user').select("-user.password").sort({createdAt: -1})

        res.json({success: true, bookings})


        
    } catch (error) {
        console.log(error.message);
    res.json({ success: false, message: error.message });
    }
}



//api to update booking status by owner
export const changeBookingStatus= async(req,res)=>{
    try {
        const {_id}=req.user;
        const {bookingId, status} =req.body;
        const booking = await Booking.findById(bookingId)

        if(booking.owner.toString() !== _id.toString()){
            return res.json({success:false,message:'UnAuthorized'})
        }

        booking.status = status;
        await booking.save();
        //booking updated in mongodb
        res.json({success: true, message:'Status Updated'})

        
    } catch (error) {
        console.log(error.message);
    res.json({ success: false, message: error.message });
    }
}

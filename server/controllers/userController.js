import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Car from "../models/Car.js";

//generate JWT token
const generateToken = (userId) => {
  const payLoad = userId;
  return jwt.sign(payLoad, process.env.JWT_SECRET);
};

//Register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //if any of the field is missing then :
    if (!name || !email || !password || password.length < 8) {
      return res.json({ success: false, message: "fill all the fields" });
    }

    // whenever we ll get the user with the email id then this userExists ll be true
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // if the user is new he doesnt exists thn we have to add him to the database but we wont store the password directly we ll have to encrypt it

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    //whenever a user database is created we hv to genereate a token which ll be sent in response. using this token we can allow the user to access our website restricted area

    const token = generateToken(user._id.toString());

    res.json({ success: true, token });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//login user

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      //if the user is not found with that email then send this message
      return res.json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    //it ll compare the password entered by the user with the password of the database

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const token = generateToken(user._id.toString());

    res.json({ success: true, token });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//get user data using token (jwt)

export const getUserData = async (req, res) => {
  try {
    const { user } = req;
    res.json({ success: true, user });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//get all cars for the frontend

export const getCars = async (req, res) => {
  try {
    const cars = await Car.find({isAvailable: true})
    res.json({ success: true, cars });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Get a specific user by ID (admin use)
export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    // Validate ObjectId format
    if (!userId || userId.length !== 24) {
      return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    const user = await User.findById(userId).select("-password"); // Don't return hashed password

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error("Error in getUserById:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete user and their cars (admin-only)
export const deleteUserAndCars = async (req, res) => {
  try {
    const userId = req.params.id;

    // ✅ Ensure only admins can delete
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied: Admins only' });
    }

    // Validate and delete
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    await Car.deleteMany({ owner: userId });
    await User.findByIdAndDelete(userId);

    res.json({ success: true, message: 'User and cars deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


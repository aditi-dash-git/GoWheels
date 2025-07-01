import jwt from "jsonwebtoken";
// import { use } from "react";
import User from "../models/User.js";

export const protect = async (req,res,next)=>{
    const token =req.headers.authorization;
    if(!token){
        return res.json({success:false, message: "not authorized"})
    }
    try {
        const userId = jwt.decode(token, process.env.JWT_SECRET)
        //if userid is not found from the decoded token
        if(!userId){
            return res.json({success:false, message: "not authorized"})
        }

        //if the userid is found

         req.user=await User.findById(userId).select("-password")
         next();

    } catch (error) {
        return res.json({success:false, message: "not authorized"})
    }
}
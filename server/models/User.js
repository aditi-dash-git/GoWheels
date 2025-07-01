//model for the user
import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name: {type: String, required: true},
    //name field is required to create any user
    
    email: {type: String, required: true, unique: true},

    password: {type: String, required: true},

    role: {type: String, enum:["owner","user"], default: 'user' },
    //the role can be user or owner

    image: {type: String, default: '' },

},{timestamps: true})

//creates timestamp when the user was created

const User=mongoose.model('User', userSchema)

export default User
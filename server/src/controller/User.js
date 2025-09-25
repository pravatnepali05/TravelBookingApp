import jwt from 'jsonwebtoken';
const { JsonWebTokenError } = jwt;

import userModel from '../models/User.js'
import  bcrypt from 'bcrypt';

export const registerController = async(req,res) =>{
    try {
        //checking user details,right or not and throw error
           const{name, email, password} = req.body;
           if(!email || !password) {
            return res.status(400).json({
                error: "Please fill all the required details"
            })
           };
           //If there is already a user
           const user = await userModel.findOne({email});
           if(user){
            return res.status(400).json({
                error:"User already exists"
            });
           }

           //Hashing the password
           const salt = await bcrypt.genSalt(10);
           const hashedPassword = await bcrypt.hash(password, salt);
           //if all are passed then we will create a user
           const newUser = await userModel({
            name,
            email,
            password: hashedPassword,
           }).save();
           console.log("Saved user:", newUser);
           return res.status(200).send({
            success: true,
            message: 'User has been registered',

           });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Problem in register API",
        });
        
    }
};

export const loginController = async(req,res) =>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                error: "Please fill all the required details"
            });
        }
        //Check if user exists
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).json({
                error: "User not found"
            });
        }
        //Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                error: "Invalid credentials"
            });
        }
        //Generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });
        return res.status(200).send({
            success: true,
            message: 'Login successful',
            token,
            user: {

                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Problem in login API",
        });
    }
}
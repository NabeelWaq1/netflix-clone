import User from '../Models/user.model.js';
import bcryptjs from 'bcryptjs';
import { generateTokenAndSetCookie } from '../utils/generateToken.js';

export const signUp = async (req, res) => {
  try {
    const {email, username, password} = req.body;

    if(!username || !password || !email) {
      return res.status(400).json({success: false, message: 'Please provide all required fields'});
    }

    if(password.length < 6){
      return res.status(400).json({success: false, message: 'Password must be at least 6 characters long'});
    }

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if(!email.match(emailRegex)){
      return res.status(400).json({success: false, message: 'Please provide a valid email address'});
    }

    const userAlreadyExistsByEmail = await User.findOne({email});

    if(userAlreadyExistsByEmail){
      return res.status(400).json({success: false, message: 'Email already in use'});
    }

    const userAlreadyExistsByUsername = await User.findOne({username});

    if(userAlreadyExistsByUsername){
      return res.status(400).json({success: false, message: 'Username already in use'});
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPass = await bcryptjs.hash(password,salt);

    const profile_pics = ['/avatar1.png','/avatar2.png','avatar3.png'];
    const image = profile_pics[Math.floor(Math.random() * profile_pics.length)];

    const newUser = new User({username, email, password: hashedPass, image});

    generateTokenAndSetCookie(newUser._id,res);
    await newUser.save();

    return res.status(201).json({success: true, message: 'User registered successfully', user:{
      ...newUser._doc,
      password: "",
    },
  });

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({success: false, message: error.message});
  }
}


export const login = async (req, res) => {
  try {
    const {email, password} = req.body;

    if(!email, !password) {
      return res.status(400).json({success: false, message: 'Please provide both email and password'});
    }
    
    const user = await User.findOne({email});
    
    if(!user){
      return res.status(401).json({success: false, message: 'Invalid credentials'});
    }
    
    const isMatch = await bcryptjs.compare(password, user.password);
    
    if(!isMatch){
      return res.status(401).json({success: false, message: 'Invalid credentials'});
    }
    
    generateTokenAndSetCookie(user._id,res);
    
    return res.status(200).json({success: true, message: 'User logged in successfully', user:{
      ...user._doc,
      password: "",
    }});

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({success:false, message:error.message});
  }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie('jwt-netflix-clone');
    return res.status(200).json({success: true, message: 'User logged out successfully'});
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({success: false, message: error.message});
  }
}

export const authCheck = async (req, res) => {
  try {
    return res.status(200).json({success:true, user:req.user})
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({success:false, message: error.message});
  }
}
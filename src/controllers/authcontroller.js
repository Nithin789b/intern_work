import User from '../models/usermodal.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const Signup = async (req, res) => {
  try {
    const { email, password, displayName, role, occupation, interests } = req.body;
    const profileImageUrl = req.file?.path || null;

    if (!email || !password || !displayName || !occupation || !role || !interests) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const interestsArray = Array.isArray(interests)
      ? interests
      : interests.split(",").map(item => item.trim());

    const newUser = new User({
      email,
      password: hashedPassword,
      displayName,
      role,
      occupation,
      interests: interestsArray,
      profileImageUrl,
    });

    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const Login= async(req,res)=>{
    try{
        const {email,password} = req.body;
      

        if(!email || !password){
            return res.status(400).json({message:"Email and password are required"});
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid email or password"});
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({message:"Invalid email or password"});
        }

        const token=jwt.sign({userId:user._id,role:user.role},process.env.JWT_SECRET || "nitheswar reddy",{expiresIn:'24h'});
        return res.status(200).json({message:"Login successful", user, token});
    }
    catch(error){
        console.error(error);
        return res.status(500).json({message:"Internal server error"});
    }

}
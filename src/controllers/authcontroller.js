import User from "../models/usermodal.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";


export const Signup = async (req, res) => {
  try {
    const { email, password, displayName, role, occupation, interests } = req.body;
   

    if (!email || !password || !displayName || !occupation || !role || !interests) {
      return res.status(400).json({ message: "Required fields are missing" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, and a number",
      });
    }

    const displayNameRegex = /^[A-Za-z\s]{3,30}$/;
    if (!displayNameRegex.test(displayName)) {
      return res.status(400).json({
        message: "Display name must contain only letters and spaces (3–30 characters)",
      });
    }

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: "User with this email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

   const rawInterests = req.body.interests || req.body[" interests"] || "";

const interestsArray = Array.isArray(rawInterests)
  ? rawInterests
  : rawInterests.split(",").map((i) => i.trim())

    let profileImageUrl = null;

    if (req.file?.path) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "profile_images",
      });

      profileImageUrl = upload.secure_url;
      fs.unlinkSync(req.file.path);
    }

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

    return res.status(201).json({ message: "User registered successfully", user: newUser });

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
            return res.status(404).json({message:"user not found"});
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(401).json({message:"Invalid  password"});
        }

        const token=jwt.sign({userId:user._id,role:user.role},process.env.JWT_SECRET || "nitheswar reddy",{expiresIn:'24h'});
        return res.status(200).json({message:"Login successful", user, token});
    }
    catch(error){
        console.error(error);
        return res.status(500).json({message:"Internal server error"});
    }

}
import User from "../models/usermodal.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";
export const getUserProfile = async (req, res) => {
    try{
        const userId=req.user.id;
       
        const user=await User.findById(userId).select('-password');
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        return res.status(200).json({user});

    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Internal server error"});
    }
}


export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { displayName, occupation, interests } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (displayName !== undefined) user.displayName = displayName;
    if (occupation !== undefined) user.occupation = occupation;

    if (interests !== undefined) {
      user.interests = Array.isArray(interests)
        ? interests
        : interests.split(",").map((i) => i.trim());
    }

    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "profile_images",
      });

      fs.unlinkSync(req.file.path);
      user.profileImageUrl = upload.secure_url;
    }

    await user.save();
    return res.status(200).json({
      message: "Profile updated successfully",
      user,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; 
        const user=await User.findByIdAndDelete(userId);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        return res.status(200).json({message:"User deleted successfully"});
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}



export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

  
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({
      message: `User ${id} deleted successfully.`
    });

  } catch (error) {
    console.error("Admin delete error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

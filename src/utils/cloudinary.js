import {v2 as cloudinary} from 'cloudinary';
import dotenv from "dotenv";
dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME|| "dugssdfvk",
  api_key: process.env.CLOUDINARY_API_KEY || "415193445424372",
  api_secret: process.env.CLOUDINARY_API_SECRET || "baw9G_ZEWcxLg2eR6k-2oWtjpHY"
});

export default cloudinary;
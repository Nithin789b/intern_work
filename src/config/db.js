import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI||'mongodb://localhost:27017/intern_task_db');
        console.log("Database connected successfully");
    }
    catch(err){
        console.error("Database connection failed:", err);
    }
}

export default connectDB;
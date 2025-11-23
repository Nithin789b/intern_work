import mongoose from 'mongoose';

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    displayName:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    occupation:{
        type:String,
        required:true
    },
    interests:{
        type:[String],
        default:[]
    },
    profileImageUrl:{
        type:String,
        default:null
    }



},{    timestamps:true
});

const User=mongoose.model('User',userSchema);
export default User;

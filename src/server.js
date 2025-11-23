import 'dotenv/config';
import express from 'express';
import connectDB from './config/db.js';
import router from './routes/authroutes.js';
import router1 from './routes/userroutes.js';
const app = express();
const Port = process.env.PORT || 5000;

connectDB();

app.use(express.json());            
app.use(express.urlencoded({ extended: true }))
app.use('/auth',router)
app.use('/users', router1);

app.listen(Port,()=>{
    console.log(`Server is running on port ${Port}`);
});
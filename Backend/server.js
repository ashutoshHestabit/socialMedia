import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`server running on port - ${PORT}`))
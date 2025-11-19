
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/Db.js';
import cors from 'cors';
import authRouter from './routes/authRoute.js'
import cookieParser from 'cookie-parser';


dotenv.config();
const app = express();
const PORT = process.env.PORT

// db connection
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// Cors connection
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// middleware
app.use(express.json())
app.use(cookieParser())

app.get("/",(req,res)=>{
  res.send("api is working")
})

app.use('/api/auth',authRouter)

// Start server
app.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
});

export default app;
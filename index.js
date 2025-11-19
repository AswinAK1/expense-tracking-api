
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/Db.js';
import cors from 'cors';
import authRouter from './routes/authRoute.js'
import cookieParser from 'cookie-parser';
import categoryRoutes from './routes/categoryRoutes.js'
import expenseRoutes from './routes/expenseRoutes.js'
import summaryRoutes from './routes/summaryRoutes.js'



dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;


// db connection
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// Cors connection
app.use(cors({
  origin: [
    "https://expense-tracking-web-1.onrender.com",
    "http://localhost:5173",
  ],
  methods: "GET,POST,PUT,DELETE,PATCH",
  credentials: true
}));



// middleware
app.use(express.json())
app.use(cookieParser())

app.get("/",(req,res)=>{
  res.send("api is working")
})

app.use('/api/auth',authRouter)
app.use("/api/categories", categoryRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/summary", summaryRoutes);

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});


export default app;
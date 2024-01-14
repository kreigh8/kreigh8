import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import session from 'express-session'
import MongoStore from 'connect-mongo'
import { notFound, errorHandler } from "./middlewares/ErrorMiddleware";
import clientRoutes from "./routes/clientRoutes";
import userRoutes from "./routes/userRoutes";

const app: Application = express();

dotenv.config();

connectDB();

app.use(express.json());

// Enable CORS for all routes
app.use(cors({
  origin: "*",
}));

// Default
app.get("/api", (req: Request, res: Response) => {
  res.status(201).json({ message: "Welcome to Auth ts" });
});

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000,
  },
  rolling: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL
  })
}))

// User Route
app.use('/api/clients', clientRoutes)
app.use('/api/users', userRoutes)

// Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, (): void => console.log(`Server is running on ${PORT}`));

import express, { Application, Request, Response } from "express"
import dotenv from "dotenv"
import path from 'path'
import cors from "cors"
import multer from 'multer'
import connectDB from "./config/db"
import session from 'express-session'
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo'
import { notFound, errorHandler } from "./middlewares/ErrorMiddleware"
import clientRoutes from "./routes/clientRoutes"
import userRoutes from "./routes/userRoutes"
import { createClient, updateClient } from "./controllers/clients"

const app: Application = express()

dotenv.config()

connectDB()

app.use(express.json())

// Enable CORS for all routes
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "PATCH", "DELETE"],
  credentials: true,
}))

app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 60 * 60 * 1000,
  },
  rolling: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL
  })
}))

app.use('/assets', express.static('./public/assets'))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('file', file)
    cb(null, path.resolve('./public/assets'))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage })

// Default
app.get("/api", (req: Request, res: Response) => {
  res.status(201).json({ message: "Welcome to Auth ts" })
})

app.post('/api/clients', upload.single('picture'), createClient)

// User Route
app.use('/api/clients', clientRoutes)
app.use('/api/users', userRoutes)

// Middleware
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, (): void => console.log(`Server is running on ${PORT}`))


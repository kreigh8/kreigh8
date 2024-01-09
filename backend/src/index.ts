import 'dotenv/config'
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import clientRoutes from './routes/clients'
import userRoutes from './routes/users'
import morgan from 'morgan'
import createHttpError, { isHttpError } from 'http-errors'
import session from 'express-session'
import env from './util/validateEnv'
import MongoStore from 'connect-mongo'

const app = express()

app.use(morgan('dev'))

app.use(express.json())

app.use(cors({
  origin: '*'
}))

app.use(session({
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000,
  },
  rolling: true,
  store: MongoStore.create({
    mongoUrl: env.MONGO_URL
  })
}))

app.use('/api/clients', clientRoutes)
app.use('/api/users', userRoutes)

app.use((req, res, next) => {
  next(createHttpError(404, 'Endpoint not found'))
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error)
  let errorMessage = 'An uknown error occured'
  let statusCode = 500
  if (isHttpError(error)) {
    statusCode = error.status
    errorMessage = error.message
  }

  res.status(statusCode).json({ error: errorMessage })
})
import mongoose from 'mongoose'

const port = env.PORT

mongoose.connect(env.MONGO_URL).then(() => {
  console.log('Mongoose Connected')
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
  })
}).catch(console.error)


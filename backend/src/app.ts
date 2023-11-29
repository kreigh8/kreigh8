import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan'
import userRoutes from './routes/users'
import clientRoutes from './routes/clients'
import createHttpError, { isHttpError } from 'http-errors'
import path from 'path'

const app = express()

app.use(morgan('dev'))

app.use(express.json())
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

app.use('/api/users', userRoutes)
app.use('/api/clients', clientRoutes)

app.use((req, res, next) => {
  next(createHttpError(404, 'Endpoint not found'))
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error)
  let errorMessage = 'An unknown error occurred'
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status
    errorMessage = error.message
  }
  return res.status(statusCode).json({ error: errorMessage })
})

export default app
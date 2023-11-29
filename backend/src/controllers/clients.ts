import { RequestHandler } from "express"
import ClientsModel from '../models/Clients'
import createHttpError from "http-errors"

export const getClients: RequestHandler = async (req, res, next) => {
  try {
    const clients = await ClientsModel.find().lean().exec()
    res.status(200).json(clients)
  } catch (error) {
    next(error)
  }
}

interface CreateUserBody {
  email: string,
  username?: string,
  password: string
}

export const createUser: RequestHandler<unknown, unknown, CreateUserBody, unknown> = async (req, res, next) => {
  const { email, username, password } = req.body


  try {

    if (!email) {
      throw createHttpError(400, 'New user must have email')
    }
  } catch (error) {
    next(error)
  }
}
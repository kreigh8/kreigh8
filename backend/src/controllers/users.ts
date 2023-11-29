import { RequestHandler } from "express"
import UserModel from '../models/User'
import createHttpError from "http-errors"

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await UserModel.find().select('-password').lean().exec()
    res.status(200).json(users)
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
    const users = await UserModel.create({
      email,
      username,
      
    })
  } catch (error) {
    next(error)
  }
}

export const updateNote: RequestHandler = async (req, res, next) => {

}
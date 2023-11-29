import { RequestHandler } from "express"
import UserModel from '../models/User'
// import createHttpError from "http-errors"

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await UserModel.find().select('-password').lean().exec()
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}

// interface CreateUserBody {
//   email: string,
//   username?: string,
//   password: string
// }
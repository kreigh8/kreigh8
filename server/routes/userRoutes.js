import express from 'express'
import { getAllUsers, updateUser, deleteUser, createNewUser } from '../controllers/userContoller.js'

const userRouter = express.Router()

userRouter.route('/')
  .get(getAllUsers)
  .post(createNewUser)
  .patch(updateUser)
  .delete(deleteUser)

export default userRouter


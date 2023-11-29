import express from 'express'
import * as UsersController from '../controllers/users'

const router = express.Router()

router.get('/', UsersController.getUsers)

export default router
import express from 'express'
import * as UserController from '../controllers/users'
import { requiresAuth } from '../middlewares/auth'

const router = express.Router()

router.get('/', requiresAuth, UserController.getAuthenticatedUser)

router.post('/signup', requiresAuth, UserController.signUp)

router.post('/login', UserController.login)

router.post('/logout', requiresAuth, UserController.logout)

export default router
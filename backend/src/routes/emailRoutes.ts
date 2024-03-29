import express from 'express'
import * as EmailController from '../controllers/email'

const router = express.Router()

router.post('/', EmailController.sendContactEmail)

export default router
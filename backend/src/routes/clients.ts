import express from 'express'
import * as ClientsController from '../controllers/clients'

const router = express.Router()

router.get('/', ClientsController.getClients)

export default router
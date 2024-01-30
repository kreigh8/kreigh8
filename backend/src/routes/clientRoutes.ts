import express from 'express'
import * as ClientsController from '../controllers/clients'
import { requiresAuth } from '../middlewares/auth'

const router = express.Router()

router.get('/', ClientsController.getClients)

router.get('/:clientId',  ClientsController.getClient)

router.post('/', requiresAuth, ClientsController.createClient)

router.patch('/:clientId', ClientsController.updateClient)

router.delete('/:clientId', requiresAuth, ClientsController.deleteClient)

export default router
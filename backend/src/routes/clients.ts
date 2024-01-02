import express from 'express'
import * as ClientsController from '../controllers/clients'

const router = express.Router()

router.get('/', ClientsController.getClients)

router.get('/:clientId', ClientsController.getClient)

router.post('/', ClientsController.createClient)

router.patch('/:clientId', ClientsController.updateClient)

router.delete('/:clientId', ClientsController.deleteNote)

export default router
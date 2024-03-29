import { NextFunction, Request, Response, RequestHandler } from 'express'
import createHttpError from 'http-errors'
import mongoose from 'mongoose'
import ClientModel from '../models/client'
import { assertIsDefined } from '../utils/assertIsDefined'

export const getClients = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clients = await ClientModel.find().exec()

    res.status(200).json(clients)
  } catch (error) {
    next(error)
  }
}

export const getClient = async (req: Request, res: Response, next: NextFunction) => {
  const clientId = req.params.clientId
  try {
    if (!mongoose.isValidObjectId(clientId)) {
      throw createHttpError(400, 'Invalid client id')
    }

    const client = await ClientModel.findById(clientId).exec()

    if (!client) {
      throw createHttpError(404, 'Client not found')
    }

    res.status(200).json(client)
  } catch (error) {
    next(error)
  }
}

// interface CreateClientBody {
//   client?: string
//   url?: string
//   picturePath?: string
//   description?: string
//   active?: string
// }

export const createClient = async (req: Request, res: Response, next: NextFunction) => {
  const client = req.body.client
  const url = req.body.url
  const picturePath = req.body.picturePath
  const description = req.body.description
  const active = req.body.active

  const authenticatedUserId = req.session.userId
  
  try {
    assertIsDefined(authenticatedUserId)

    if (!client) {
      throw createHttpError(400, 'Client must have a name')
    }

    if (!picturePath) {
      throw createHttpError(400, 'Client must have an image')
    }

    const newClient = await ClientModel.create({
      client: client,
      picturePath: picturePath,
      description: description,
      url: url,
      active: active
    })

    res.status(201).json(newClient)
  } catch (error) {
    next(error)
  }
}

// interface UpdateClientParams {
//   clientId: string
// }

// interface UpdateClientBody {
//   client?: string
//   url?: string
//   picturePath?: string
//   description?: string
//   active?: boolean
// }

export const updateClient = async (req: Request, res: Response, next: NextFunction) => {
  const clientId = req.params.clientId
  const newClient = req.body.client
  const newUrl = req.body.url
  const newPicturePath = req.body.picturePath
  const newDescription = req.body.description
  const newActive = req.body.active

  const authenticatedUserId = req.session.userId

  try {
    assertIsDefined(authenticatedUserId);

    if (!mongoose.isValidObjectId(clientId)) {
      throw createHttpError(400, 'Invalid client id')
    }

    if (!newClient) {
      throw createHttpError(400, 'Client must have a name')
    }

    if (typeof newActive !== 'boolean') {
      throw createHttpError(400, 'Active must be type boolean')
    }

    const client = await ClientModel.findById(clientId).exec()

    if (!client) {
      throw createHttpError(404, 'Client not found')
    }

    client.client = newClient
    client.url = newUrl
    client.description = newDescription
    client.active = newActive

    const updatedClient = await client.save()

    res.status(200).json(updatedClient)
    
  } catch (error) {
    next(error)
  }
}

export const deleteClient = async (req: Request, res: Response, next: NextFunction) => {
  const clientId = req.params.clientId

  const authenticatedUserId = req.session.userId

  try {
    assertIsDefined(authenticatedUserId)

    if (!mongoose.isValidObjectId(clientId)) {
      throw createHttpError(400, 'Invalid client id')
    }

    const client = await ClientModel.findById(clientId).exec()

    if (!client) {
      throw createHttpError(404, 'Client not found')
    }

    await client.remove();

    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}
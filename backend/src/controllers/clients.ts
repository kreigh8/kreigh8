import { RequestHandler } from 'express'
import ClientModel from '../models/client'
import createHttpError from 'http-errors'
import mongoose from 'mongoose'

export const getClients: RequestHandler = async (req, res, next) => {
  try {
    const notes = await ClientModel.find().exec()

    res.status(200).json(notes)
  } catch (error) {
    next(error)
  }
}

export const getClient: RequestHandler = async (req, res, next) => {
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

interface CreateClientBody {
  name?: string
  description?: string
  active?: boolean
}

export const createClient: RequestHandler<unknown, unknown, CreateClientBody, unknown> = async (req, res, next) => {
  const name = req.body.name
  const description = req.body.description
  const active = req.body.active
  
  try {
    if (!name) {
      throw createHttpError(400, 'Client must have a name')
    }

    if (typeof active !== 'boolean') {
      throw createHttpError(400, 'Active must be type boolean')
    }

    const newClient = await ClientModel.create({
      name: name,
      description: description,
      active: active
    })

    res.status(201).json(newClient)
  } catch (error) {
    next(error)
  }
}

interface UpdateClientParams {
  clientId: string
}

interface UpdateClientBody {
  name?: string
  description?: string
  active?: boolean
}

export const updateClient: RequestHandler<UpdateClientParams, unknown, UpdateClientBody, unknown> = async (req, res, next) => {
  const clientId = req.params.clientId
  const newName = req.body.name
  const newDescription = req.body.description
  const newActive = req.body.active

  try {
    if (!mongoose.isValidObjectId(clientId)) {
      throw createHttpError(400, 'Invalid client id')
    }

    if (!newName) {
      throw createHttpError(400, 'Client must have a name')
    }

    if (typeof newActive !== 'boolean') {
      throw createHttpError(400, 'Active must be type boolean')
    }

    const client = await ClientModel.findById(clientId).exec()

    if (!client) {
      throw createHttpError(404, 'Client not found')
    }

    client.name = newName
    client.description = newDescription
    client.active = newActive

    const updatedClient = await client.save()

    res.status(200).json(updatedClient)
    
  } catch (error) {
    next(error)
  }
}

export const deleteClient: RequestHandler = async (req, res, next) => {
  const clientId = req.params.clientId

  try {
    if (!mongoose.isValidObjectId(clientId)) {
      throw createHttpError(400, 'Invalid client id')
    }

    const client = await ClientModel.findById(clientId).exec()

    if (!client) {
      throw createHttpError(404, 'Client not found')
    }

    ClientModel.findByIdAndDelete(clientId)

    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}
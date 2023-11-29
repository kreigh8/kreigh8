import { RequestHandler } from "express"
import ClientsModel from '../models/Clients'
import createHttpError from "http-errors"
import mongoose from "mongoose"

export const getClients: RequestHandler = async (req, res, next) => {
  try {
    const clients = await ClientsModel.find().lean().exec()
    res.status(200).json(clients)
  } catch (error) {
    next(error)
  }
}

interface CreateClientBody {
  client: string,
  date?: string
  picturePath?: string
  description?: string
  active?: boolean
}

export const createClient: RequestHandler<unknown, unknown, CreateClientBody, unknown> = async (req, res, next) => {
  const { client, date, picturePath, description, active } = req.body


  try {
    if (!client) {
      throw createHttpError(400, 'New client must have a client')
    }

    const newClient = await ClientsModel.create({
      client,
      date,
      picturePath,
      description,
      active
    })

    res.status(201).json(newClient)
  } catch (error) {
    next(error)
  }
}

export const getClient: RequestHandler = async (req, res, next) => {
  const clientId = req.params.clientId

  try {
    if (!mongoose.isValidObjectId(clientId)) {
      throw createHttpError(400, 'Invalid clientId')
    }

    const client = await ClientsModel.findById(clientId).lean().exec()

    if (!client) {
      throw createHttpError(404, 'Client not found')
    }

    res.status(200).json(client)
  } catch (error) {
    next(error)
  }
}

interface UpdateClientParms {
  clientId: string
}

interface UpdateClientBody {
  client: string,
  date?: string
  picturePath?: string
  description?: string
  active?: boolean
}

export const updateClient: RequestHandler<UpdateClientParms, unknown, UpdateClientBody, unknown> = async (req, res, next) => {
  const clientId = req.params.clientId
  const { client, date, picturePath, description, active } = req.body
  
  try {
    if (!mongoose.isValidObjectId(clientId)) {
      throw createHttpError(400, 'Invalid clientId')
    }

    if (!client) {
      throw createHttpError(400, 'Client must have a client name')
    }

    if (typeof active !== 'boolean') {
      throw createHttpError(40, 'Active must be a boolean')
    }

    const foundClient = await ClientsModel.findById(clientId).exec()

    if (!foundClient) {
      throw createHttpError(404, 'Client not found')
    }
    
    foundClient.client = client
    foundClient.date = date ?? ''
    foundClient.picturePath = picturePath ?? ''
    foundClient.description = description ?? ''
    foundClient.active = active ?? ''

    const updatedClient = await foundClient.save()

    res.status(200).json(updatedClient)
  } catch (error) {
    next(error)
  }
}

export const deleteClient: RequestHandler = async (req, res, next) => {
  const clientId = req.params.clientId

  try {
    if (!mongoose.isValidObjectId(clientId)) {
      throw createHttpError(400, 'Invalid clientId')
    }

    const foundClient = await ClientsModel.findById(clientId).exec()

    if (!foundClient) {
      throw createHttpError(404, 'Client not found')
    }

    await foundClient.deleteOne()

    res.status(204)
  } catch (error) {
    next(error)
  }
}
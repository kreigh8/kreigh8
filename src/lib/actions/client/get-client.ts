'use server'

import Client from '@/model/Client'
import connectDB from '../../db'

export const getClients = async () => {
  try {
    await connectDB()

    const clients = await Client.find({})

    return JSON.parse(JSON.stringify(clients))
  } catch (error) {
    console.log('Error getting moods ' + error)
    return []
  }
}

export const getClient = async (id: string) => {
  try {
    await connectDB()

    const client = await Client.findById(id)

    if (!client) {
      throw new Error('Client not found')
    }

    return JSON.parse(JSON.stringify(client))
  } catch (error) {
    console.log('Error getting technology ' + error)
    return []
  }
}

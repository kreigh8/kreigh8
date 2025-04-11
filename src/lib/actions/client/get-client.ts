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

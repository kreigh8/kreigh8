'use server'

import Technology from '@/model/Technology'
import connectDB from '../db'

export const getTechnologies = async () => {
  try {
    await connectDB()

    const technologies = await Technology.find({})

    return JSON.parse(JSON.stringify(technologies))
  } catch (error) {
    console.log('Error getting moods ' + error)
    return []
  }
}

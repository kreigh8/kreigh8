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

export const getTechnology = async (id: string) => {
  try {
    await connectDB()

    console.log('id', id)

    const technology = await Technology.findById(id)

    console.log('technology', technology)

    if (!technology) {
      throw new Error('Technology not found')
    }

    return JSON.parse(JSON.stringify(technology))
  } catch (error) {
    console.log('Error getting technology ' + error)
    return []
  }
}

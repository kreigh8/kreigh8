import mongoose, { Connection } from 'mongoose'

let cachedConnection: Connection | null = null

export async function connectToMongoDb() {
  if (cachedConnection) {
    console.log('Using cached db conneciton')
    return cachedConnection
  }

  try {
    const cnx = await mongoose.connect(process.env.MONGODB_URI as string)

    cachedConnection = cnx.connection

    console.log('New mongodb connection established')

    return cachedConnection
  } catch (error) {
    console.log(error)
    throw error
  }
}

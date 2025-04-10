import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('Connected to mongo db')
  } catch (error) {
    console.log('Error ' + error)
    process.exit(1)
  }
}

export default connectDB

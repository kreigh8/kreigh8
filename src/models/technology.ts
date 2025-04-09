import mongoose from 'mongoose'

const technologySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  techName: { type: String, required: true },
  techUrl: { type: String, required: true },
  imageUrl: { type: String, required: true },
  lastUpdated: { type: Date, required: true }
})

const Technology = mongoose.model('Technology', technologySchema)

export default Technology

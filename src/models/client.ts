import mongoose from 'mongoose'

const clientSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  clientName: { type: String, required: true },
  active: { type: String, required: true },
  clientUrl: { type: String, required: true },
  imageUrl: { type: String, required: true },
  lastUpdated: { type: Date, required: true }
})

const Client = mongoose.models.Client || mongoose.model('Client', clientSchema)

export default Client

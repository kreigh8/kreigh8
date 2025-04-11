import mongoose, { Document, Schema } from 'mongoose'

export interface IClient extends Document {
  _id: string
  clientName: string
  clientUrl: string
  active: string
  imageUrl: string
  lastUpdated: Date
}

const ClientSchema: Schema = new Schema({
  clientName: {
    type: String,
    required: true,
    unique: true
  },
  clientUrl: {
    type: String,
    required: true
  },
  active: {
    type: String,
    require: true
  },
  imageUrl: {
    type: String
  },
  user: {
    type: String || mongoose.Schema.Types.ObjectId,
    required: true
  },
  lastUpdated: { type: Date, required: true }
})

const Client =
  mongoose.models?.Client || mongoose.model<IClient>('Client', ClientSchema)

export default Client

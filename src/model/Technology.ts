import mongoose, { Document, Schema } from 'mongoose'

export interface ITechnology extends Document {
  _id: string
  techName: string
  techUrl: string
  imageUrl: string
  lastUpdated: Date
}

const TechnologySchema: Schema = new Schema({
  techName: {
    type: String,
    required: true,
    unique: true
  },
  techUrl: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },
  user: {
    type: String,
    required: true
  },
  lastUpdated: { type: Date, required: true }
})

const Technology =
  mongoose.models?.Technology ||
  mongoose.model<ITechnology>('Technology', TechnologySchema)

export default Technology

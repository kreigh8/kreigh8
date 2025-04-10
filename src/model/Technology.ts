import mongoose, { Document, Schema } from 'mongoose'

interface ITechnology extends Document {
  techName: string
  lastUpdated: Date
}

const TechnologySchema: Schema = new Schema({
  techName: {
    type: String,
    required: true
  },
  lastUpdated: { type: Date, required: true }
})

const Technology =
  mongoose.models?.Technology ||
  mongoose.model<ITechnology>('Technology', TechnologySchema)

export default Technology

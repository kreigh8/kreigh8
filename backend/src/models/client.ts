import { Schema, InferSchemaType, model } from 'mongoose'

const clientSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  active: { type: Boolean }
})

type Client = InferSchemaType<typeof clientSchema>

export default model<Client>('Client', clientSchema)
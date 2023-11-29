import { InferSchemaType, Schema, model } from 'mongoose'

const ClientSchema = new Schema({
  client: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: String, default: '' },
  description: { type: String, default: '' },
  picturePath: { type: String, default: '' },
  active: { type: Boolean, default: false }
})

type Client = InferSchemaType<typeof ClientSchema>

export default model<Client>('Clients', ClientSchema)
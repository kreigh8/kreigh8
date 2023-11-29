import { InferSchemaType, Schema, model } from 'mongoose'

const UserSchema = new Schema({
  email: { type: String, required: true },
  username: { type: String },
  password: { type: String, required: true },
  active: { type: Boolean, default: true }
})

type User = InferSchemaType<typeof UserSchema>

export default model<User>('User', UserSchema)
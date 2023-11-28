import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  }
})


const User = mongoose.model('User', userSchema)
export {
  User
}
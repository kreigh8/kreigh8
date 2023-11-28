import { User } from '../models/User.js'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'

// @desc Get all users
// @route GET /users
// @access PRIVATE
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').lean()
  
  if (!users?.length) {
    return res.status(400).json({ message: 'No users found' })
  }

  res.json(users)
})

// @desc Create new user
// @route POST /users
// @access PRIVATE
const createNewUser = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body

  // Confirm data
  if (!password || !email) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  // Check for duplicates
  const duplicate = await User.findOne({ username }).lean().exec()

  if (duplicate) {
    return res.status(409).json({ message: 'Duplicate username' })
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  const userObject = { email, username, password: hashedPassword}

  // Create and store new user
  const user = await User.create(userObject)

  if (user) {
    res.status(201).json({ message: `New user ${email} created`})
  } else {
    res.status(400).json({ message: 'Invalid user data received' })
  }
})

// @desc Update user
// @route PATCH /users
// @access PRIVATE
const updateUser = asyncHandler(async (req, res) => {
  const { id, username, email, active, password } = req.body

  // Confirm data
  if (!id || !email || typeof active !== 'boolean') {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const user = await User.findById(id).exec()

  if (!user) {
    res.status(400).json({ message: 'User not found' })
  }

  // Check for duplicate
  const duplicate = await User.findOne({ email }).lean().exec()
  
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: 'Duplicate username' })
  }

  if (username) {
    user.username = username
  }

  user.email = email
  user.active = active

  if (password) {
    user.password = await bcrypt.hash(password, 10)
  }

  const updateUser = await user.save()
  
  res.json({ message: `${updateUser.email} updated`})
})

// @desc Delete user
// @route DELETE /users
// @access PRIVATE
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body

  if (!id) {
    return res.status(400).json({ message: 'User ID Required' })
  }

  const user = await User.findById(id).exec()

  if (!user) {
    return res.status(400).json({ message: 'User not found' })
  }

  const result = await user.deleteOne()

  const reply = `Username ${result.username} with ID ${result._id} deleted`

  res.json(reply)
})

export {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser
}
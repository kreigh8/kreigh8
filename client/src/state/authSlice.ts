import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from '../models/user'

interface AuthState {
  user: User | null,
  loading: boolean,
  error: string | null
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state: AuthState, action: PayloadAction<User>) => {
      state.user = {
        _id: action.payload._id,
        username: action.payload.username,
        email: action.payload.email
      }
    }
  },
  extraReducers: () => {
  }
})

export const { setLogin } = authSlice.actions

export default authSlice.reducer
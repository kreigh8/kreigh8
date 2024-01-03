import { createSlice } from '@reduxjs/toolkit'
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
    setLogin: (state, action) => {
      state.user = action.payload.user
    }
  },
  extraReducers: () => {
  }
})

export const { setLogin } = authSlice.actions

export default authSlice.reducer
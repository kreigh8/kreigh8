import { createSlice } from '@reduxjs/toolkit'

interface CommonState {
  mode: 'light' | 'dark'
}

const initialState: CommonState = {
  mode: 'light',
}

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setMode: (state: CommonState) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    }
  },
  extraReducers: () => {
  }
})

export const { setMode } = commonSlice.actions

export default commonSlice.reducer
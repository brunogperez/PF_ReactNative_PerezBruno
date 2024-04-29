import { createSlice } from '@reduxjs/toolkit'

export const globalSlice = createSlice({
  name: 'counter',
  initialState: {
    value: {
      darkMode: false
    }
  },
  reducers: {
    setDarkMode: (state, { payload }) => {
      state.value.darkMode = payload
    }

  }
})

export const { setDarkMode } = globalSlice.actions

export default globalSlice.reducer
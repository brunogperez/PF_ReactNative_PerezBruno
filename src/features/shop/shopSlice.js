import { createSlice } from '@reduxjs/toolkit'

export const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    value: {
      categorySelected: '',
      itemIDSelected: ''
    }
  },
  reducers: {
    setCategorySelected: (state, { payload }) => {
      state.value.categorySelected = payload
    },
    setItemIDSelected: (state, { payload }) => {
      state.value.itemIDSelected = payload
    }
  }
})

export const { setCategorySelected, setItemIDSelected } = shopSlice.actions

export default shopSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    value: {
      user: 'userLoggedID',
      updatedAt: Date.now().toLocaleString(),
      total: null,
      cart: []
    }
  },
  reducers: {
    onCart: (state, { payload }) => {
      state.value = payload
    },
    addToCart: (state, { payload }) => {

      const productRepeated = state.value.cart.find(
        (item) => item.id === payload.id
      )
      if (productRepeated) {
        const itemsUpdated = state.value.cart.map((item) => {
          if (item.id === payload.id) {
            item.quantity += payload.quantity
            return item
          }
          return item
        })
        const total = itemsUpdated.reduce(
          (acc, currentItem) =>
            (acc += currentItem.price * currentItem.quantity),
          0
        )
        state.value = {
          ...state.value,
          cart: itemsUpdated,
          total,
          updatedAt: new Date().toLocaleString(),
        }
      } else {
        state.value.cart.push(payload)
        const total = state.value.cart.reduce(
          (acc, currentItem) =>
            (acc += currentItem.price * currentItem.quantity),
          0
        )
        state.value = {
          ...state.value,
          total,
          updatedAt: new Date().toLocaleString(),
        }
      }
    },
    increment(state, { payload }) {

      const item = state.value.cart.find((item) => item.id === payload);
      item.quantity++

    },
    decrement(state, { payload }) {

      const item = state.value.cart.find((item) => item.id === payload)
      if (item.quantity === 1) {
        item.quantity = 1
      } else {
        item.quantity--
      }
    },
    removeProduct: (state, { payload }) => {

      const newCart = state.value.cart.filter((item) => item.id !== payload)

      state.value.cart = newCart

    },
    clearCart: (state) => {

      const clearCart = []

      state.value.cart = clearCart

    }
  }
})

export const { onCart, addToCart, increment, decrement, removeProduct, clearCart } = cartSlice.actions

export default cartSlice.reducer

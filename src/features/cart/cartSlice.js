import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    value: {
      cart: []
    }
  },
  reducers: {
    onCart: (state, { payload }) => {
      state.value.cart = payload
    },
    addToCart: (state, { payload }) => {

      const productInCart = state.value.cart.find((product) => product.id == payload.id)
      if (productInCart) {
        productInCart.quantity++
      } else {
        state.value.cart.push({ ...payload, quantity: 1 })
      }

    },
    increment(state, { payload }) {

      const productInCart = state.value.cart.find((product) => product.id == payload.id)
      if (productInCart) productInCart.quantity++

    },
    decrement(state, { payload }) {

      const productInCart = state.value.cart.find((product) => product.id == payload.id)

      if (productInCart == 1) {
        const products = state.value.cart.filter(product => product.id !== payload.id)
        state.value.cart = products
      } else {
        productInCart.quantity--
      }
    },
    removeProduct: (state, { payload }) => {

      const products = state.value.cart.filter(product => product.id !== payload.id)
      state.value.cart = products

    },
    clearCart: (state) => {

      state.value.cart = []
      
    }
  }
})

export const { onCart, addToCart, increment, decrement, removeProduct, clearCart } = cartSlice.actions

export default cartSlice.reducer

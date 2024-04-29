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
    /*     increment(state, { payload }) {
    
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
        }, */
    removeProduct: (state, { payload }) => {

      const products = state.value.cart.filter(product => product.id !== payload.id)
      state.value.cart = products

    },
    clearCart: (state) => {

      state.value.cart = []

    }
  }
})

export const { addToCart, increment, decrement, removeProduct, clearCart } = cartSlice.actions

export default cartSlice.reducer

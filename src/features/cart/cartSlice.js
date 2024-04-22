import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        value: {
            cart: null
        }
    },
    reducers: {
        onCart: (state, { payload }) => {
            
            state.cart = payload
        }
    }
})

export const { onCart } = cartSlice.actions

export default cartSlice.reducer
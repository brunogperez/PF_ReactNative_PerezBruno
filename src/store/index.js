import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import shopReducer from '../features/shop/shopSlice'
import cartReducer from '../features/cart/cartSlice'
import globalReducer from '../features/global/globalSlice'

export default configureStore({
  reducer: {
    counterReducer,
    shopReducer,
    cartReducer,
    globalReducer
  }
})
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import shopReducer from '../features/shop/shopSlice'
import cartReducer from '../features/cart/cartSlice'
import globalReducer from '../features/global/globalSlice'
import { shopApi } from '../services/shopService'
import { setupListeners } from '@reduxjs/toolkit/query'

const store = configureStore({
  reducer: {
    counterReducer,
    shopReducer,
    cartReducer,
    globalReducer,
    [shopApi.reducerPath]: shopApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopApi.middleware),
})

setupListeners(store.dispatch)

export default store
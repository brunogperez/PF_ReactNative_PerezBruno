import { configureStore } from '@reduxjs/toolkit'
import shopReducer from '../features/shop/shopSlice'
import cartReducer from '../features/cart/cartSlice'
import globalReducer from '../features/global/globalSlice'
import authReducer from '../features/auth/authSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { shopApi } from '../services/shopService'
import { authApi } from '../services/authService'


const store = configureStore({
  reducer: {
    shopReducer,
    cartReducer,
    globalReducer,
    authReducer,
    [shopApi.reducerPath]: shopApi.reducer,
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(shopApi.middleware)
    .concat(authApi.middleware)
})

setupListeners(store.dispatch)

export default store
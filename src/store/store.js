import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './slices/authSlice'
import CategoryReducer from './slices/categorySlice'
import ProductReducer from './slices/productSlice'
import RequestReducer from './slices/requestslice'

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    category: CategoryReducer,
    product: ProductReducer,
    request: RequestReducer,
  },
})
export default store

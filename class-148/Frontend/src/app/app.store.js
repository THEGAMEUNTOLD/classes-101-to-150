import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/state/auth.slice.js"
import productReducer from "../features/products/state/product.slice.js"
import cartReducer from "../features/products/state/cart.slice.js" // ✅ ADD THIS



export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        cart: cartReducer
    }
})
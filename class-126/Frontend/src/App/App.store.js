import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/Auth/Auth.slice";
import chatReducer from "../Features/Chat/Chat.slice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        chat: chatReducer,
    }
})
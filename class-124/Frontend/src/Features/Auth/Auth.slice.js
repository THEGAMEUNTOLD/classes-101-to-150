import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        error: null,
        isAuthenticated: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        SetLoading: (state, action) => {
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        }
    }
});

export const { setUser ,SetLoading,setError} = authSlice.actions;
export default authSlice.reducer;
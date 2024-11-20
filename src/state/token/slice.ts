import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
    name: 'auth',
    initialState: { token: 'token in store'},
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
        clearToken: (state) => {
            state.token = ''
        }
    }
})
export const { setToken, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer
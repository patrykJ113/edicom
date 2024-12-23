import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
    name: 'auth',
    initialState: { accessToken: ''},
    reducers: {
        setToken: (state, action) => {
            state.accessToken = action.payload
        },
        clearToken: (state) => {
            state.accessToken = ''
        }
    }
})
export const { setToken, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer
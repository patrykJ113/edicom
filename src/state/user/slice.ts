import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: '',
        email: '',
        id: ''
    },
    reducers: {
        setUser: (state, actions) => {
            state.email = actions.payload.email
            state.name = actions.payload.name
            state.id = actions.payload.id
        },
        clearUser: (state) => {
            state.email = ''
            state.name = ''
            state.id = ''
        }
    }
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
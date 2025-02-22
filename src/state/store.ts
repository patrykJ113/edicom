import { configureStore } from '@reduxjs/toolkit'
import tokenReducer from '@state/token/slice'
import userReducer from '@state/user/slice'

const store = configureStore({
	reducer: {
		auth: tokenReducer,
		user: userReducer
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

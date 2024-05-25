import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice.slice'
export const store = configureStore({
    reducer: {
        user: userReducer
    },
})

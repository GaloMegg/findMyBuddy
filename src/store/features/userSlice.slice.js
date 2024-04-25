import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userId: '',
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (_, { payload }) => payload,
        resetUser: () => initialState,
    },
})

// Action creators are generated for each case reducer function
export const { setUser, resetUser } = counterSlice.actions

export default counterSlice.reducer
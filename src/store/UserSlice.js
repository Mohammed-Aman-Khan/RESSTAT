import { createSlice } from '@reduxjs/toolkit'

const UserSlice = createSlice({
    name: 'user',
    initialState: {
        loggedIn: false,
        data: null,
    },
    reducers: {
        LOGIN: (state, action) => {
            return {
                loggedIn: true,
                data: action.payload,
            }
        },
        LOGOUT: (state, action) => {
            return {
                loggedIn: false,
                data: null,
            }
        },
    },
})

export const {
    LOGIN,
    LOGOUT,
} = UserSlice.actions

export default UserSlice
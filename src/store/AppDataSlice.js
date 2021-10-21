import { createSlice } from '@reduxjs/toolkit'
import appData from '../schemas/appData'

const BackdropSlice = createSlice({
    name: 'appData',
    initialState: localStorage.appData ? JSON.parse(localStorage.appData) : appData.getDefault(),
    reducers: {
        SET_LOADING: (state, action) => {
            state.backdrop = action.payload
            return state
        },
        SET_BACKDROP_TEXT: (state, action) => {
            state.backdropText = action.payload ?? null
            return state
        },
        SET_HAS_CHANGES: (state, action) => {
            state.hasChanges = action.payload
            return state
        }
    },
})

export const {
    SET_LOADING,
    SET_BACKDROP_TEXT,
    SET_HAS_CHANGES,
} = BackdropSlice.actions

export default BackdropSlice
import { createSlice } from '@reduxjs/toolkit'

const MyModelSlice = createSlice({
    name: 'lrModel',
    initialState: {
        intercept: null,
        coEfficient: null,
    },
    reducers: {
        INIT_MY_MODEL: (state, action) => action.payload,
        SET_INTERCEPT: (state, action) => { state.intercept = action.payload },
        SET_COEFFICIENT: (state, action) => { state.coEfficient = action.payload }
    },
})

export const {
    INIT_MY_MODEL,
    SET_INTERCEPT,
    SET_COEFFICIENT,
} = MyModelSlice.actions

export default MyModelSlice
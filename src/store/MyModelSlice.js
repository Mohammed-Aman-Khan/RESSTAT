import { createSlice } from '@reduxjs/toolkit'
import findIndex from 'lodash/findIndex'
import myModel from '../schemas/myModel'

const MyModelSlice = createSlice({
    name: 'lrModel',
    initialState: localStorage.lrModel ? JSON.parse(localStorage.lrModel) : myModel.getDefault(),
    reducers: {
        INIT_MY_MODEL: (state, action) => action.payload,
        SET_INTERCEPT: (state, action) => {
            let index = findIndex(state, { credits: action.payload.credits })
            state[ index ].intercept = action.payload.value
            return state
        },
        SET_COEFFICIENT: (state, action) => {
            let index = findIndex(state, { credits: action.payload.credits })
            state[ index ].coEfficient = action.payload.value
            return state
        },
        CLEAR_MY_MODEL: (state, action) => myModel.getDefault()
    },
})

export const {
    INIT_MY_MODEL,
    SET_INTERCEPT,
    SET_COEFFICIENT,
    CLEAR_MY_MODEL,
} = MyModelSlice.actions

export default MyModelSlice
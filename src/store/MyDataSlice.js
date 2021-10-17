import { createSlice } from '@reduxjs/toolkit'
import isEqual from 'lodash/isEqual'
import findIndex from 'lodash/findIndex'

const MyDataSlice = createSlice({
    name: 'myData',
    initialState: {
        semResults: [],
    },
    reducers: {
        INIT_MY_DATA: (state, action) => action.payload,
        ADD_SEM_RESULT: (state, action) => {
            state.semResults.push(action.payload)
            return state
        },
        DELETE_SEM_RESULT: (state, action) => {
            state.semResults = state.semResults.filter(i => !isEqual(i.sem, action.payload.sem))
            return state
        },
        EDIT_SEM_RESULT: (state, action) => {
            let index = findIndex(state.semResults, { sem: action.payload.sem })
            state.semResults[ index ] = action.payload.newResult
            return state
        },
    },
})

export const {
    ADD_SEM_RESULT,
    DELETE_SEM_RESULT,
    EDIT_SEM_RESULT,
} = MyDataSlice.actions

export default MyDataSlice
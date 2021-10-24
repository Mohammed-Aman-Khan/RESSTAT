import { createSlice } from '@reduxjs/toolkit'
import filter from 'lodash/filter'
import isEqual from 'lodash/isEqual'
import findIndex from 'lodash/findIndex'
import results from '../schemas/results'

const MyDataSlice = createSlice({
    name: 'results',
    initialState: localStorage.results ? JSON.parse(localStorage.results) : results.getDefault(),
    reducers: {
        INIT_RESULTS: (state, action) => action.payload,
        ADD_SEM_RESULT: (state, action) => {
            state.push(action.payload)
            return state
        },
        DELETE_SEM_RESULT: (state, action) => {
            state = filter(state, i => !isEqual(i.semester, action.payload.semester))
            return state
        },
        EDIT_SEM_RESULT: (state, action) => {
            let index = findIndex(state, { sem: action.payload.semester })
            state[ index ] = {
                semester: action.payload.semester,
                semResult: action.payload.newResult,
            }
            return state
        },
        CLEAR_RESULTS: (state, action) => results.getDefault()
    },
})

export const {
    INIT_RESULTS,
    ADD_SEM_RESULT,
    DELETE_SEM_RESULT,
    EDIT_SEM_RESULT,
    CLEAR_RESULTS,
} = MyDataSlice.actions

export default MyDataSlice
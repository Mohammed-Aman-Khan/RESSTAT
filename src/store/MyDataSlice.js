import { createSlice } from '@reduxjs/toolkit'
import filter from 'lodash/filter'
import isEqual from 'lodash/isEqual'
import findIndex from 'lodash/findIndex'
import results from '../schemas/results'

const MyDataSlice = createSlice({
    name: 'me',
    initialState: {
        loggedIn: false,
        results: results.getDefault(),
    },
    reducers: {
        INIT_ME: (state, action) => ({
            loggedIn: true,
            results: action.payload,
        }),
        ADD_SEM_RESULT: (state, action) => {
            state.results.push(action.payload)
            return state
        },
        DELETE_SEM_RESULT: (state, action) => {
            state.results = filter(state.results, i => !isEqual(i.semester, action.payload.semester))
            return state
        },
        EDIT_SEM_RESULT: (state, action) => {
            let index = findIndex(state.results, { sem: action.payload.semester })
            state.results[ index ] = {
                semester: action.payload.semester,
                semResult: action.payload.newResult,
            }
            return state
        },
    },
})

export const {
    INIT_ME,
    ADD_SEM_RESULT,
    DELETE_SEM_RESULT,
    EDIT_SEM_RESULT,
} = MyDataSlice.actions

export default MyDataSlice
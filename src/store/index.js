import { configureStore } from '@reduxjs/toolkit'
import MyDataSlice from './MyDataSlice'

const Store = configureStore({
    reducer: {
        myData:MyDataSlice.reducer,
    },
})

export default Store
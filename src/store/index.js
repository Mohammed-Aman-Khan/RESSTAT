import { configureStore } from '@reduxjs/toolkit'
import MyDataSlice from './MyDataSlice'
import MyModelSlice from './MyModelSlice'

const Store = configureStore({
    reducer: {
        lrModel: MyModelSlice.reducer,
        me: MyDataSlice.reducer,
    },
})

export default Store
import { configureStore } from '@reduxjs/toolkit'
import MyDataSlice from './MyDataSlice'
import MyModelSlice from './MyModelSlice'

const Store = configureStore({
    reducer: {
        lrModel: MyModelSlice.reducer,
        me: MyDataSlice.reducer,
    },
})

Store.subscribe(() => {
    const { lrModel, me } = Store.getState()
    localStorage.lrModel = JSON.stringify(lrModel)
    localStorage.me = JSON.stringify(me)
})

export default Store
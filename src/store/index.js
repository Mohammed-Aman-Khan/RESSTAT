import { configureStore } from '@reduxjs/toolkit'
import AppDataSlice from './AppDataSlice'
import MyDataSlice from './MyDataSlice'
import MyModelSlice from './MyModelSlice'

const Store = configureStore({
    reducer: {
        appData: AppDataSlice.reducer,
        lrModel: MyModelSlice.reducer,
        me: MyDataSlice.reducer,
    },
})

Store.subscribe(() => {
    const { appData, lrModel, me } = Store.getState()
    localStorage.appData = JSON.stringify(appData)
    localStorage.lrModel = JSON.stringify(lrModel)
    localStorage.me = JSON.stringify(me)
})

export default Store
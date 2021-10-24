import { configureStore } from '@reduxjs/toolkit'
import AppDataSlice from './AppDataSlice'
import MyDataSlice from './MyDataSlice'
import MyModelSlice from './MyModelSlice'

const Store = configureStore({
    reducer: {
        appData: AppDataSlice.reducer,
        lrModel: MyModelSlice.reducer,
        results: MyDataSlice.reducer,
    },
})

Store.subscribe(() => {
    const { appData, lrModel, results } = Store.getState()
    localStorage.appData = JSON.stringify(appData)
    localStorage.lrModel = JSON.stringify(lrModel)
    localStorage.results = JSON.stringify(results)
})

export default Store
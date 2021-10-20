import * as yup from 'yup'
import appData from './appData'
import myModel from './myModel'
import results from './results'

export default yup
    .object()
    .shape({
        appData: appData,
        lrModel: myModel,
        results: results,
    })
    .strict(true)
import * as yup from 'yup'
import appData from './appData'
import myModel from './myModel'
import results from './results'

/**
 * Schema for RESSTAT JSON Data File - powered by yup
 */
const dataFileSchema = yup
    .object()
    .shape({
        appData: appData,
        lrModel: myModel,
        results: results,
    })
    .strict(true)

export default dataFileSchema
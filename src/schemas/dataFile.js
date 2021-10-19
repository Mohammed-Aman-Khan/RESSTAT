import * as yup from 'yup'
import myModel from './myModel'
import results from './results'

export default yup
    .object()
    .shape({
        lrModel: myModel,
        results: results,
    })
    .strict(true)
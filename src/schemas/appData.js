import * as yup from 'yup'

/**
 * Schema for RESSTAT Application Data - powered by yup
 */
const appDataSchema = yup
    .object()
    .shape({
        hasChanges: yup
            .boolean()
            .default(false),
        loggedIn: yup
            .boolean()
            .default(false),
    })
    .defined()
    .strict(true)

export default appDataSchema
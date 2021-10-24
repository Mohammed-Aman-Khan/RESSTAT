import * as yup from 'yup'

export default yup
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
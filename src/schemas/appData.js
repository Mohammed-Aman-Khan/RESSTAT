import * as yup from 'yup'

export default yup
    .object()
    .shape({
        backdrop: yup
            .boolean()
            .default(false),
        backdropText: yup
            .string()
            .nullable()
            .default(''),
        hasChanges: yup
            .boolean()
            .default(false),
    })
    .required()
    .strict(true)
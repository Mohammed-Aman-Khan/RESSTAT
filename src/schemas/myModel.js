import * as yup from 'yup'

export default yup
    .array()
    .of(
        yup
            .object()
            .shape({
                intercept: yup
                    .number()
                    .required(),
                coEfficient: yup
                    .number()
                    .required(),
            })
            .required()
    )
    .required()
    .default([])
    .strict(true)
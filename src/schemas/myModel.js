import * as yup from 'yup'

export default yup
    .array()
    .of(
        yup
            .object()
            .shape({
                intercept: yup
                    .number()
                    .defined(),
                coEfficient: yup
                    .number()
                    .defined(),
                accuracy: yup
                    .number()
                    .defined(),
            })
            .defined()
    )
    .defined()
    .default([])
    .strict(true)
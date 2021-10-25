import * as yup from 'yup'

/**
 * Schema for RESSTAT Linear Regression Model - powered by yup
 */
const myModelSchema = yup
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

export default myModelSchema
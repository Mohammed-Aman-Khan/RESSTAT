import * as yup from 'yup'

/**
 * Schema for RESSTAT Result Data - powered by yup
 */
const resultSchema = yup
    .array()
    .of(
        yup
            .object()
            .shape({
                semester: yup
                    .number()
                    .defined(),
                semResult: yup
                    .array()
                    .of(
                        yup
                            .object()
                            .shape({
                                subjectCode: yup
                                    .string(),
                                credits: yup
                                    .number(),
                                subjectName: yup
                                    .string(),
                                scoredMarks: yup
                                    .number()
                                    .min(0),
                                maxMarks: yup
                                    .number()
                                    .default(100),
                            })
                    )
                    .defined()
                    .default([]),
            })
    )
    .defined()
    .default([])
    .strict(true)

export default resultSchema
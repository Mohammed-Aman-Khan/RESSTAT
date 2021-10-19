import * as yup from 'yup'

export default yup
    .array()
    .of(
        yup
            .object()
            .shape({
                semester: yup
                    .number()
                    .required(),
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
                    .required()
                    .default([]),
            })
    )
    .required()
    .default([])
    .strict(true)
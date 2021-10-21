import { useCallback } from 'react'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { INIT_MY_MODEL } from '../store/MyModelSlice'
import { SET_LOADING, SET_BACKDROP_TEXT, SET_HAS_CHANGES } from '../store/AppDataSlice'
import map from 'lodash/map'
import uniq from 'lodash/uniq'
import sortBy from 'lodash/sortBy'
import filter from 'lodash/filter'
import flattenDeep from 'lodash/flattenDeep'

const useMyModel = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const lrModel = useSelector(state => state.lrModel)
    const results = useSelector(state => state.me.results)

    const calculate = useCallback((
        intercept = 0, // Intercept
        coEfficient = 0, // Co-Efficient (Slope)
        inputFeature,
    ) => Number(intercept + (coEfficient * inputFeature)), [])

    const meanSquaredError = useCallback(() => { }, [])

    const train = useCallback((
        inputFeatureDataSet = [], // Array of Input Features (i.e. Subject Credits)
        outputFeatureDataSet = [], // Array of Input Features (i.e. Scored Marks)
        intercept = 0, // Intercept
        coEfficient = 0, // Co-Efficient (Slope)
        learningRate = 0.0001, // Learning Rate
        iterations = 10000 // Number of Iterations
    ) => {
        let error = [] // Array to calculate cost for each iteration
        let errorCost,
            costIntercept,
            costCoEfficient,
            prediction,
            partialWrtIntercept,
            partialWrtCoEfficient

        for (let itr = 0; itr < iterations; itr++) {
            errorCost = 0
            costIntercept = 0
            costCoEfficient = 0

            for (let i = 0; i < inputFeatureDataSet.length; i++) {
                prediction = calculate(intercept, coEfficient, inputFeatureDataSet[ i ])
                errorCost = errorCost + Math.pow(outputFeatureDataSet[ i ] - prediction, 2)

                for (let j = 0; j < inputFeatureDataSet.length; j++) {
                    partialWrtIntercept = -2 * (outputFeatureDataSet[ j ] - calculate(intercept, coEfficient, inputFeatureDataSet[ j ])) // Partial Derivative w.r.t. intercept
                    partialWrtCoEfficient = (-2 * inputFeatureDataSet[ j ]) * (outputFeatureDataSet[ j ] - calculate(intercept, coEfficient, inputFeatureDataSet[ j ])) // Partial Derivative w.r.t. coEfficient

                    costIntercept += partialWrtIntercept
                    costCoEfficient += partialWrtCoEfficient
                }

                intercept = intercept - (learningRate * costIntercept)
                coEfficient = coEfficient - (learningRate * costCoEfficient)
            }
            error.push(errorCost)
        }

        return {
            intercept,
            coEfficient,
        }
    }, [ calculate ])

    const test = useCallback(() => { }, [])

    const build = useCallback(() => {
        dispatch(SET_LOADING(true))

        dispatch(SET_BACKDROP_TEXT('Fetching Results'))
        const flatResults = flattenDeep(
            map(
                results,
                ({ semResult }) =>
                    map(
                        semResult,
                        ({ credits, scoredMarks, maxMarks }) => ({
                            credits,
                            scoredMarks: Math.round((scoredMarks / maxMarks) * 100)
                        })
                    )
            )
        )

        dispatch(SET_BACKDROP_TEXT('Analyzing Scored Marks'))
        const allCredits = sortBy(
            uniq(
                map(
                    flatResults,
                    ({ credits }) => Number(credits)
                )
            )
        )

        dispatch(SET_BACKDROP_TEXT('Building Model'))
        const model = []
        let dataSet, credits, scoredMarks
        for (let i = 0; i < allCredits.length; i++) {
            dataSet = filter(flatResults, { credits: allCredits[ i ] })
            credits = map(dataSet, ({ credits }) => credits)
            scoredMarks = map(dataSet, ({ scoredMarks }) => scoredMarks)
            model.push({
                credits: allCredits[ i ],
                ...train(credits, scoredMarks)
            })
        }
        dispatch(INIT_MY_MODEL(model))

        dispatch(SET_BACKDROP_TEXT('Testing Model'))

        // history.push('/report')
        dispatch(SET_LOADING(false))
        dispatch(SET_HAS_CHANGES(false))
    }, [ dispatch, results, train ])

    const predict = useCallback(credits => { }, [])

    return {
        build,
        predict,
    }
}

export default useMyModel
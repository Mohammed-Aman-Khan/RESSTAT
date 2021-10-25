import { useCallback } from 'react'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { INIT_MY_MODEL } from '../store/MyModelSlice'
import { SET_HAS_CHANGES } from '../store/AppDataSlice'
import map from 'lodash/map'
import find from 'lodash/find'
import uniq from 'lodash/uniq'
import sortBy from 'lodash/sortBy'
import filter from 'lodash/filter'
import shuffle from 'lodash/shuffle'
import flattenDeep from 'lodash/flattenDeep'
import { roundToTwo } from '../util/helper'

/**
 * This hook enables the usage of a customised Linear Regression algorithm for the prediction of student grades based on the subject credits, in a declarative manner
 * @returns 2 functions build() and predict() for building the model and making predictions using the built model respectively
 */
const useRegression = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const lrModel = useSelector(state => state.lrModel)
    const results = useSelector(state => state.results)

    const calculate = useCallback((
        intercept = 0, // Intercept
        coEfficient = 0, // Co-Efficient (Slope)
        inputFeature,
    ) => Number(intercept + (coEfficient * inputFeature)), [])

    const train = useCallback((
        inputFeatureDataSet = [], // Array of Input Features (i.e. Subject Credits)
        outputFeatureDataSet = [], // Array of Input Features (i.e. Scored Marks)
        intercept = 0, // Intercept
        coEfficient = 0, // Co-Efficient (Slope)
        learningRate = 0.0001, // Learning Rate
        iterations = 10000 // Number of Iterations
    ) => {
        // let error = [] // Array to calculate cost for each iteration
        // let errorCost,
        let costIntercept,
            costCoEfficient,
            // prediction,
            partialWrtIntercept,
            partialWrtCoEfficient

        for (let itr = 0; itr < iterations; itr++) {
            // errorCost = 0
            costIntercept = 0
            costCoEfficient = 0

            for (let i = 0; i < inputFeatureDataSet.length; i++) {
                // prediction = calculate(intercept, coEfficient, inputFeatureDataSet[ i ])
                // errorCost = errorCost + Math.pow(outputFeatureDataSet[ i ] - prediction, 2)

                for (let j = 0; j < inputFeatureDataSet.length; j++) {
                    partialWrtIntercept = -2 * (outputFeatureDataSet[ j ] - calculate(intercept, coEfficient, inputFeatureDataSet[ j ])) // Partial Derivative w.r.t. intercept
                    partialWrtCoEfficient = (-2 * inputFeatureDataSet[ j ]) * (outputFeatureDataSet[ j ] - calculate(intercept, coEfficient, inputFeatureDataSet[ j ])) // Partial Derivative w.r.t. coEfficient

                    costIntercept += partialWrtIntercept
                    costCoEfficient += partialWrtCoEfficient
                }

                intercept = intercept - (learningRate * costIntercept)
                coEfficient = coEfficient - (learningRate * costCoEfficient)
            }
            // error.push(errorCost)
        }

        return {
            intercept,
            coEfficient,
        }
    }, [ calculate ])

    const test = useCallback((testingDataSet, inputFeature, intercept, coEfficient) => {
        let dataSet = shuffle([ ...testingDataSet ])
        let errors = map(
            dataSet,
            marks => Math.abs(marks - calculate(intercept, coEfficient, inputFeature))
        )
        let mae = errors.reduce((prev, next) => prev + next, 0) / errors.length
        return roundToTwo(100 - mae)
    }, [ calculate ])

    const build = useCallback(() => {
        const flatResults = flattenDeep(
            map(
                results,
                ({ semResult }) =>
                    map(
                        semResult,
                        ({ credits, scoredMarks, maxMarks }) => ({
                            credits,
                            scoredMarks: (scoredMarks / maxMarks) * 100
                        })
                    )
            )
        )

        const allCredits = sortBy(
            uniq(
                map(
                    flatResults,
                    ({ credits }) => Number(credits)
                )
            )
        )

        const model = []
        let dataSet, credits, scoredMarks, dataPoint
        for (let i = 0; i < allCredits.length; i++) {
            dataSet = filter(flatResults, { credits: allCredits[ i ] })
            credits = map(dataSet, ({ credits }) => credits)
            scoredMarks = map(dataSet, ({ scoredMarks }) => scoredMarks)
            dataPoint = train(credits, scoredMarks)
            dataPoint = {
                ...dataPoint,
                credits: allCredits[ i ],
                accuracy: test(scoredMarks, allCredits[ i ], dataPoint.intercept, dataPoint.coEfficient),
            }
            model.push(dataPoint)
        }
        dispatch(INIT_MY_MODEL(model))

        history.push('/report')
        dispatch(SET_HAS_CHANGES(false))
    }, [ dispatch, results, train, test, history ])

    const predict = useCallback(credits => {
        const { intercept, coEfficient } = find(lrModel, { credits })
        return roundToTwo(calculate(intercept, coEfficient, credits))
    }, [ lrModel, calculate ])

    return {
        build,
        predict,
    }
}

export default useRegression
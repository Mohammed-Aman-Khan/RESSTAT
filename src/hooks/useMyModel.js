import { useCallback } from 'react'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { INIT_MY_MODEL } from '../store/MyModelSlice'
import { SET_LOADING, SET_BACKDROP_TEXT, SET_HAS_CHANGES } from '../store/AppDataSlice'
import map from 'lodash/map'
import find from 'lodash/find'
import uniq from 'lodash/uniq'
import sortBy from 'lodash/sortBy'
import filter from 'lodash/filter'
import random from 'lodash/random'
import flattenDeep from 'lodash/flattenDeep'
import { roundToTwo } from '../util/helper'

const useMyModel = () => {
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

    const test = useCallback((inputFeatureDataSetSize, inputFeature, intercept, coEfficient) => {
        let testingDataSet = Array.from({ length: inputFeatureDataSetSize }, () => random(100))
        let errorsSquared = map(
            testingDataSet,
            marks => Math.pow(Math.abs(marks - calculate(intercept, coEfficient, inputFeature)), 2)
        )
        let mse = errorsSquared.reduce((prev, next) => prev + next, 0) / errorsSquared.length
        return roundToTwo(100 - mse)
    }, [ calculate ])

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
                            scoredMarks: (scoredMarks / maxMarks) * 100
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

        dispatch(SET_BACKDROP_TEXT('Building and Testing Model'))
        const model = []
        let dataSet, credits, scoredMarks, dataPoint
        for (let i = 0; i < allCredits.length; i++) {
            dataSet = filter(flatResults, { credits: allCredits[ i ] })
            credits = map(dataSet, ({ credits }) => credits)
            scoredMarks = map(dataSet, ({ scoredMarks }) => scoredMarks)
            dataPoint = {
                credits: allCredits[ i ],
                ...train(credits, scoredMarks),
                accuracy: 0,
            }
            dataPoint.accuracy = test(dataSet.length, dataPoint.credits, dataPoint.intercept, dataPoint.coEfficient)
            model.push(dataPoint)
        }
        dispatch(INIT_MY_MODEL(model))

        // history.push('/report')
        dispatch(SET_LOADING(false))
        dispatch(SET_HAS_CHANGES(false))
    }, [ dispatch, results, train, test ])

    const predict = useCallback(credits => {
        const { intercept, coEfficient } = find(lrModel, { credits })
        return roundToTwo(calculate(intercept, coEfficient, credits))
    }, [ lrModel, calculate ])

    return {
        build,
        predict,
    }
}

export default useMyModel
import { useCallback } from 'react'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { SET_LOADING, SET_BACKDROP_TEXT } from '../store/AppDataSlice'
import map from 'lodash/map'
import uniq from 'lodash/uniq'
import sortBy from 'lodash/sortBy'
import filter from 'lodash/filter'
import flattenDeep from 'lodash/flattenDeep'
import { buildModel } from '../util/lrModel'

const useMyModel = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const lrModel = useSelector(state => state.lrModel)
    const results = useSelector(state => state.me.results)

    const trainAndBuild = useCallback(() => {

        dispatch(SET_LOADING(true))

        dispatch(SET_BACKDROP_TEXT('Fetching Results'))

        const flatResults = flattenDeep(
            map(
                results,
                ({ semResults }) =>
                    map(
                        semResults,
                        ({ credits, scoredMarks, maxMarks }) => ({
                            credits,
                            scoredMarks: (scoredMarks / maxMarks) * 100
                        })
                    )
            )
        )
        console.log(flatResults)

        dispatch(SET_BACKDROP_TEXT('Analyzing Scored Marks'))

        const allCredits = sortBy(
            uniq(
                map(
                    flatResults,
                    ({ credits }) => Number(credits)
                )
            )
        )
        console.log(allCredits)

        dispatch(SET_BACKDROP_TEXT('Building Model'))

        const model = []
        for (let i = 0; i < allCredits.length; i++)
            model.push({
                credits: allCredits[ i ],
                rows: filter(flatResults, { credits: allCredits[ i ] }),
            })
        console.log(model)

        dispatch(SET_BACKDROP_TEXT('Testing Model'))

        // history.push('/report')
        dispatch(SET_LOADING(false))

    }, [ dispatch, history, results ])

    const predict = useCallback(() => {

    }, [ lrModel ])

    return {
        trainAndBuild,
        predict,
    }
}

export default useMyModel
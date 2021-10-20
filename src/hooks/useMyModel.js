import { useCallback } from 'react'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { SET_LOADING } from '../store/AppDataSlice'
import map from 'lodash/map'
import uniq from 'lodash/uniq'
import sortBy from 'lodash/sortBy'
import flattenDeep from 'lodash/flattenDeep'
import { buildModel } from '../util/lrModel'

const useMyModel = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const lrModel = useSelector(state => state.lrModel)
    const results = useSelector(state => state.me.results)

    const trainAndBuild = useCallback(() => {

        dispatch(SET_LOADING(true))

        const flatResults = flattenDeep(
            map(
                results,
                i => i.semResults
            )
        )
        const allCredits = sortBy(
            uniq(
                map(
                    flatResults,
                    i => Number(i.credits)
                )
            )
        )

        history.push('/report')
        dispatch(SET_LOADING(true))

    }, [ dispatch, history, results ])

    const predict = useCallback(() => {

    }, [ lrModel ])

    return {
        trainAndBuild,
        predict,
    }
}

export default useMyModel
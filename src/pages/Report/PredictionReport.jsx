import map from 'lodash/map'
import useRegression from '../../hooks/useRegression'
import { useSelector } from 'react-redux'
import styled from '@mui/material/styles/styled'
import Typography from '@mui/material/Typography'
import { ResponsiveContainer, ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, Bar, } from 'recharts'

const MyDiv = styled('div')({
    maxHeight: '100%',
    minHeight: 200,
    minWidth: 200,
    borderRadius: 10,
    padding: 10,
    width: '100%',
    aspectRatio: '1/1',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid rgba(255, 255, 255, 0.5)',
})
const MyPaper = styled('div')({
    padding: 10,
    backgroundColor: 'white',
    maxHeight: '100%',
    minHeight: 200,
    minWidth: 200,
    borderRadius: 10,
    flexGrow: 1,
})

const PredictionReport = () => {
    const lrModel = useSelector(state => state.lrModel) ?? []
    const { predict } = useRegression()

    return <MyDiv>
        <Typography>
            Predicted Scores (Credit based)
        </Typography>
        <br />
        <MyPaper>
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={ map(lrModel, i => ({ 'Predicted Score': predict(i.credits), name: `Credit ${ i.credits } Subject`, 'Prediction Accuracy %': i.accuracy })) }>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <Bar dataKey="Predicted Score" barSize={ 20 } fill="#EC407A" />
                    <Line type="monotone" dataKey="Prediction Accuracy %" stroke="#81C784" strokeWidth={ 5 } />
                    <YAxis />
                    <Tooltip />
                </ComposedChart>
            </ResponsiveContainer>
        </MyPaper>
    </MyDiv>
}

export default PredictionReport
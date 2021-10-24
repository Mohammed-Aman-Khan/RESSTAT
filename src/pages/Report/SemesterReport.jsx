import map from 'lodash/map'
import { useSelector } from 'react-redux'
import styled from '@mui/material/styles/styled'
import Typography from '@mui/material/Typography'
import { withOrdSuffix, calculateSGPA } from '../../util/helper'
import { ResponsiveContainer, BarChart, Tooltip, Bar, CartesianGrid, XAxis, YAxis } from 'recharts'

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

const SemesterReport = () => {
    const results = useSelector(state => state.results) ?? []

    return <MyDiv>
        <Typography>
            Semester SGPA
        </Typography>
        <br />
        <MyPaper>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ map(results, i => ({ Semester: withOrdSuffix(i.semester), SGPA: calculateSGPA(i.semResult) })) }>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="Semester" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="SGPA" fill="#ff7300" />
                </BarChart>
            </ResponsiveContainer>
        </MyPaper>
    </MyDiv>
}

export default SemesterReport
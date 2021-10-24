import map from 'lodash/map'
import uniq from 'lodash/uniq'
import find from 'lodash/find'
import sortBy from 'lodash/sortBy'
import { useSelector } from 'react-redux'
import styled from '@mui/material/styles/styled'
import Typography from '@mui/material/Typography'
import { roundToTwo } from '../../util/helper'
import { ResponsiveContainer, RadarChart, Radar, Legend, PolarGrid, PolarAngleAxis, Tooltip } from 'recharts'
import { useState } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

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

const SubjectReport = () => {
    const results = useSelector(state => state.results) ?? []
    const [ semester, setSemester ] = useState(1)

    return <MyDiv>
        <Typography>
            Subject Scores
        </Typography>
        <br />
        <FormControl>
            <InputLabel id="Semester">Semester</InputLabel>
            <Select
                label="Semester"
                labelId="Semester"
                value={ semester }
                onChange={ e => setSemester(e.target.value) }
            >
                {
                    map(
                        sortBy(
                            uniq(
                                map(
                                    results,
                                    i => i.semester
                                )
                            )
                        ),
                        i => <MenuItem value={ i } key={ i }>{ i }</MenuItem>
                    )
                }
            </Select>
        </FormControl>
        <br />
        <MyPaper>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={ map(find(results, i => i.semester === semester)?.semResult ?? [], i => ({ subject: i.subjectCode, marks: roundToTwo((i.scoredMarks / i.maxMarks) * 100) })) }>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <Radar name="Scored Marks" dataKey="marks" stroke="#8884d8" fill="#8884d8" fillOpacity={ 0.6 } />
                    <Legend />
                    <Tooltip />
                </RadarChart>
            </ResponsiveContainer>
        </MyPaper>
    </MyDiv>
}

export default SubjectReport
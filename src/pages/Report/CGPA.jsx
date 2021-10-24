import Alert from '@mui/material/Alert'
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'
import { calculateCGPA } from '../../util/helper'

const CGPA = () => {
    const results = useSelector(state => state.results) ?? []

    return <Alert
        icon={ false }
        variant="standard"
        severity="success"
    >
        <Typography variant="h4">
            Current Calculated CGPA is <strong>{ calculateCGPA(results) }</strong>
        </Typography>
    </Alert>
}

export default CGPA
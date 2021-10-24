import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import withStyles from '@mui/styles/withStyles'
import { useSnackbar } from 'notistack'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import CGPA from './CGPA'
import PredictionReport from './PredictionReport'
import SemesterReport from './SemesterReport'
import SubjectReport from './SubjectReport'

const Card = withStyles(theme => ({
    root: {
        padding: 20,
        [ theme.breakpoints.down('md') ]: {
            padding: 10,
        }
    },
}), { name: 'MyDataCard' })(Paper)

const Report = () => {
    const hasChanges = useSelector(state => state.appData.hasChanges)
    const history = useHistory()
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        if (hasChanges) {
            enqueueSnackbar('Please Save the data to generate the Report', { variant: 'warning', preventDuplicate: false, autoHideDuration: 5000 })
            history.replace('/myData')
        }
    }, [ history, hasChanges, enqueueSnackbar ])

    return <Card
        square
        elevation={ 0 }
    >
        <Grid
            container
            spacing={ 5 }
        >
            <Grid
                container item
                xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 } xl={ 12 }
            >
                <Typography variant="h5">Report</Typography>
            </Grid>
            <Grid
                item
                xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 } xl={ 12 }
            >
                <CGPA />
            </Grid>
            <Grid
                container item
                xs={ 12 } sm={ 12 } md={ 6 } lg={ 4 } xl={ 4 }
            >
                <SemesterReport />
            </Grid>
            <Grid
                container item
                xs={ 12 } sm={ 12 } md={ 6 } lg={ 4 } xl={ 4 }
            >
                <SubjectReport />
            </Grid>
            <Grid
                container item
                xs={ 12 } sm={ 12 } md={ 6 } lg={ 4 } xl={ 4 }
            >
                <PredictionReport />
            </Grid>
        </Grid>
    </Card>
}

export default Report
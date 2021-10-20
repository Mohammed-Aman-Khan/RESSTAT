import Paper from '@mui/material/Paper'
import withStyles from '@mui/styles/withStyles'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'
import ResultCard from './ResultCard'
import NewResultCard from './NewResultCard'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import TimelineIcon from '@mui/icons-material/Timeline'
import useMyModel from '../../hooks/useMyModel'

const Card = withStyles(theme => ({
    root: {
        borderRadius: 10,
        padding: 20,
        [ theme.breakpoints.down('md') ]: {
            padding: 10,
        }
    },
}), { name: 'MyDataCard' })(Paper)

const MyData = () => {
    const hasChanges = useSelector(state => state.appData.hasChanges)
    const results = useSelector(state => state.me.results) ?? []
    const { trainAndBuild } = useMyModel()

    return <Paper
        elevation={ 0 }
    >
        <Card elevation={ 0 }>
            <Grid
                container
                spacing={ 3 }
            >
                <Grid
                    container item
                    xs={ 12 } sm={ 6 } md={ 9 } lg={ 9 } xl={ 9 }
                >
                    <Typography variant="h5">Semester Results</Typography>
                </Grid>
                <Grid
                    container item
                    xs={ 12 } sm={ 6 } md={ 3 } lg={ 3 } xl={ 3 }
                >
                    <Button
                        fullWidth
                        size="large"
                        disableElevation
                        variant="contained"
                        onClick={ trainAndBuild }
                        endIcon={ <TimelineIcon /> }
                        disabled={ !hasChanges }
                    >
                        Analyze
                    </Button>
                </Grid>
            </Grid>
            <br />
            <Alert
                variant="outlined"
                severity="info"
            >
                In case of failed attempts, please update the data corresponding to the highest score achieved.
            </Alert>
            <br />
            <Grid
                container
                spacing={ 5 }
            >
                {
                    results
                        .sort((a, b) => a.semester - b.semester)
                        .map(({ semester, semResult }) =>
                            <Grid
                                key={ semester }
                                container item
                                xs={ 12 } sm={ 12 } md={ 6 } lg={ 6 } xl={ 4 }
                            >
                                <ResultCard { ...{ semester, semResult } } />
                            </Grid>
                        )
                }
                <Grid
                    container item
                    xs={ 12 } sm={ 12 } md={ 6 } lg={ 6 } xl={ 4 }
                >
                    <NewResultCard />
                </Grid>
            </Grid>
        </Card>
    </Paper>
}

export default MyData
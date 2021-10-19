import Paper from '@mui/material/Paper'
import withStyles from '@mui/styles/withStyles'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'
import ResultCard from './ResultCard'
import NewResultCard from './NewResultCard'
import Alert from '@mui/material/Alert'

const MyPaper = withStyles(theme => ({
    root: {
        padding: 20,
        [ theme.breakpoints.down('md') ]: {
            padding: 10,
        },
    },
}), { name: 'MyPaper' })(Paper)
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
    const results = useSelector(state => state.me.results) ?? []

    return <MyPaper
        elevation={ 0 }
    >
        <Card elevation={ 0 }>
            <Typography variant="h5">Semester Results</Typography>
            <br />
            <Alert
                variant="outlined"
                severity="info"
            >
                In case of Failed attempts, please update the data corresponding to the highest score achieved.
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
    </MyPaper>
}

export default MyData
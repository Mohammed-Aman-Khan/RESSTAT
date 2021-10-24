import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import withStyles from '@mui/styles/withStyles'

const Card = withStyles(theme => ({
    root: {
        padding: 20,
        [ theme.breakpoints.down('md') ]: {
            padding: 10,
        }
    },
}), { name: 'MyDataCard' })(Paper)

const Report = () => {
    return <Card
        square
        elevation={ 0 }
    >
        <Grid
            container
            spacing={ 3 }
        >
            <Grid
                container item
                xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 } xl={ 12 }
            >
                <Typography variant="h5">Report</Typography>
            </Grid>
            <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 } xl={ 12 } />
            <Grid
                container item
                xs={ 12 } sm={ 6 } md={ 6 } lg={ 6 } xl={ 4 }
            >
            </Grid>
        </Grid>
    </Card>
}

export default Report
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import withStyles from '@mui/styles/withStyles'

const MyPaper = withStyles({ root: { padding: 20 }, }, { name: 'MyPaper' })(Paper)
const Card = withStyles(theme => ({
    root: {
        height: '100%',
        width: '100%',
        borderRadius: 10,
        padding: 20,
        border: '1px solid rgba(255, 255, 255, 0.35)',
    },
}), { name: 'MyDataCard' })(Paper)

const MyData = () => {
    return <MyPaper
        elevation={ 0 }
    >
        <Grid
            container
            spacing={ { xs: 2, sm: 3, md: 4, lg: 5, xl: 5, } }
        >
            <Grid
                container item
                xs={ 12 } sm={ 12 } md={ 6 } lg={ 6 } xl={ 6 }
            >
                <Card elevation={ 0 }>
                    <Typography variant="h5">SGPA</Typography>
                    <br />
                </Card>
            </Grid>
            <Grid
                container item
                xs={ 12 } sm={ 12 } md={ 6 } lg={ 6 } xl={ 6 }
            >
                <Card elevation={ 0 }>
                    <Typography variant="h5">CGPA</Typography>
                    <br />
                </Card>
            </Grid>
            <Grid item xs={ 12 } sm={ 12 } md={ 4 } lg={ 4 } xl={ 4 } />
            <Grid
                container item
                xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 } xl={ 12 }
            >
                <Card elevation={ 0 }>
                    <Typography variant="h5">Semester Results</Typography>
                    <br />
                </Card>
            </Grid>
        </Grid>
    </MyPaper>
}

export default MyData
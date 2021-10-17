import Grid from '@mui/material/Grid'
import withStyles from '@mui/styles/withStyles'
import makeStyles from '@mui/styles/makeStyles'
import Text from './Text'

const MyGrid = withStyles({
    root: {
        height: '100vh',
        width: '100vw',
    }
}, { name: 'MyGrid' })(Grid)

const useStyles = makeStyles({
    item: {
        height: '100%',
    },
}, { name: 'LandingPage' })

const LandingPage = () => {
    const clsx = useStyles()

    return <MyGrid
        container
    >
        <Grid
            item container
            className={ clsx.item }
            xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 } xl={ 12 }
        >
            <Text />
        </Grid>
    </MyGrid>
}

export default LandingPage
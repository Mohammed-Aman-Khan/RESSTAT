import Grid from '@mui/material/Grid'
import withStyles from '@mui/styles/withStyles'
import makeStyles from '@mui/styles/makeStyles'
import Text from './Text'
import Particles from 'react-particles-js'

const MyGrid = withStyles({
    root: {
        height: '100vh',
        width: '100vw',
        position: 'absolute',
        top: 0, left: 0,
    }
}, { name: 'MyGrid' })(Grid)

const useStyles = makeStyles({
    item: {
        height: '100%',
    },
}, { name: 'LandingPage' })

const LandingPage = () => {
    const clsx = useStyles()

    return <>
        <Particles
            params={ {
                particles: {
                    number: {
                        value: 100,
                    },
                    size: {
                        value: 3
                    }
                },
                interactivity: {
                    events: {
                        onhover: {
                            enable: true,
                            mode: "repulse"
                        }
                    }
                }
            } }
        />
        <MyGrid
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
    </>
}

export default LandingPage
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import makeStyles from '@mui/styles/makeStyles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { FcGoogle } from 'react-icons/fc'
import refreshTokenSetup from '../../util/refreshToken'
import { useDispatch } from 'react-redux'
import { LOGIN } from '../../store/UserSlice'
import { useLogin } from '../../util/googleAuth'

const useStyles = makeStyles({
    container: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}, { name: 'LandingPageText' })

const Text = () => {
    const clsx = useStyles()
    const small = !useMediaQuery(theme => theme.breakpoints.up('sm'))
    const dispatch = useDispatch()
    const signIn = useLogin(
        res => {
            dispatch(LOGIN(res.profileObj))
            refreshTokenSetup(res)
        },
        res => {
            console.log('Login failed: res:', res)
        }
    )

    return <div
        className={ clsx.container }
    >
        <Box>
            <center>
                <Typography
                    variant={ small ? 'h2' : 'h1' }
                    sx={ { fontFamily: 'Monoton' } }
                >
                    RESSTAT
                </Typography>
                <br /><br /><br /><br /><br />
                <Typography
                    variant={ small ? 'h6' : 'h4' }
                >
                    Description coming soon
                </Typography>
                <br /><br /><br /><br /><br />
                <Button
                    size="large"
                    variant="outlined"
                    endIcon={ <FcGoogle size={ 30 } /> }
                    onClick={ signIn }
                >
                    Login with
                </Button>
            </center>
        </Box>
    </div>
}

export default Text
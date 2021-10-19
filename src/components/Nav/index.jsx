import { useState, useCallback } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useHistory } from 'react-router-dom'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import PersonIcon from '@mui/icons-material/Person'
import CloseIcon from '@mui/icons-material/Close'
import BarChartIcon from '@mui/icons-material/BarChart'
import DownloadIcon from '@mui/icons-material/Download'
import ReplayIcon from '@mui/icons-material/Replay'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import { downloadConfigurationAsJSON } from '../../util/download'
import { useDispatch } from 'react-redux'
import { CLEAR_MY_MODEL } from '../../store/MyModelSlice'
import { CLEAR_ME } from '../../store/MyDataSlice'

const NavBar = ({ small = false }) => {
    const history = useHistory()
    const [ state, setState ] = useState(false)

    const toggleDrawer = useCallback(open => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift'))
            return
        setState(open)
    }, [ setState ])

    return <>
        <IconButton
            size={ small ? 'small' : 'medium' }
            onClick={ toggleDrawer(true) }
        >
            <MenuIcon />
        </IconButton>
        <Drawer
            anchor={ 'left' }
            open={ state }
            onClose={ toggleDrawer(false) }
        >
            <Box
                sx={ { width: 250 } }
                role="presentation"
                onClick={ toggleDrawer(false) }
                onKeyDown={ toggleDrawer(false) }
            >
                <List>
                    <ListItem>
                        <ListItemText
                            primary={
                                <IconButton>
                                    <CloseIcon />
                                </IconButton>
                            }
                        />
                    </ListItem>
                    <Divider />
                    {
                        [
                            {
                                text: 'My Data',
                                path: '/myData',
                                icon: <PersonIcon />,
                            },
                            {
                                text: 'Report',
                                path: '/report',
                                icon: <BarChartIcon />,
                            }
                        ]
                            .map(({ text, path, icon }) =>
                                <ListItem
                                    button
                                    key={ text }
                                    onClick={ () => history.push(path) }
                                >
                                    <ListItemIcon>
                                        { icon }
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={ text }
                                    />
                                </ListItem>
                            )
                    }
                </List>
            </Box>
        </Drawer>
    </>
}

const Nav = () => {
    const small = !useMediaQuery(theme => theme.breakpoints.up('sm'))
    const dispatch = useDispatch()

    const reset = useCallback(() => {
        dispatch(CLEAR_MY_MODEL())
        dispatch(CLEAR_ME())
    }, [ dispatch ])

    return <>
        <Box sx={ { flexGrow: 1 } }>
            <AppBar position="static">
                <Toolbar>
                    <NavBar { ...{ small } } />
                    <Typography
                        variant={ small ? 'h4' : 'h3' }
                        sx={ { flexGrow: 1, fontFamily: 'Monoton', margin: small ? '10px' : '20px' } }
                    >
                        RESSTAT
                    </Typography>
                    <Tooltip
                        title={ <Typography>Download Data</Typography> }
                    >
                        <IconButton
                            size={ small ? 'small' : 'large' }
                            onClick={ downloadConfigurationAsJSON }
                        >
                            <DownloadIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip
                        title={ <Typography>Clear Data</Typography> }
                    >
                        <IconButton
                            size={ small ? 'small' : 'large' }
                            onClick={ reset }
                        >
                            <ReplayIcon />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
        </Box>
    </>
}

export default Nav
import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
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
import Divider from '@mui/material/Divider'

const NavBar = ({ small = false }) => {
    const [ state, setState ] = useState(false)
    const history = useHistory()

    const toggleDrawer = open => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift'))
            return
        setState(open)
    }

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

    return <>
        <Box sx={ { flexGrow: 1 } }>
            <AppBar position="static" variant="outlined">
                <Toolbar>
                    <NavBar { ...{ small } } />
                    <Typography
                        variant={ small ? 'h4' : 'h3' }
                        sx={ { flexGrow: 1, fontFamily: 'Monoton', margin: small ? '10px' : '20px' } }
                    >
                        RESSTAT
                    </Typography>
                    <Button
                        size={ small ? 'small' : 'medium' }
                        variant="outlined"
                        onClick={ () => { } }
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    </>
}

export default Nav
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import withStyles from '@mui/styles/withStyles'
import { vh, vw } from './util/responsive'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Configuration from './pages/Configuration'
import { useSelector } from 'react-redux'

const Background = withStyles({
    root: {
        height: vh(100),
        width: vw(100),
    },
}, { name: 'Background' })(Paper)

const App = () => {
    const isLoggedIn = useSelector(store => store.user.loggedIn)

    return <Router>
        <Fade
            in
            timeout={ 500 }
        >
            <Background
                square
                elevation={ 0 }
            >
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={ () => isLoggedIn ? <Redirect to="/configuration" /> : <LandingPage /> }
                    />
                    <Route
                        exact
                        path="/configuration"
                        render={ () => isLoggedIn ? <Configuration /> : <Redirect to="/" /> }
                    />
                </Switch>
            </Background>
        </Fade>
    </Router>
}

export default App
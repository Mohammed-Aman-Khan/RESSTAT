import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import withStyles from '@mui/styles/withStyles'
import { vh, vw } from './util/responsive'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import MyData from './pages/MyData'
import Report from './pages/Report'
import { useSelector } from 'react-redux'
import Nav from './components/Nav'

const Background = withStyles({
    root: {
        height: vh(100),
        width: vw(100),
    },
}, { name: 'Background' })(Paper)

const AppWithNav = () => {
    return <>
        <Nav />
        <Route
            exact
            path="/myData"
            render={ () => <MyData /> }
        />
        <Route
            exact
            path="/report"
            render={ () => <Report /> }
        />
    </>
}

const App = () => {
    const isLoggedIn = useSelector(store => store.myData.loggedIn)

    return <Router>
        <Fade
            in
            timeout={ 1000 }
        >
            <Background
                square
                elevation={ 0 }
            >
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={ () => isLoggedIn ? <Redirect to="/myData" /> : <LandingPage /> }
                    />
                    <Route
                        exact
                        path="/:page"
                        render={ () => isLoggedIn ? <AppWithNav /> : <Redirect to="/" /> }
                    />
                    <Route
                        path="*"
                        render={ () => isLoggedIn ? <Redirect to="/myData" /> : <LandingPage /> }
                    />
                </Switch>
            </Background>
        </Fade>
    </Router>
}

export default App
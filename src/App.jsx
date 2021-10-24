/* eslint-disable react-hooks/exhaustive-deps */
import Paper from '@mui/material/Paper'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import MyData from './pages/MyData'
import Report from './pages/Report'
import Calculation from './pages/Calculation'
import { useSelector } from 'react-redux'
import Nav from './components/Nav'
import withStyles from '@mui/styles/withStyles'
import { vh } from './util/responsive'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

const MyPaper = withStyles({ root: { height: vh(100), }, })(Paper)

const AppWithNav = () => <>
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
    <Route
        exact
        path="/calculation"
        render={ () => <Calculation /> }
    />
</>

const App = () => {
    const { backdrop, backdropText, loggedIn } = useSelector(store => store.appData)

    return <Router>
        <MyPaper
            square
            elevation={ 0 }
        >
            <Switch>
                <Route
                    exact
                    path="/"
                    render={ () => loggedIn ? <Redirect to="/myData" /> : <LandingPage /> }
                />
                <Route
                    exact
                    path="/:page"
                    render={ () => loggedIn ? <AppWithNav /> : <Redirect to="/" /> }
                />
                <Route
                    path="*"
                    render={ () => loggedIn ? <Redirect to="/myData" /> : <LandingPage /> }
                />
            </Switch>
            <Backdrop
                sx={ { color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 } }
                open={ backdrop }
            >
                <CircularProgress
                    color="inherit"
                />
                {
                    backdropText && <>
                        <br />
                        <Typography
                            variant="button"
                        >
                            { backdropText }
                        </Typography>
                    </>
                }
            </Backdrop>
        </MyPaper>
    </Router>
}

export default App
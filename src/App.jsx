/* eslint-disable react-hooks/exhaustive-deps */
import Paper from '@mui/material/Paper'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import MyData from './pages/MyData'
import Report from './pages/Report'
// import Calculation from './pages/Calculation'
import { useSelector } from 'react-redux'
import Nav from './components/Nav'
import withStyles from '@mui/styles/withStyles'
import { vh } from './util/responsive'
import { useSnackbar } from 'notistack'

const MyPaper = withStyles({ root: { height: vh(100), }, })(Paper)

const AppWithNav = props => <>
    <Nav />
    <Route
        exact
        path="/myData"
        render={ () => props.loggedIn ? <MyData /> : <Redirect to="/" /> }
    />
    <Route
        exact
        path="/report"
        render={ () => props.loggedIn ? <Report /> : <Redirect to="/" /> }
    />
    {/* <Route
        exact
        path="/calculation"
        render={ () => <Calculation /> }
    /> */}
    <Route
        path="*"
        render={ () => props.loggedIn ? <Redirect to="/myData" /> : <Redirect to="/" /> }
    />
</>

const App = () => {
    const { loggedIn, hasChanges } = useSelector(store => store.appData)
    const { enqueueSnackbar } = useSnackbar()

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
                    render={ () => <AppWithNav loggedIn={ loggedIn } hasChanges={ hasChanges } snack={ enqueueSnackbar } /> }
                />
            </Switch>
        </MyPaper>
    </Router>
}

export default App
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

const MyPaper = withStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: vh(100),
    },
})(Paper)

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
    const isLoggedIn = useSelector(store => store.me.loggedIn)

    return <Router>
        <MyPaper
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

        </MyPaper>
    </Router>
}

export default App
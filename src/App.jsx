import Paper from '@mui/material/Paper'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import MyData from './pages/MyData'
import Report from './pages/Report'
import { useSelector } from 'react-redux'
import Nav from './components/Nav'

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
    const isLoggedIn = useSelector(store => store.me.loggedIn)

    return <Router>
        <Paper
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
        </Paper>
    </Router>
}

export default App
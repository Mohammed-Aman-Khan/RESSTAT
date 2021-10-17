import ReactDOM from 'react-dom'
import App from './App'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import theme from './util/theme'
import { Provider } from 'react-redux'
import Store from './store'
import { SnackbarProvider } from 'notistack'

ReactDOM.render(
    <Provider store={ Store }>
        <ThemeProvider theme={ theme }>
            <SnackbarProvider maxSnack={ 3 }>
                <App />
            </SnackbarProvider>
        </ThemeProvider>
    </Provider>,
    document.getElementById('resstat')
)

document.documentElement.style.setProperty('--vh', `${ window.innerHeight * 0.01 }px`)
document.documentElement.style.setProperty('--vw', `${ window.innerWidth * 0.01 }px`)

window.addEventListener('resize', () => {
    document.documentElement.style.setProperty('--vh', `${ window.innerHeight * 0.01 }px`)
    document.documentElement.style.setProperty('--vw', `${ window.innerWidth * 0.01 }px`)
})
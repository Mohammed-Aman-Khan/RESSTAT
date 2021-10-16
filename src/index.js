import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
    <App />,
    document.getElementById('resstat')
)

document.documentElement.style.setProperty('--vh', `${ window.innerHeight * 0.01 }px`)
document.documentElement.style.setProperty('--vw', `${ window.innerWidth * 0.01 }px`)

window.addEventListener('resize', () => {
    document.documentElement.style.setProperty('--vh', `${ window.innerHeight * 0.01 }px`)
    document.documentElement.style.setProperty('--vw', `${ window.innerWidth * 0.01 }px`)
})
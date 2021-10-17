import createTheme from '@mui/material/styles/createTheme'

const theme = createTheme(
    {
        palette: {
            primary: {
                main: '#FFFFFF',
            },
            mode: 'dark',
        },
        typography: {
            fontFamily: [ 'Comfortaa' ].join(', '),
        }
    }
)

export default theme
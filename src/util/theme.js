import createTheme from '@mui/material/styles/createTheme'

/**
 * RESSTAT Application Theme - powered by MUI
 */
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
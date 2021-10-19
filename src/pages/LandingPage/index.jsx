import { useCallback, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import withStyles from '@mui/styles/withStyles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import InfoIcon from '@mui/icons-material/Info'
import { useFilePicker } from 'use-file-picker'
import { useSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'
import dataFile from '../../schemas/dataFile'
import { INIT_ME } from '../../store/MyDataSlice'
import { INIT_MY_MODEL } from '../../store/MyModelSlice'

const MyGrid = withStyles({
    root: {
        height: '100%',
        width: '100%',
    }
}, { name: 'MyGrid' })(Grid)
const MyInnerGrid = withStyles({
    root: {
        height: '75%',
        minHeight: 300,
        width: '80%',
        maxWidth: 600,
    }
}, { name: 'MyInnerGrid' })(Grid)

const LandingPage = () => {
    const dispatch = useDispatch()
    const small = !useMediaQuery(theme => theme.breakpoints.up('sm'))
    const [ openFilePicker, { filesContent, loading } ] = useFilePicker({ accept: '.json', })
    const { enqueueSnackbar } = useSnackbar()
    const uploadDataFile = useCallback(jsonfileContent => {
        dataFile
            .validate(JSON.parse(jsonfileContent))
            .then(value => {
                dispatch(INIT_MY_MODEL(value.lrModel))
                dispatch(INIT_ME(value.results))
            })
            .catch(err => enqueueSnackbar('Invalid Data File', { variant: 'error', preventDuplicate: true, }))
    }, [ dispatch, enqueueSnackbar ])
    const startNew = useCallback(() => {
        dispatch(INIT_ME(dataFile.getDefaultFromShape().results))
    }, [ dispatch ])

    useEffect(() => {
        !loading && filesContent.length && uploadDataFile(filesContent[ 0 ].content)
    }, [ loading, filesContent, uploadDataFile ])

    return <MyGrid
        item container
        xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 } xl={ 12 }
        justifyContent="center"
        alignItems="center"
    >
        <MyInnerGrid
            item container
            justifyContent="space-evenly"
            alignItems="center"
            direction="column"
        >
            <Grid
                item
            >
                <Typography
                    variant={ small ? 'h2' : 'h1' }
                    sx={ { fontFamily: 'Monoton' } }
                >
                    RESSTAT
                </Typography>
            </Grid>
            <Grid
                item
            >
                <Typography
                    variant={ small ? 'h6' : 'h5' }
                    sx={ { textAlign: 'center' } }
                >
                    Dead Simple Result Analysis<br />For Engineering Students
                </Typography>
            </Grid>
            <Grid
                item container
                spacing={ 2 }
            >
                <Grid
                    item
                    xs={ 12 } sm={ 12 } md={ 6 } lg={ 6 } xl={ 6 }
                >
                    <Button
                        fullWidth
                        size={ small ? "medium" : "large" }
                        variant="outlined"
                        endIcon={ <UploadFileIcon /> }
                        onClick={ () => openFilePicker() }
                    >
                        Upload Data File
                    </Button>
                </Grid>
                <Grid
                    item
                    xs={ 12 } sm={ 12 } md={ 6 } lg={ 6 } xl={ 6 }
                >
                    <Button
                        fullWidth
                        disableElevation
                        variant="contained"
                        size={ small ? "medium" : "large" }
                        endIcon={ <KeyboardArrowRightIcon /> }
                        onClick={ startNew }
                    >
                        Start New
                    </Button>
                </Grid>
            </Grid>
        </MyInnerGrid>
    </MyGrid>
}

export default LandingPage
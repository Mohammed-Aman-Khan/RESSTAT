import { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import withStyles from '@mui/styles/withStyles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { useFilePicker } from 'use-file-picker'
import * as yup from 'yup'
import { useSnackbar } from 'notistack'

const MyGrid = withStyles({
    root: {
        height: '100vh',
        width: '100vw',
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

const myDataSchema = yup.object().shape({
    lrModel: yup.object().shape({
        intercept: yup.number().nullable().default(null),
        coEfficient: yup.number().nullable().default(null),
    }).required(),
    results: yup.array().of(yup.object().shape({
        semester: yup.number().required(),
        semResult: yup.array().of(yup.object().shape({
            subjectCode: yup.string(),
            credits: yup.number(),
            subjectName: yup.string(),
            scoredMarks: yup.number().min(0),
            maxMarks: yup.number().default(100),
        })).required().default([]),
    })).required().default([]),
}).strict(true)

const LandingPage = () => {
    const small = !useMediaQuery(theme => theme.breakpoints.up('sm'))
    const [ openFilePicker, { filesContent, loading } ] = useFilePicker({
        accept: '.json',
    })
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        if (!loading && filesContent.length) {
            myDataSchema
                .validate(JSON.parse(filesContent[ 0 ].content))
                .then(value => {

                })
                .catch(err => enqueueSnackbar('Invalid Data File', { variant: 'error', preventDuplicate: true, }))
        }
    }, [ loading, filesContent, enqueueSnackbar ])

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
            <Grid item>
                <Typography
                    variant={ small ? 'h2' : 'h1' }
                    sx={ { fontFamily: 'Monoton' } }
                >
                    RESSTAT
                </Typography>
            </Grid>
            <Grid item>
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
                        size={ small ? "medium" : "large" }
                        variant="contained"
                        endIcon={ <KeyboardArrowRightIcon /> }
                        disableElevation
                    >
                        Start New
                    </Button>
                </Grid>
            </Grid>
        </MyInnerGrid>
    </MyGrid>
}

export default LandingPage
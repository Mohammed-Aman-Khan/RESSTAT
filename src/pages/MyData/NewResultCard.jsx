import Button from '@mui/material/Button'
import styled from '@mui/material/styles/styled'
import { useCallback, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Tooltip from '@mui/material/Tooltip'
import { formatString, toCapital, Semesters, withOrdSuffix } from '../../util/helper'
import { Typography } from '@mui/material'
import isEqual from 'lodash/isEqual'
import { useDispatch } from 'react-redux'
import { ADD_SEM_RESULT } from '../../store/MyDataSlice'
import { useSnackbar } from 'notistack'

const NewResultPaper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
    width: '100%',
    aspectRatio: '1/1',
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transition: '0.3s',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        boxShadow: '0px 24px 48px -10px rgba(255, 255, 255, 0.2)',
    },
})

const initialNewSubject = {
    subjectCode: '',
    subjectName: '',
    credits: null,
    scoredMarks: null,
    maxMarks: 100,
}

const NewResultCard = () => {
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar()
    const [ openMainDialog, setOpenMainDialog ] = useState(false)
    const [ openNewDialog, setOpenNewDialog ] = useState(false)
    const [ semester, setSemester ] = useState(null)
    const [ newSubject, setNewSubject ] = useState({ ...initialNewSubject })
    const [ subjects, setSubjects ] = useState([])

    const openNewSubjectDialog = useCallback(() => {
        setOpenMainDialog(false)
        setOpenNewDialog(true)
    }, [ setOpenMainDialog, setOpenNewDialog ])
    const closeNewSubjectDialog = useCallback(() => {
        setOpenNewDialog(false)
        setOpenMainDialog(true)
    }, [ setOpenMainDialog, setOpenNewDialog ])
    const addSubject = useCallback(() => {
        let newSub = {
            subjectCode: formatString(newSubject.subjectCode),
            subjectName: toCapital(formatString(newSubject.subjectName)),
            credits: Number(newSubject.credits),
            scoredMarks: Number(newSubject.scoredMarks),
            maxMarks: Number(newSubject.maxMarks),
        }

        if (!newSub.subjectCode) {
            enqueueSnackbar('Subject Code Required', { variant: 'error', preventDuplicate: true })
            return
        }
        if (!newSub.subjectName) {
            enqueueSnackbar('Subject Name Required', { variant: 'error', preventDuplicate: true })
            return
        }
        if (!newSub.credits || isNaN(newSub.credits)) {
            enqueueSnackbar('Credits Required', { variant: 'error', preventDuplicate: true })
            return
        }
        if (!newSub.scoredMarks) {
            enqueueSnackbar('Scored Marks Required', { variant: 'error', preventDuplicate: true })
            return
        }
        if (!newSub.maxMarks) {
            enqueueSnackbar('Max Marks Required', { variant: 'error', preventDuplicate: true })
            return
        }

        setSubjects(prev => [ ...prev, newSub ])
        setOpenNewDialog(false)
        setOpenMainDialog(true)
        setNewSubject({ ...initialNewSubject })
    }, [ enqueueSnackbar, newSubject, setSubjects ])
    const removeSubject = useCallback(index => {
        setSubjects(prev => [ ...prev ].filter((elem, idx) => !isEqual(idx, index)))
    }, [ setSubjects ])
    const addResults = useCallback(() => {
        if (!semester) {
            enqueueSnackbar('Semester is Required', { variant: 'error', preventDuplicate: true })
            return
        }
        if (!subjects.length) {
            enqueueSnackbar('Subjects are Required', { variant: 'error', preventDuplicate: true })
            return
        }

        dispatch(ADD_SEM_RESULT({ semester, semResult: subjects, }))
        setOpenMainDialog(false)
        setSemester(null)
        setSubjects([])
    }, [ enqueueSnackbar, dispatch, semester, subjects, setOpenMainDialog ])

    return <>
        <Tooltip
            arrow
            placement="top"
            title={ <Typography>Add New Semester Results</Typography> }
        >
            <NewResultPaper
                onClick={ () => setOpenMainDialog(true) }
            >
                <AddIcon
                    fontSize="large"
                />
            </NewResultPaper>
        </Tooltip>
        <Dialog
            fullWidth
            maxWidth="md"
            open={ openMainDialog }
            onClose={ e => e.preventDefault() }
        >
            <DialogTitle>Add New Semester Results</DialogTitle>
            <DialogContent>
                <br />
                <FormControl fullWidth>
                    <InputLabel>Semester</InputLabel>
                    <Select
                        label="Semester"
                        value={ semester }
                        onChange={ e => setSemester(e.target.value) }
                    >
                        {
                            Semesters
                                .map(sem =>
                                    <MenuItem
                                        key={ sem }
                                        value={ sem }
                                    >
                                        { withOrdSuffix(sem) }
                                    </MenuItem>
                                )
                        }
                    </Select>
                </FormControl>
                <br /><br />
                <TableContainer component={ Paper }>
                    <Table sx={ { width: '100%' } }>
                        <caption>
                            <Button
                                variant="outlined"
                                onClick={ openNewSubjectDialog }
                            >
                                Add Subject
                            </Button>
                        </caption>
                        <TableHead>
                            <TableRow>
                                {
                                    [
                                        <>Subject Code</>,
                                        <>Subject Name</>,
                                        <>Credits</>,
                                        <>Scored Marks</>,
                                        <>Max Marks</>,
                                        <>&nbsp;</>
                                    ]
                                        .map((item, idx) =>
                                            <TableCell
                                                key={ idx }
                                                align="center"
                                                sx={ { minWidth: 100 } }
                                            >
                                                <Typography variant="caption">
                                                    { item }
                                                </Typography>
                                            </TableCell>
                                        )
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                subjects
                                    .map(({ subjectCode, subjectName, credits, scoredMarks, maxMarks }, index) =>
                                        <TableRow
                                            key={ subjectCode }
                                            sx={ { '&:last-child td, &:last-child th': { border: 0 } } }
                                        >
                                            {
                                                [ subjectCode, subjectName, credits, scoredMarks, maxMarks ]
                                                    .map((item, idx) =>
                                                        <TableCell
                                                            key={ idx }
                                                            align="center"
                                                            sx={ { minWidth: 100 } }
                                                        >
                                                            <Typography variant="caption">
                                                                { item }
                                                            </Typography>
                                                        </TableCell>
                                                    )
                                            }
                                            <TableCell
                                                align="center"
                                                onClick={ () => removeSubject(index) }
                                            >
                                                <HighlightOffIcon />
                                            </TableCell>
                                        </TableRow>
                                    )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    onClick={ () => setOpenMainDialog(false) }
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    disableElevation
                    onClick={ addResults }
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
        <Dialog
            fullWidth
            maxWidth="sm"
            open={ openNewDialog }
            onClose={ e => e.preventDefault() }
        >
            <DialogTitle>New Subject Details</DialogTitle>
            <DialogContent>
                <br />
                <TextField
                    fullWidth
                    name="subjectCode"
                    label="Subject Code"
                    value={ newSubject.subjectCode }
                    onChange={ e => setNewSubject(prev => ({ ...prev, [ e.target.name ]: e.target.value })) }
                />
                <br /><br />
                <TextField
                    fullWidth
                    name="subjectName"
                    label="Subject Name"
                    value={ newSubject.subjectName }
                    onChange={ e => setNewSubject(prev => ({ ...prev, [ e.target.name ]: e.target.value })) }
                />
                <br /><br />
                <TextField
                    fullWidth
                    type="number"
                    name="credits"
                    label="Credits"
                    value={ newSubject.credits }
                    onChange={ e => setNewSubject(prev => ({ ...prev, [ e.target.name ]: Number(e.target.value) })) }
                />
                <br /><br />
                <TextField
                    fullWidth
                    type="number"
                    name="scoredMarks"
                    label="Scored Marks"
                    value={ newSubject.scoredMarks }
                    onChange={ e => setNewSubject(prev => ({ ...prev, [ e.target.name ]: e.target.value })) }
                />
                <br /><br />
                <TextField
                    fullWidth
                    type="number"
                    name="maxMarks"
                    label="Max Marks"
                    value={ newSubject.maxMarks }
                    onChange={ e => setNewSubject(prev => ({ ...prev, [ e.target.name ]: e.target.value })) }
                />
                <br />
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    onClick={ closeNewSubjectDialog }
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    disableElevation
                    onClick={ addSubject }
                >
                    Add Subject
                </Button>
            </DialogActions>
        </Dialog>
    </>
}

export default NewResultCard
import styled from '@mui/material/styles/styled'
import { useState, useCallback } from 'react'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import { calculateSGPA, withOrdSuffix } from '../../util/helper'
import EditIcon from '@mui/icons-material/Edit'

const ResultPaper = styled('div')({
    minHeight: 200,
    minWidth: 200,
    borderRadius: 20,
    padding: 10,
    width: '100%',
    aspectRatio: '1/1',
    border: '1px solid rgba(255, 255, 255, 0.2)',
})

const ResultCard = ({ semester, semResult }) => {
    const [ openEditDialog, setOpenEditDialog ] = useState(false)
    const [ currentSubject, setCurrentSubject ] = useState(null)

    const editField = useCallback(e => {
        if (currentSubject)
            setCurrentSubject(prev => ({ ...prev, [ e.target.name ]: e.target.value }))
    }, [ currentSubject, setCurrentSubject ])
    const closeNewSubjectDialog = useCallback(() => {
        setOpenEditDialog(false)
        setCurrentSubject(null)
    }, [ setOpenEditDialog, setCurrentSubject ])
    const editSubjectData = useCallback(() => { }, [])

    return <>
        <ResultPaper>
            <Grid
                container
            >
                <Grid
                    container item
                    xs={ 12 } sm={ 6 } md={ 6 } lg={ 6 } xl={ 4 }
                >
                    <Typography variant="button">
                        { withOrdSuffix(semester) } Semester
                    </Typography>
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 2 } lg={ 2 } xl={ 2 } />
                <Grid
                    container item
                    xs={ 12 } sm={ 12 } md={ 4 } lg={ 4 } xl={ 4 }
                >
                    <IconButton>

                    </IconButton>
                </Grid>
            </Grid>
            <br />
            <TableContainer component={ Paper }>
                <Table sx={ { width: '100%' } }>
                    <caption>
                        <Typography variant="caption">
                            SGPA : { calculateSGPA(semResult) } / 10
                        </Typography>
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
                            semResult
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
                                            onClick={ () => { } }
                                        >
                                            <IconButton
                                                size="small"
                                            >
                                                <EditIcon
                                                    fontSize="small"
                                                />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </ResultPaper>
        <Dialog
            fullWidth
            maxWidth="sm"
            open={ openEditDialog }
            onClose={ e => e.preventDefault() }
        >
            <DialogTitle>Edit Subject Details</DialogTitle>
            <DialogContent>
                <br />
                <TextField
                    fullWidth
                    name="subjectCode"
                    label="Subject Code"
                    value={ currentSubject?.subjectCode ?? null }
                    onChange={ editField }
                />
                <br /><br />
                <TextField
                    fullWidth
                    name="subjectName"
                    label="Subject Name"
                    value={ currentSubject?.subjectName ?? null }
                    onChange={ editField }
                />
                <br /><br />
                <TextField
                    fullWidth
                    type="number"
                    name="credits"
                    label="Credits"
                    value={ currentSubject?.credits ?? null }
                    onChange={ editField }
                />
                <br /><br />
                <TextField
                    fullWidth
                    type="number"
                    name="scoredMarks"
                    label="Scored Marks"
                    value={ currentSubject?.scoredMarks ?? null }
                    onChange={ editField }
                />
                <br /><br />
                <TextField
                    fullWidth
                    type="number"
                    name="maxMarks"
                    label="Max Marks"
                    value={ currentSubject?.maxMarks ?? null }
                    onChange={ editField }
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
                    onClick={ editSubjectData }
                >
                    Add Subject
                </Button>
            </DialogActions>
        </Dialog>
    </>
}

export default ResultCard
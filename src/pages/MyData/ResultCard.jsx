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
import IconButton from '@mui/material/IconButton'
import { calculateSGPA, percentage, totalMarksScored, withOrdSuffix } from '../../util/helper'
import EditIcon from '@mui/icons-material/Edit'
import { DataGrid } from '@mui/x-data-grid'
import makeStyles from '@mui/styles/makeStyles'
import CustomToolbar from '../../components/DataGrid/CustomToolbar'
import CustomNoRowsOverlay from '../../components/DataGrid/CustomNoRowsOverlay'
import CustomPagination from '../../components/DataGrid/CustomPagination'

const ResultPaper = styled('div')({
    maxHeight: '100%',
    minHeight: 200,
    minWidth: 200,
    borderRadius: 10,
    padding: 15,
    width: '100%',
    aspectRatio: '1/1',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    display: 'flex',
    flexDirection: 'column',
})

const useStyles = makeStyles({
    datagrid: {
        flexGrow: 1,
        '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus': {
            outline: 'none',
        },
    },
})

const columns = [
    {
        minWidth: 100,
        headerAlign: 'center',
        align: 'center',
        field: 'subjectCode',
        headerName: 'Subject Code',
        flex: 0.5,
        cellClassName: 'whiteText',
        headerClassName: 'whiteText',
        sortable: false,
        filterable: false,
    },
    {
        minWidth: 200,
        headerAlign: 'center',
        align: 'center',
        field: 'subjectName',
        headerName: 'Subject Name',
        sortable: false,
        filterable: false,
        flex: 1,
        cellClassName: 'whiteText',
        headerClassName: 'whiteText',
    },
    {
        minWidth: 100,
        headerAlign: 'center',
        align: 'center',
        field: 'credits',
        headerName: 'Credits',
        type: 'number',
        flex: 0.5,
        cellClassName: 'whiteText',
        headerClassName: 'whiteText',
        sortable: false,
        filterable: false,
    },
    {
        minWidth: 200,
        headerAlign: 'center',
        align: 'center',
        field: 'scoredMarks',
        headerName: 'Marks',
        sortable: false,
        filterable: false,
        flex: 0.5,
        cellClassName: 'whiteText',
        headerClassName: 'whiteText',
        valueGetter: params => `${ params.row.scoredMarks } / ${ params.row.maxMarks }`
    },
]

const ResultCard = ({ semester, semResult }) => {
    const clsx = useStyles()
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
                    <Typography variant="h6">
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
            <Typography variant="overline" sx={ { letterSpacing: 1 } }>
                Total Marks Scored : <strong>{ totalMarksScored(semResult) }</strong>
            </Typography>
            <Typography variant="overline" sx={ { letterSpacing: 1 } }>
                Percentage : <strong>{ percentage(semResult) } %</strong>
            </Typography>
            <Typography variant="overline" sx={ { letterSpacing: 1 } }>
                SGPA : <strong>{ calculateSGPA(semResult) } / 10</strong>
            </Typography>
            <br />
            <DataGrid
                className={ clsx.datagrid }
                pagination
                autoPageSize
                rows={ semResult ?? [] }
                columns={ columns }
                disableSelectionOnClick
                disableColumnMenu
                isCellEditable={ () => false }
                isRowEditable={ () => false }
                components={ {
                    Toolbar: CustomToolbar,
                    Pagination: CustomPagination,
                    NoRowsOverlay: CustomNoRowsOverlay,
                } }
                getRowId={ row => row.subjectCode }
                scrollbarSize={ 10 }
            />
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
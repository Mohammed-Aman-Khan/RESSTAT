import Fab from '@mui/material/Fab'
import styled from '@mui/material/styles/styled'
import AddIcon from '@mui/icons-material/Add'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'

const NewResultPaper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
    width: '100%',
    aspectRatio: '1/1',
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
})

const NewResultCard = () => {
    const [ open, setOpen ] = useState(false)

    return <>
        <NewResultPaper elevation={ 0 }>
            <AddIcon fontSize="large" />
        </NewResultPaper>
    </>
}

export default NewResultCard
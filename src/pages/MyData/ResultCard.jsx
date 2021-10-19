import styled from '@mui/material/styles/styled'
import { useState } from 'react'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'

const ResultPaper = styled('div')({
    minHeight: 200,
    minWidth: 200,
    borderRadius: 20,
    border: '1px solid rgba(255, 255, 255, 0.2)',
})

const ResultCard = ({ semester, semResults }) => {
    return <ResultPaper elevation={ 0 }>

    </ResultPaper>
}

export default ResultCard
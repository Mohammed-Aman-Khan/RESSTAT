import makeStyles from '@mui/styles/makeStyles'
import { useGridSlotComponentProps } from '@mui/x-data-grid'
import Pagination from '@mui/material/Pagination'

const useStyles = makeStyles({
    root: {
        color: 'white',
    },
})

const CustomPagination = () => {
    const { state, apiRef } = useGridSlotComponentProps()
    const classes = useStyles()

    return <Pagination
        className={ classes.root }
        count={ state.pagination.pageCount }
        page={ state.pagination.page + 1 }
        onChange={ (event, value) => apiRef.current.setPage(value - 1) }
    />
}

export default CustomPagination
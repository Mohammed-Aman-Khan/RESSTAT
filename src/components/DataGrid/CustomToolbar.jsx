import { GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector } from '@mui/x-data-grid'

const CustomToolbar = () => {
    return <GridToolbarContainer>
        <GridToolbarColumnsButton style={ { color: 'white' } } />
        <GridToolbarFilterButton style={ { color: 'white' } } />
        <GridToolbarDensitySelector style={ { color: 'white' } } />
    </GridToolbarContainer>
}

export default CustomToolbar
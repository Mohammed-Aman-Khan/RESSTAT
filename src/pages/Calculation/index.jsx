import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import withStyles from '@mui/styles/withStyles'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { MathJaxContext, MathJax } from 'better-react-mathjax'

const Card = withStyles(theme => ({
    root: {
        padding: 20,
        [ theme.breakpoints.down('md') ]: {
            padding: 10,
        }
    },
}), { name: 'MyDataCard' })(Paper)

const Calculation = () => {
    return <Card
        square
        elevation={ 0 }
    >
        <MathJaxContext>
            <Grid
                container
                spacing={ 5 }
            >
                <Grid
                    container item
                    xs={ 12 } sm={ 12 } md={ 6 } lg={ 6 } xl={ 4 }
                >
                    <Typography sx={ { width: '100%' } } variant="h5">Grade Points</Typography>
                    <br /><br /><br />
                    <Typography variant="body1">
                        Grade Points for an individual subject are determined based on the marks scored in the subject.
                    </Typography>
                    <br />
                    <TableContainer component={ Paper }>
                        <Table sx={ { width: '100%' } }>
                            <TableHead>
                                <TableRow>
                                    {
                                        [
                                            'Marks Scored',
                                            'Level',
                                            'Letter Grade',
                                            'Grade Points',
                                        ]
                                            .map((item, idx) =>
                                                <TableCell
                                                    key={ idx }
                                                    align="center"
                                                    sx={ { minWidth: 100 } }
                                                >
                                                    <Typography variant="body2">
                                                        { item }
                                                    </Typography>
                                                </TableCell>
                                            )
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    [
                                        [
                                            '90 - 100',
                                            'Outstanding',
                                            'S',
                                            '10',
                                        ],
                                        [
                                            '80 - 89',
                                            'Excellent',
                                            'A',
                                            '9',
                                        ],
                                        [
                                            '70 - 79',
                                            'Very Good',
                                            'B',
                                            '8',
                                        ],
                                        [
                                            '60 - 69',
                                            'Good',
                                            'C',
                                            '7',
                                        ],
                                        [
                                            '45 - 59',
                                            'Above Average',
                                            'D',
                                            '6',
                                        ],
                                        [
                                            '40 - 44',
                                            'Average',
                                            'E',
                                            '4',
                                        ],
                                        [
                                            '0 - 39',
                                            'Fail',
                                            'F',
                                            '0',
                                        ],
                                    ]
                                        .map((row, outerIdx) =>
                                            <TableRow
                                                key={ outerIdx }
                                            >
                                                {
                                                    row
                                                        .map((cell, innerIdx) =>
                                                            <TableCell
                                                                key={ innerIdx }
                                                                align="center"
                                                                sx={ { width: '100%' } }
                                                            >
                                                                <Typography variant="subtitle2">
                                                                    { cell }
                                                                </Typography>
                                                            </TableCell>
                                                        )
                                                }
                                            </TableRow>
                                        )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid
                    container item
                    xs={ 12 } sm={ 12 } md={ 6 } lg={ 6 } xl={ 4 }
                >
                </Grid>
            </Grid>
        </MathJaxContext>
    </Card>
}

export default Calculation
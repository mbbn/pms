import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {TablePagination} from "@mui/material";

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function DataTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth:650}} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={theme => ({
                            textAlign: theme.direction === 'rtl' ? 'right' : 'left'
                        })}>ID</TableCell>
                        <TableCell sx={theme => ({
                            textAlign: theme.direction === 'rtl' ? 'right' : 'left'
                        })}>Dessert (100g serving)</TableCell>
                        <TableCell sx={theme => ({
                            textAlign: theme.direction === 'rtl' ? 'right' : 'left'
                        })}>Calories</TableCell>
                        <TableCell sx={theme => ({
                            textAlign: theme.direction === 'rtl' ? 'right' : 'left'
                        })}>Fat&nbsp;(g)</TableCell>
                        <TableCell sx={theme => ({
                            textAlign: theme.direction === 'rtl' ? 'right' : 'left'
                        })}>Carbs&nbsp;(g)</TableCell>
                        <TableCell sx={theme => ({
                            textAlign: theme.direction === 'rtl' ? 'right' : 'left'
                        })}>Protein&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" sx={theme => ({
                                textAlign: theme.direction === 'rtl' ? 'right' : 'left'
                            })}>{index}</TableCell>
                            <TableCell component="th" scope="row" sx={theme => ({
                                textAlign: theme.direction === 'rtl' ? 'right' : 'left'
                            })}>{row.name}</TableCell>
                            <TableCell component="th" scope="row" sx={theme => ({
                                textAlign: theme.direction === 'rtl' ? 'right' : 'left'
                            })}>{row.calories}</TableCell>
                            <TableCell component="th" scope="row" sx={theme => ({
                                textAlign: theme.direction === 'rtl' ? 'right' : 'left'
                            })}>{row.fat}</TableCell>
                            <TableCell component="th" scope="row" sx={theme => ({
                                textAlign: theme.direction === 'rtl' ? 'right' : 'left'
                            })}>{row.carbs}</TableCell>
                            <TableCell component="th" scope="row" sx={theme => ({
                                textAlign: theme.direction === 'rtl' ? 'right' : 'left'
                            })}>{row.protein}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination rowsPerPageOptions={[10,50]} count={10} rowsPerPage={10} onPageChange={()=>{}} page={0}/>
        </TableContainer>
    );
}
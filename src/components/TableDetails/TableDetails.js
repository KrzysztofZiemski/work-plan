import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DialogMessage from '../../components/DialogMessage';
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '& *': {
            textAlign: 'center'
        }
    },

}))(TableRow);

const createData = (name, calories, fat, carbs, protein) => {
    return { name, calories, fat, carbs, protein };
}
const createCell = (cell, comnponent) => <StyledTableCell key={cell} component={comnponent ? comnponent : null} scope="row">{cell}</StyledTableCell>
const renderRow = (arr) => {
    return arr.map((row, index) => {
        return (
            <StyledTableRow key={`${index}tableRow`} >
                {row.map((cell, index) => index === 0 ? createCell(cell, 'th') : createCell(cell))}
            </StyledTableRow >
        )
    })
}
const rows = [
    createData('Produkty', 159, 6.0, 24, 4.0),
    createData('Wydajność', 237, 9.0, 37, 4.3),
    createData('Prędkość', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];
const rows2 = [
    ['Produkty', 159, 6.0, 24, 4.0],
    ['Wydajność', 237, 9.0, 37, 4.3],
    ['Prędkość', 262, 16.0, 24, 6.0],
    ['Cupcake', 305, 3.7, 67, 4.3],
    ['Gingerbread', 356, 16.0, 49, 3.9]
]

const useStyles = makeStyles({
    table: {
        margin: '0 auto',
        width: '100%'
    },
    cells: {
        textAlign: 'center'
    }
});


export const TableDetails = ({ headers }) => {

    const classes = useStyles();
    const renderCell = (arr) => {
        return arr.map(row => {
            return (
                <StyledTableRow key={row.name} >
                    <StyledTableCell component="th" scope="row">
                        {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.calories}</StyledTableCell>
                    <StyledTableCell align="right">{row.fat}</StyledTableCell>
                    <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                    <StyledTableCell align="right">{row.protein}</StyledTableCell>
                </StyledTableRow>
            )
        })
    }
    const renderHeaders = () => headers.map(header => <StyledTableCell className={classes.cells} key={`${header} tableHeader`}>{header ? header : null}</StyledTableCell>)

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {/* <StyledTableCell></StyledTableCell>
                        <StyledTableCell align="right">Stanowisko 1</StyledTableCell>
                        <StyledTableCell align="right">Stanowisko 2</StyledTableCell>
                        <StyledTableCell align="right">Stanowisko 3</StyledTableCell>
                        <StyledTableCell align="right">Podsumowanie</StyledTableCell> */}
                        {renderHeaders()}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.calories}</StyledTableCell>
                            <StyledTableCell align="right">{row.fat}</StyledTableCell>
                            <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                            <StyledTableCell align="right">{row.protein}</StyledTableCell>
                        </StyledTableRow>
                    ))} */}
                    {renderRow(rows2)}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

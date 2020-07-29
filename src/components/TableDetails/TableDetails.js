import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
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
        '&:last-child': {
            borderTop: 'black 3px solid'
        },
        '& *': {
            textAlign: 'center'
        }
    },

}))(TableRow);

const createCell = (cell, comnponent, key) => <StyledTableCell key={cell + key} component={comnponent ? comnponent : null} scope="row">{cell}</StyledTableCell>
const renderRow = (arr) => {
    return arr.map((row, index) => {

        return (
            <StyledTableRow key={`${index}tableRow`} >
                {row.map((cell, index) => index === 0 ? createCell(cell, 'th', `${index}th`) : createCell(cell, 'td', index))}
            </StyledTableRow >
        )
    })
};


const useStyles = makeStyles({
    table: {
        margin: '0 auto',
        width: '100%'
    },
    cells: {
        textAlign: 'center'
    }
});

export const TableDetails = ({ headers, rows }) => {

    const classes = useStyles();
    const renderHeaders = () => headers.map(header => <StyledTableCell className={classes.cells} key={`${header} tableHeader`}>{header ? header : null}</StyledTableCell>)

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {renderHeaders()}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderRow(rows)}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
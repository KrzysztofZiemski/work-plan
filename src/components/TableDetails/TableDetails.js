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


const useStyles = makeStyles({
    table: {
        margin: '0 auto',
        width: '100%'
    },
    cells: {
        textAlign: 'center'
    }
});

export const TableDetails = ({ headers, rows, summary = true }) => {

    const classes = useStyles(summary);
    const renderHeaders = () => headers.map(header => <StyledTableCell className={classes.cells} key={`${header} tableHeader`}>{header ? header : null}</StyledTableCell>);

    const createCell = (cell, comnponent, key) => <StyledTableCell key={cell + key} component={comnponent ? comnponent : null} scope="row">{cell}</StyledTableCell>;

    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
            '&:last-child': {
                borderTop: summary ? 'black 3px solid' : ''
            },
            '& *': {
                textAlign: 'center'
            }
        },

    }))(TableRow);

    const renderRow = (arr) => {
        if (!Array.isArray(arr)) return null;
        return arr.map((row, index) => {
            if (!Array.isArray(row)) return null;
            return (
                <StyledTableRow key={`${index}tableRow`} >
                    {row.map((cell, index) => index === 0 ? createCell(cell, 'th', `${index}th`) : createCell(cell, 'td', index))}
                </StyledTableRow >
            )
        })
    };

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {rows && rows.length > 0 ? renderHeaders() : <StyledTableCell className={classes.cells}>Brak danych</StyledTableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderRow(rows)}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

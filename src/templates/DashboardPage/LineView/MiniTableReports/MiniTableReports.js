import React from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        // minWidth: 650,

    },
    cell: {
        fontSize: '.7em',
        padding: 3
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    }
});

export const MiniTableReports = ({ rows }) => {

    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow className={classes.table}>
                        <TableCell className={classes.cell}>start</TableCell>
                        <TableCell className={classes.cell}>koniec</TableCell>
                        <TableCell className={classes.cell} >produkt</TableCell>
                        <TableCell className={classes.cell} >seria</TableCell>
                        <TableCell className={classes.cell} >czas</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => <TableRow key={index} >
                        <TableCell className={classes.cell} ><Link to={`/report/production/report/${row.id}`} className={classes.link}>{row.start}</Link></TableCell>
                        <TableCell className={classes.cell}><Link to={`/report/production/report/${row.id}`} className={classes.link}>{row.end}</Link></TableCell>
                        <TableCell className={classes.cell}><Link to={`/report/production/report/${row.id}`} className={classes.link}>{row.product}</Link></TableCell>
                        <TableCell className={classes.cell}><Link to={`/report/production/report/${row.id}`} className={classes.link}>{row.series}</Link></TableCell>
                        <TableCell className={classes.cell}><Link to={`/report/production/report/${row.id}`} className={classes.link}>{`${row.time} h`}</Link></TableCell>
                    </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer >
    );
};


MiniTableReports.defaultProps = {
    rows: []
}

MiniTableReports.propTypes = {
    rows: PropTypes.arrayOf(PropTypes.shape({
        start: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
        end: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
        product: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
        series: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
        time: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
    }))
}
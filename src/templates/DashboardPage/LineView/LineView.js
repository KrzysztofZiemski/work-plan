import React from 'react';
import PropTypes from "prop-types";
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import CircleProgress from '../../../components/CircleProgress';
import LineDecoration from '../../../components/LineDecoration';
import MiniTableReports from './MiniTableReports';
import { convertDateToPresent } from '../../../helpers/dateHelper';

const styles = makeStyles(({
    root: {
        maxWidth: 400,
        width: '30%',
        padding: '5px 1%',
        backgroundColor: 'lightgray',
        border: '5px solid silver',
        borderRadius: 5
    },
    header: {
        textAlign: 'center',
        marginBottom: 30
    },
    circleContainer: {
        maxWidth: 200,
        margin: '0 auto'
    },
    decorationContainer: {
        margin: '30px 0',
    },
    row: {
        textAlign: 'left',
        height: '2em'
    },
    th: {
        padding: 3,
        paddingRight: '1.4em'
    },
    reportsContainer: {
        maxHeight: 200,
        overflow: 'auto',

    },
    dataContainer: {

    },
}));

const createData = (start, end, product, series, time, id) => {
    return { start, end, product, series, time, id };
}

export const LineView = ({ name, className, reports, data }) => {

    const classes = styles();
    console.log('reports', reports)
    const rows = reports.map(({ startProduction, endProduction, product, series, productionTimeToHour, line, idProductionReport }) => (
        createData(convertDateToPresent(startProduction), convertDateToPresent(endProduction), product.name, series, productionTimeToHour.toFixed(2), idProductionReport)))

    return (
        <div className={`${classes.root} ${className}`}>
            <h1 className={classes.header}>{name}</h1>
            <Grid className={classes.circleContainer}>
                <CircleProgress value={data.percentage} title='' secondary />
            </Grid>
            <Grid className={classes.dataContainer}>
            </Grid>
            <Grid className={classes.decorationContainer}>
                <LineDecoration />
            </Grid>
            <Grid>
                <table>
                    <tbody>
                        <tr className={classes.row}>
                            <th className={classes.th}>Średnia wydajność:</th>
                            <td>{data.percentage}</td>
                        </tr>
                        <tr className={classes.row}>
                            <th className={classes.th}>Średnia prędkość takty/min:</th>
                            <td>{data.averagePerHour}</td>
                        </tr>
                        <tr className={classes.row}>
                            <th className={classes.th}>Średnie OEE:</th>
                            <td>{data.averageSpeed}</td>
                        </tr>
                        <tr className={classes.row}>
                            <th className={classes.th}>Wyprodukowano:</th>
                            <td>{data.totalProduced}</td>
                        </tr>
                    </tbody>
                </table>
            </Grid>
            <Grid className={classes.decorationContainer}>
                <LineDecoration />
            </Grid >
            <Grid className={classes.reportsContainer}>
                {rows.length > 0 && <MiniTableReports rows={rows} />}
            </Grid>

        </div >
    );
};


LineView.defaultProps = {
    name: 'brak',
    className: '',
    reports: []
}

LineView.propTypes = {
    name: PropTypes.string,
    className: PropTypes.string,
    data: PropTypes.shape({
        averagePerHour: PropTypes.number,
        averageSpeed: PropTypes.number,
        percentage: PropTypes.number,
        totalProduced: PropTypes.number,
    })
}
import React, { useState, useEffect, useCallback } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import InputLabel from '@material-ui/core/InputLabel';

import statistics from '../../../services/statisticsService';
import TableDetails from './../../../components/TableDetails';
import ButtonLoader from '../../../components/ButtonLoader';

import DateTimePicker from './../../../components/DateTimePicker';
import { getCorrectlyFormatData, subtractionDate } from '../../../helpers/dataHelper';
// import { getEmployeesReports, getSeriesReports } from '../../../helpers/statisticsHelper';
import { getProductsReport } from '../../../helpers/statisticsHelper';
import DialogMessage from '../../../components/DialogMessage';
// import { AddFilter } from '../../../components/AddFilter/AddFilter';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles(({
    root: {
        padding: 20,
        flexWrap: 'nowrap'
    },
    tableContainer: {
        flexGrow: 1,
        margin: '0 20px'
    },
    panelFilter: {
        display: 'flex',
        flexDirection: 'column'
    },
    date: {
        marginTop: 10,
        flexWrap: 'nowrap'
    },
    button: {
        padding: '15px 25px',
        alignSelf: 'center',
    },
    seriesInput: {
        margin: '10px 0'
    }
    // filterSelect: {
    //     margin: '10px 0'
    // },
    // options: {
    //     textTransform: 'capitalize'
    // }
}));



const headersTable = [' ', 'Ilość wyprodukowana', 'Wydajność', 'Prędkość', 'Wydajność na godzinę'];

const StatisticsContainer = ({ id, type }) => {
    const classes = useStyles();
    let [stats, setStats] = useState('');
    let [dateStart, setDateStart] = useState(subtractionDate(30));
    let [dateEnd, setDateEnd] = useState(subtractionDate(0));
    let [isFetching, setFetching] = useState(false);
    let [message, setMessage] = useState({ isOpen: false, text: [] });
    let [dataTable, setDataTable] = useState([]);
    let [seriesFilter, setSeriesFilter] = useState('');

    const handleCloseMessage = () => {
        setMessage({ isOpen: false, text: [] })
    }

    const handleSeriesFilter = ({ target }) => {
        setSeriesFilter(target.value)
    }
    //przy każdej zmianie wartości aktualizuje się od razu, a nie po przyciśnięiu przycisku i 400
    const getReport = useCallback(() => {
        const data = {
            start: getCorrectlyFormatData(dateStart),
            end: getCorrectlyFormatData(dateEnd),
            idItems: [id],
            type,
            options: { averagePerHour: true, percentage: true, averageSpeed: true, totalProduced: true }
        }
        if (seriesFilter) data.options.series = seriesFilter

        return statistics.create(data)
            .then(data => {
                setStats(data);
                setFetching(false);
            })
            .catch(err => {
                setMessage({ isOpen: true, text: ['Wystąpił błąd łączności', `${err}`, 'spróbuj ponownie'] });
                setFetching(false);
            })
    }, [])

    // getProductsReport

    //usrtawić loader i errory
    const getReportByProduct = () => {

        if (!stats.dataReport) return
        const products = getProductsReport(stats.dataReport);
        const data = {
            start: getCorrectlyFormatData(dateStart),
            end: getCorrectlyFormatData(dateEnd),
            idItems: [id],
            type,
            options: {}
        }
        if (seriesFilter) data.options.series = seriesFilter;

        setFetching(true);

        const productRequests = products.map(product => {
            data.options['product'] = product.id
            return statistics.createCircle(data)
        })
        delete data.options.product;

        productRequests.push(statistics.createCircle(data))
        Promise.all(productRequests)
            .then(dataArr => {
                const rows = [];
                dataArr.forEach(data => {
                    setFetching(false);
                    const name = data.options.product ? data.options.product : 'Total';
                    const row = [name, data.options.totalProduced, `${data.options.percentage}%`, data.options.averageSpeed, data.options.averagePerHour];
                    rows.push(row);
                })
                setDataTable(rows);
            })
            .catch(err => {
                setFetching(false);
                setMessage({
                    isOpen: true,
                    text: ['Wystąpił błąd pobierania', `Błąd ${err}`]
                })
            })
    }

    useEffect(() => {
        if (id && type) {
            getReport();
        }
        return () => {
            setFetching(false)
        }
    }, [id, type, getReport]);

    return (
        <Grid container className={classes.root}>
            <DialogMessage open={message.isOpen} close={handleCloseMessage} messages={message.text} />
            <Grid className={classes.panelFilter}>
                <DateTimePicker date={dateStart} setDate={setDateStart} name='Czas początkowy' className={classes.date} />
                <DateTimePicker date={dateEnd} setDate={setDateEnd} name='Czas końcowy' className={classes.date} />
                <TextField label="Filtruj po serii" variant="outlined" className={classes.seriesInput} onChange={handleSeriesFilter} value={seriesFilter} />
                <ButtonLoader onClick={getReportByProduct} className={classes.button} value='Pobierz dane' isSubmitting={isFetching} />
            </Grid>
            <Grid className={classes.tableContainer}>
                <TableDetails headers={headersTable} rows={dataTable ? dataTable : []} />
            </Grid>
        </Grid>
    );
};

export default StatisticsContainer;
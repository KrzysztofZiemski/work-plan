import React, { useState, useEffect, useCallback } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import statistics from '../../../services/statisticsService';
import TableDetails from './../../../components/TableDetails';
import ButtonLoader from '../../../components/ButtonLoader';
import DateTimePicker from './../DateTimePicker';
import { getCorrectlyFormatData, subtractionDate } from '../../../helpers/dataHelper';
import DialogMessage from '../../../components/DialogMessage';
const useStyles = makeStyles(({
    root: {
        padding: 20
    },
    tableContainer: {
        flexGrow: 1,
        margin: '0 20px'
    },
    date: {
        marginBottom: 20
    },
    button: {
        padding: '15px 25px',
        alignSelf: 'center',
    }
}));
const options = {}

const headersTable = [' ', 'Stanowisko pierwsze', 'Stanowisko drugie', 'Stanowisko trzecie', 'Podsumowanie'];

const StatisticsContainer = (id, type) => {
    const classes = useStyles();
    let [stats, setStats] = useState('');
    let [dateStart, setDateStart] = useState('');
    let [dateEnd, setDateEnd] = useState('');
    let [isFetching, setFetching] = useState(false);
    let [message, setMessage] = useState({ isOpen: false, text: [] });

    const handleCloseMessage = () => {
        setMessage({ isOpen: false, text: [] })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getReport = useCallback(() => {
        setFetching(true);
        statistics.create(getCorrectlyFormatData(dateStart), getCorrectlyFormatData(dateEnd), [id], type, options)
            .then(data => {
                if (isFetching) setStats(data);
                setFetching(false);
            })
            .catch(err => {
                // setMessage({ isOpen: true, text: ['Wystąpił sssssssssssbłąd łączności', `${err}`, 'spróbuj ponownie'] });
                setFetching(false);
            })
    }, [dateEnd, dateStart, id, type])

    useEffect(() => {
        if (!dateEnd) setDateStart(subtractionDate(30));
        if (dateStart || dateEnd || (id || id === 0) || type || options) {
            getReport()
        }

        return () => {
            setFetching(false)
        }
    }, [dateStart, dateEnd, getReport, id, type]);


    return (
        <Grid container className={classes.root}>
            <DialogMessage open={message.isOpen} close={handleCloseMessage} messages={message.text} />
            <Grid>
                <DateTimePicker date={dateStart} setDate={setDateStart} name='Czas początkowy' className={classes.date} />
                <DateTimePicker date={dateEnd} setDate={setDateEnd} name='Czas końcowy' className={classes.date} />
                <ButtonLoader onClick={getReport} className={classes.button} value='Pobierz dane' isSubmitting={isFetching} />
            </Grid>
            <Grid className={classes.tableContainer}>
                <TableDetails headers={headersTable} />
            </Grid>
        </Grid>
    );
};

export default StatisticsContainer;
import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import LineService from '../../../services/LineService';
import ButtonLoader from '../../../components/ButtonLoader';
import DateTimePicker from './../DateTimePicker';

const useStyles = makeStyles(({
    button: {
        padding: '15px 25px',
        alignSelf: 'center',
    }
}))
const StatisticsContainer = () => {
    const classes = useStyles()
    let [dateStart, setDateStart] = useState('');
    let [dateEnd, setDateEnd] = useState('');
    let [isFetching, setFetching] = useState(false);


    const getReport = () => {

    }
    return (
        <Grid container>
            <DateTimePicker date={dateStart} setDate={setDateStart} name='Czas początkowy' />
            <DateTimePicker date={dateEnd} setDate={setDateEnd} name='Czas końcowy' />
            <ButtonLoader onClick={getReport} className={classes.button} value='Pobierz dane' fullWidth={false} isSubmitting={isFetching} />
        </Grid>
    );
};

export default StatisticsContainer;
import React, { useRef, useEffect, useState } from 'react';

import { useReactToPrint } from 'react-to-print';
import { CardHeader, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { getWorkPlanByDate } from '../../services/workPlanApi';
import { getCorrectlyFormatData } from '../../helpers/dateHelper';

import DateTimePicker from '../../components/DateTimePicker';
import ButtonLoader from '../../components/ButtonLoader';
import { GraphicToPrint } from './GraphicToPrint';
import DialogMessage from '../../components/DialogMessage';
import useActiveEmployees from '../../hooks/useActiveEmployees';
import { useDateWeek } from '../../hooks/useDateWeek';
import HeaderPage from '../../components/HeaderPage';

const useStyles = makeStyles(({
    settings: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: 40
    },
    printButton: {
        alignSelf: 'center',
        margin: 20
    },
}));

export const ViewGraphicPage = ({ className }) => {
    const componentRef = useRef();
    let [dates, setDates] = useDateWeek();
    let [workPlan, setWorkPlan] = useState();
    let [isError, setIsError] = useState(false);

    const closeMessage = () => setIsError(false)
    const handlerPrint = useReactToPrint({
        content: () => componentRef.current
    });

    const getPlan = () => {
        const start = getCorrectlyFormatData(dates.start).slice(0, 10);
        const end = getCorrectlyFormatData(dates.end).slice(0, 10);
        getWorkPlanByDate(start, end)
            .then(data => setWorkPlan(data))
            .catch(err => setIsError(true))
    }

    const classes = useStyles();

    return (
        <section className={className}>
            <HeaderPage title='Plan pracy' />
            <Grid container className={classes.settings}>
                <Grid>
                    <DateTimePicker name='Wybierz tydzień' date={dates.start} setDate={setDates} onlyDate arrows />
                    <ButtonLoader value='Pokaż tydzień' onClick={getPlan} />
                </Grid>
                <ButtonLoader onClick={handlerPrint} fullWidth={false} value='Drukuj' className={classes.printButton} />
            </Grid>
            {isError ? <DialogMessage open={isError} close={closeMessage} messages={['Wystąpił błąd podczas pobierania grafiku']} /> :
                <GraphicToPrint ref={componentRef} data={workPlan} />}
        </section>

    );
};

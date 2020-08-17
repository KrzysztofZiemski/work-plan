import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import DateTimePicker from '../../components/DateTimePicker';
import ButtonLoader from '../../components/ButtonLoader';
import { GraphicToPrint } from './GraphicToPrint';

import { useDateWeek } from '../../hooks/useDateWeek';

const useStyles = makeStyles(({
    settings: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: 40
    },
    printButton: {
        alignSelf: 'center',
        margin: 20
    }
}));

export const ViewGraphicPage = () => {
    const componentRef = useRef();
    let [dates, setDates] = useDateWeek();

    const handlerPrint = useReactToPrint({
        content: () => componentRef.current
    });

    const classes = useStyles();

    return (
        <div>
            <Grid container className={classes.settings}>
                <Grid>
                    <DateTimePicker name='wybierz tydzień' date={dates.start} setDate={setDates} />
                    <ButtonLoader value='Pokaż' />
                </Grid>
                <ButtonLoader onClick={handlerPrint} fullWidth={false} value='Drukuj' className={classes.printButton} />

            </Grid>
            <GraphicToPrint ref={componentRef} />
        </div>

    );
};

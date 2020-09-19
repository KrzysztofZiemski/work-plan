import 'date-fns';
import React, { useEffect, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import { WorkPlanContext } from '../GraphicPage';
import { Typography } from '@material-ui/core';
import DateTimePicker from './../../../components/DateTimePicker';
import ButtonLoader from './../../../components/ButtonLoader';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        padding: 14
    },
    containser: {
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        textAlign: 'center',
        fontSize: 17
    },
    button: {
        minHeight: 37
    }
}));

const NavGraphic = ({ className, dateEnd, dateStart, setDate, isSubmiting }) => {
    const classes = useStyles()
    const { submitWorkPlan } = useContext(WorkPlanContext);


    useEffect(() => {
        handleChangeDate(new Date());
    }, [])


    const handleChangeDate = (date) => {
        setDate(date);
    }

    return (
        <>
            <Grid container justify="center" className={classes.root}>
                <Grid>
                    <Typography className={classes.title}>Wybierz początek tygodnia pracy</Typography>
                    <DateTimePicker date={dateStart} setDate={setDate} onlyDate arrows />
                    <ButtonLoader variant="contained" color="primary" className={classes.button} onClick={submitWorkPlan} isSubmitting={isSubmiting} value='Zapisz' />
                </Grid>
            </Grid>

        </>

    );
};

export default NavGraphic;
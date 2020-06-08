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

const useStyles = makeStyles(() => ({
    root: {
        paddingLeft: 20,
        alignItems: 'center',
    },
    btn: {
        marginLeft: 50,
        height: 38
    }
}))

const NavGraphic = ({ className, setDateEnd, dateEnd, dateStart, setDateStart }) => {
    const classes = useStyles()
    const { dragable, submitWorkPlan, setDragable } = useContext(WorkPlanContext);


    useEffect(() => {
        handleChangeDate(new Date());
    }, [])
    const additionDays = (date, days) => {
        const dateObject = new Date(date);
        const newDate = new Date(dateObject.setTime(dateObject.getTime() + (days * 24 * 60 * 60 * 1000)));
        const day = newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();
        const month = newDate.getMonth() + 1 < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1;
        const year = newDate.getFullYear();
        return `${year}-${month}-${day}`
    }
    const subtractionDays = (date, days, sign = 'addition') => {
        const dateObject = new Date(date);
        const newDate = new Date(dateObject.setTime(dateObject.getTime() - (days * 24 * 60 * 60 * 1000)));
        const day = newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();
        const month = newDate.getMonth() + 1 < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1;
        const year = newDate.getFullYear();
        return `${year}-${month}-${day}`;
    }

    const handleChangeDate = (date) => {
        if (date instanceof Date) {
            const day = date.getDay();
            console.log('day', day)
            if (day === 0) {
                setDateStart(subtractionDays(date, 6));
                const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
                const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
                const year = date.getFullYear();
                setDateEnd(`${year}-${month}-${day}`);
                return;
            }
            if (day === 1) {
                const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
                const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
                const year = date.getFullYear();
                setDateStart(`${year}-${month}-${day}`);
                setDateEnd(additionDays(date, 6));
                return;
            }
            setDateStart(subtractionDays(date, day - 1));
            setDateEnd(additionDays(date, 7 - day))
        }

    }

    return (

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="center" className={classes.root}>
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="początek tygodnia"
                    value={dateStart}
                    onChange={handleChangeDate}

                />
                <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="koniec tygodnia"
                    format="dd/MM/yyyy"
                    value={dateEnd}
                    onChange={handleChangeDate}
                />
                {dragable ? <Button variant="contained" color="primary" className={classes.btn} onClick={submitWorkPlan}>Zapisz</Button> : null}
            </Grid>

        </MuiPickersUtilsProvider>
    );
};

export default NavGraphic;
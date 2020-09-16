import React, { useEffect } from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import { subtractionDate, additionDays } from './../../helpers/dateHelper'

const useStyles = makeStyles(({
    root: {
        flexWrap: 'nowrap',
    },
    arrows: {
        fontSize: 40,
        alignSelf: 'center',
        margin: 10,
        backgroundColor: 'inherit',
        '&:hover': {
            color: '#303F9F',
            cursor: 'pointer',
            backgroundColor: '#eee'
        }
    }
}))

// The first commit of Material-UI


export const DateTimePicker = ({ name = '', date, setDate, className, onlyDate = false, arrows }) => {
    const classes = useStyles()
    useEffect(() => {
        if (!date) {
            setDate(new Date(Date.now()))
        }
    }, [date, setDate])

    const handleDateChange = (date) => {
        setDate(date);
    };
    const handleNextWeek = () => setDate(additionDays(7, date))

    const handlePreviousWeek = () => setDate(subtractionDate(7, date));

    return (
        <Grid className={className}>
            <legend>{name}</legend>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container={className ? false : true} className={className ? className : classes.root}>
                    {arrows && <NavigateBeforeIcon className={classes.arrows} onClick={handlePreviousWeek} />}
                    <KeyboardDatePicker
                        autoOk={true}
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        value={date}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    {!onlyDate && <KeyboardTimePicker
                        autoOk={true}
                        ampm={false}
                        margin="normal"
                        format="HH:mm"
                        value={date}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                    />
                    }
                    {arrows && <NavigateNextIcon className={classes.arrows} onClick={handleNextWeek} />}
                </Grid>
            </MuiPickersUtilsProvider>
        </Grid>
    );
};

export default DateTimePicker;
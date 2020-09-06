import React, { useEffect } from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({
    root: {
        flexWrap: 'nowrap'
    }
}))

// The first commit of Material-UI


export const DateTimePicker = ({ name = '', date, setDate, className }) => {
    const classes = useStyles()
    useEffect(() => {
        if (!date) {
            setDate(new Date(Date.now()))
        }
    }, [date, setDate])

    const handleDateChange = (date) => {
        setDate(date);
    };

    return (
        <Grid className={className}>
            <legend>{name}</legend>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container={className ? false : true} className={className ? className : classes.root}>
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
                    <KeyboardTimePicker
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
                </Grid>
            </MuiPickersUtilsProvider>
        </Grid>
    );
};

export default DateTimePicker;
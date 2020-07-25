import React, { useEffect } from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';


// The first commit of Material-UI


const DateTimePicker = ({ name = '', date, setDate, className }) => {

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
                <Grid container >
                    <KeyboardDatePicker

                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker"

                        value={date}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardTimePicker
                        ampm={false}
                        margin="normal"
                        format="HH:mm"
                        id="time-picker"

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
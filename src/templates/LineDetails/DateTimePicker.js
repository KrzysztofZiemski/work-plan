import React, { useEffect } from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';


// The first commit of Material-UI


const useStyles = makeStyles(({
    root: {
        margin: 10,
        padding: 10
    }
}))

const DateTimePicker = ({ name = '', date, setDate }) => {

    useEffect(() => {
        if (!date) {
            setDate(new Date(Date.now()))
        }
    }, [date, setDate])

    const classes = useStyles()

    const handleDateChange = (date) => {
        setDate(date);
    };

    return (
        <Card className={classes.root}>
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
        </Card>
    );
};

export default DateTimePicker;
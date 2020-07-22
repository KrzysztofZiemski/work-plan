import React from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';


// The first commit of Material-UI




const DateTimePicker = ({ dateName, timeName }) => {
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container >
                    <KeyboardDatePicker

                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker"
                        label={dateName ? dateName : ''}
                        value={selectedDate}
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
                        label={timeName ? timeName : ''}
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
        </div>
    );
};

export default DateTimePicker;
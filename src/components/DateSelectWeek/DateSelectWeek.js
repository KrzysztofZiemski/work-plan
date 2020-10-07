import React from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { subtractionDate, additionDays, getDateToShow, getWeekFromPeriod } from './../../helpers/dateHelper';
import { useDateWeek } from '../../hooks/useDateWeek';
import { SelectPeriodList } from './SelectPeriodList/SelectPeriodList';
import { rankingTypes } from '../../utils/conts';
import ButtonLoader from '../ButtonLoader/ButtonLoader';

const useStyles = makeStyles(({
    // root: {
    //     display: 'fex',
    //     flexWrap: 'nowrap',
    //     justifyContent: 'center',
    //     overflow: 'hidden',
    //     margin: 3
    // },
    arrows: {
        fontSize: 60,
        alignSelf: 'center',
        backgroundColor: 'inherit',
        '&:hover': {
            color: '#303F9F',
            cursor: 'pointer',
            backgroundColor: '#eee'
        }
    },
    dayClassName: {
        width: 36,
        height: 36,
        margin: "0 2px",
        color: "inherit",
        fontSize: 14
    },
    selected: {
        backgroundColor: '#457b9d'
    },
    selectedStart: {
        backgroundColor: '#457b9d',
        borderTopLeftRadius: '25px',
        borderBottomLeftRadius: '25px',
    },
    selectedEnd: {
        backgroundColor: '#457b9d',
        borderTopRightRadius: '25px',
        borderBottomRightRadius: '25px',
    },
    dateContainer: {
        display: 'flex',
        flexDirection: 'column',
        margin: 3
    }
}))


export const DateSelectWeek = ({ className, name = '', submit, isSubmitting }) => {
    const classes = useStyles()
    let [dates, setDates] = useDateWeek();

    const handleDateChange = (date) => setDates(date);

    const handleDateChangeByPeriod = (periodNumber) => setDates(getWeekFromPeriod(periodNumber).start)

    const handleNextWeek = () => setDates(additionDays(7, dates.start));

    const handlePreviousWeek = () => setDates(subtractionDate(7, dates.start));

    const renderLabelDate = () => `${getDateToShow(dates.start)} - ${getDateToShow(dates.end)}`

    const renderWrappedWeekDay = (renderingDate, selectedDate, dayInCurrentMonth) => {
        const getClass = () => {
            let name;
            if (renderingDate.getTime() === dates.start.getTime()) name = 'selectedStart'
            if (renderingDate.getTime() === dates.end.getTime()) name = 'selectedEnd'
            if (renderingDate > dates.start && renderingDate < dates.end) name = 'selected'
            return classes[name];
        }

        return <div className={getClass()}>
            <IconButton className={classes.dayClassName}>
                <span> {renderingDate.getDate()} </span>
            </IconButton>
        </div>
    }
    const handleSubmit = async () => submit && submit(dates);




    return (
        <Grid className={className || ''}>
            <Grid className={classes.root}>
                <legend>{name}</legend>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container >
                        <NavigateBeforeIcon className={classes.arrows} onClick={handlePreviousWeek} />
                        <Grid className={classes.dateContainer}>
                            <KeyboardDatePicker
                                autoOk={true}
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                value={dates.start}
                                labelFunc={renderLabelDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                renderDay={renderWrappedWeekDay}
                            />
                            <SelectPeriodList onChange={handleDateChangeByPeriod} periodType={rankingTypes.WEEK} numberWeek={dates.numberWeek} />
                        </Grid>
                        <NavigateNextIcon className={classes.arrows} onClick={handleNextWeek} />
                    </Grid>
                    <ButtonLoader isSubmitting={isSubmitting} onClick={handleSubmit} value={'pobierz'} />
                </MuiPickersUtilsProvider>
            </Grid>
        </Grid>
    );
};
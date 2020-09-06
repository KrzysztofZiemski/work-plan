import React, { useState } from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import { rankingTypes } from './../../../utils/conts';
import ButtonLoader from '../../../components/ButtonLoader/ButtonLoader';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center'
    },
    formControl: {
        width: 160
    },
    datePicker: {
        display: 'flex',
        alignItems: 'center'
    },
    dateLabel: {
        marginRight: 20,
        alignSelf: 'flex-end',
        paddingBottom: 10
    },
    button: {
        alignSelf: 'center',
        marginLeft: 5
    },
}));

export const RankingPanel = ({ isSubmiting, submit }) => {

    const classes = useStyles();
    const [date, setDate] = useState(new Date());
    const [type, setType] = useState();
    const handleChangeType = (event) => {
        setType(event.target.value);
    };

    const handleGetRanking = () => {
        submit(date, type);
    }
    return (
        <Grid container className={classes.root}>
            <Grid className={classes.datePicker}>
                <Grid component='p' className={classes.dateLabel}>
                    Na dzień:
                </Grid>
                <Grid>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            okLabel={'na dzień'}
                            autoOk={true}
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            value={date}
                            onChange={setDate}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
            </Grid>
            <FormControl className={classes.formControl}>
                <InputLabel>Typ rankingu</InputLabel>
                <Select
                    labelId="label-type-ranking"
                    id="label-type-ranking"
                    value={type}
                    onChange={handleChangeType}
                >
                    <MenuItem value={''}>{' '}</MenuItem>
                    <MenuItem value={rankingTypes.YEAR}>Roczny</MenuItem>
                    <MenuItem value={rankingTypes.HALF_YEAR}>Półroczny</MenuItem>
                    <MenuItem value={rankingTypes.QUARTER}>Kwartalny</MenuItem>
                    <MenuItem value={rankingTypes.MONTH}>Miesięczny</MenuItem>
                    <MenuItem value={rankingTypes.WEEK}>Tygodniowy</MenuItem>
                </Select>
            </FormControl>
            <ButtonLoader value='Pobierz' isSubmitting={isSubmiting} onClick={handleGetRanking} className={classes.button} fullWidth={false} value='Pobierz' />
        </Grid>
    );
};

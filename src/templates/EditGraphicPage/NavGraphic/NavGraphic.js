import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import DateSelectWeek from '../../../components/DateSelectWeek';

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

const NavGraphic = ({ className, dateEnd, dateStart, setDate, isSubmiting, submit }) => {
    const classes = useStyles()

    const handleGetDates = (dates) => {
        submit(dates.start, dates.end)
    }


    return (
        <>
            <Grid container justify="center" className={classes.root}>
                <Card>
                    <DateSelectWeek isSubmiting={isSubmiting} submit={handleGetDates} />
                </Card>
            </Grid>

        </>

    );
};

export default NavGraphic;
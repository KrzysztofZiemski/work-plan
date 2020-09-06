import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useRanking from '../../hooks/useRanking';
import RankingTabs from './RankingTabs';
import RankingPanel from './RankingPanel';
import DialogMessage from '../../components/DialogMessage';


const useStyles = makeStyles((theme) => ({
    root: {
        padding: '10px 20px'
    },
    tables: {
        justifyContent: 'space-around'
    },
}));

export const RankingPage = () => {
    const [ranking, getRanking] = useRanking();
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [error, setError] = useState(false);
    const closeErrorMessage = () => {
        setError(false);
    }
    const classes = useStyles();

    const handleGetRanking = (date, type) => {
        setIsSubmiting(true);
        getRanking(date, type)
            .then(() => setIsSubmiting(false))
            .catch(err => setError(true));
    }
    return (
        <Grid className={classes.root}>
            <Grid>
                <RankingPanel isSubmiting={isSubmiting} submit={handleGetRanking} />
            </Grid>
            <Grid container className={classes.tables}>
                {ranking.year && <RankingTabs ranking={ranking.year} title='ranking roczny' />}
                {ranking.halfYear && <RankingTabs ranking={ranking.halfYear} title='ranking półroczny' />}
                {ranking.quarter && <RankingTabs ranking={ranking.quarter} title='ranking kwartalny' />}
                {ranking.month && <RankingTabs ranking={ranking.month} title='ranking miesięczny' />}
                {ranking.week && <RankingTabs ranking={ranking.week} title='ranking tygodniowy' />}
            </Grid>
            <DialogMessage open={error} close={closeErrorMessage} messages={['Wystąpił błąd podczas pobierania rankingu']} />
        </Grid >
    );
};
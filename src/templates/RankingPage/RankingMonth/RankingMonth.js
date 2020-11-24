import React, { useState } from 'react';
import { Card, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import DateSelectWeek from '../../../components/DateSelectWeek';
import RankingTabs from '../RankingTabs';
import { rankingTypes } from '../../../hooks/useRanking';
import DialogMessage from '../../../components/DialogMessage';
import RankingPanel from '../RankingPanel';

const useStyles = makeStyles((theme) => ({
    tableContainer: {

    },
    rankingTable: {
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',
        backgroundColor: 'rgb(214, 214, 214)',
    },
    panel: {
        padding: 4,
    },
    rankingTableHeader: {
        fontSize: '2em',
        fontWeight: 'bold',
        letterSpacing: 2,
        backgroundColor: 'rgb(89, 89, 89)',
        textAlign: 'center',
        padding: 7,
        color: 'transparent',
        background: '#666666',
        backgroundClip: 'text',
        textShadow: '0px 3px 3px rgba(255,255,255,0.5)',
        border: '4px solid rgba(255,255,255,0.5)'
    },
}));

export const RankingMonth = ({ submit, ranking, get }) => {
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [error, setError] = useState(false);



    const closeErrorMessage = () => {
        setError(false);
    }

    const handleGetRanking = (date, type) => {
        setIsSubmiting(true);
        get(date, type)
            .then(() => setIsSubmiting(false))
            .catch(err => {
                console.log('error', err)
                setIsSubmiting(false)
                setError(true);
            });
    }


    const handleGetRankingWeek = (date) => handleGetRanking(date.start, rankingTypes.MONTH)

    //useDateMonth
    const classes = useStyles();
    return (

        <Grid className={classes.tableContainer}>
            <Typography variant='h2' className={classes.rankingTableHeader}> Ranking Miesięczny</Typography>
            <Grid className={classes.rankingTable}>
                <Card>
                    <RankingPanel />
                </Card>
                <RankingTabs ranking={ranking}
                />
            </Grid>
            <DialogMessage open={error} close={closeErrorMessage} messages={['Wystąpił błąd podczas pobierania rankingu']} />
        </Grid>

    );
};
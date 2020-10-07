import React, { useState } from 'react';
import { Card, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useRanking, { rankingTypes } from '../../hooks/useRanking';
import RankingTabs from './RankingTabs';
import DateSelectWeek from '../../components/DateSelectWeek';
import RankingPanel from './RankingPanel';
import DialogMessage from '../../components/DialogMessage';
import HeaderPage from '../../components/HeaderPage';
import { getWeekFromPeriod, getDateToShow } from './../../helpers/dateHelper';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '10px 20px'
    },
    tables: {
        justifyContent: 'space-around'
    },
    rankingTable: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    panel: {
        // backgroundColor: 'red',
        padding: 4,
    }
}));
//TODO dostosować do różnych period
export const RankingPage = () => {
    const [ranking, getRanking] = useRanking();
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [error, setError] = useState(false);
    const closeErrorMessage = () => {
        setError(false);
    }
    const classes = useStyles();
    console.log(ranking)
    const handleGetRanking = (date, type) => {
        setIsSubmiting(true);
        getRanking(date, type)
            .then(() => setIsSubmiting(false))
            .catch(err => {
                setIsSubmiting(false)
                setError(true);
            });
    }

    const handleGetRankingWeek = (date) => handleGetRanking(date.start, rankingTypes.WEEK)
    const handleGetRankingMonth = (date) => handleGetRanking(date.start, rankingTypes.MONTH)
    //rankingName
    //counterForRankingType
    const renderTitleRankingTable = (type, period) => {
        let title;

        switch (type) {
            case rankingTypes.WEEK:
                const dates = getWeekFromPeriod(period);
                return `RANKING ${period} TYDZIEŃ ${getDateToShow(dates.start)} - ${getDateToShow(dates.end)}`
            default:
                return 'RANKING - BRAK'
        }

    }
    return (
        <Grid className={classes.root}>
            <HeaderPage title='Ranking'></HeaderPage>
            {/* <Grid>
                <RankingPanel isSubmiting={isSubmiting} submit={handleGetRanking} />
            </Grid> */}
            <Grid container className={classes.tables}>
                <Grid className={classes.rankingTable}>
                    <Card>
                        <DateSelectWeek isSubmiting={isSubmiting} submit={handleGetRankingWeek} />
                    </Card>
                    <RankingTabs ranking={ranking.week}
                        title={ranking.week ? renderTitleRankingTable(ranking.week.rankingName, ranking.week.counterForRankingType) : 'RANKING TYGODNIOWY - BRAK'}
                    />
                </Grid>
                <Grid className={classes.rankingTable}>
                    <Card>
                        <DateSelectWeek isSubmiting={isSubmiting} submit={handleGetRankingMonth} />
                    </Card>
                    <RankingTabs ranking={ranking.month}
                        title={ranking.month ? renderTitleRankingTable(ranking.month.rankingName, ranking.month.counterForRankingType) : 'RANKING MIESIĘCZNY - BRAK'}
                    />
                </Grid>
            </Grid>
            <Grid container className={classes.tables}>

                {/* {ranking.year && <RankingTabs ranking={ranking.year} title={`ranking roczny za ${ranking.year.year}`} />}
                {ranking.halfYear && <RankingTabs ranking={ranking.halfYear} title='ranking półroczny' />}
                {ranking.quarter && <RankingTabs ranking={ranking.quarter} title='ranking kwartalny' />}
                {ranking.month && <RankingTabs ranking={ranking.month} title='ranking miesięczny' />}
                {ranking.week && <RankingTabs ranking={ranking.week} title='ranking tygodniowy' />} */}
            </Grid>
            <DialogMessage open={error} close={closeErrorMessage} messages={['Wystąpił błąd podczas pobierania rankingu']} />
        </Grid >
    );
};
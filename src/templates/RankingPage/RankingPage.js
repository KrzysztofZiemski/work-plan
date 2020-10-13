import React, { useState } from 'react';
import { Card, Grid, Typography } from '@material-ui/core';
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
//TODO dostosować do różnych period
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
            .catch(err => {
                setIsSubmiting(false)
                setError(true);
            });
    }

    // const handleGetRankingWeek = (date) => handleGetRanking(date.start, rankingTypes.WEEK)
    // const handleGetRankingMonth = (date) => handleGetRanking(date.start, rankingTypes.MONTH)
    //rankingName
    //counterForRankingType
    //wybranie 1 stycznia nie działa
    // const renderTitleRankingTable = (type, period) => {
    //     let title;

    //     switch (type) {
    //         case rankingTypes.WEEK:
    //             const dates = getWeekFromPeriod(period);
    //             return `${getDateToShow(dates.start)} - ${getDateToShow(dates.end)} - (${period} TYDZIEŃ)`
    //         default:
    //             return 'RANKING - BRAK'
    //     }

    // }
    return (
        <Grid className={classes.root}>
            {/* <Grid container className={classes.tables}>
                <Grid className={classes.tableContainer}>
                    <Typography variant='h2' className={classes.rankingTableHeader}> Ranking Tygodniowy</Typography>
                    <Grid className={classes.rankingTable}>
                        <Card>
                            <DateSelectWeek isSubmiting={isSubmiting} submit={handleGetRankingWeek} />
                        </Card>
                        <RankingTabs ranking={ranking.week}
                            title={ranking.week ? renderTitleRankingTable(ranking.week.rankingName, ranking.week.counterForRankingType) : 'BRAK'}
                        />
                    </Grid>
                </Grid>
                <Grid className={classes.rankingTable}>
                    <Card>
                        <DateSelectWeek isSubmiting={isSubmiting} submit={handleGetRankingMonth} />
                    </Card>
                    <RankingTabs ranking={ranking.month}
                        title={ranking.month ? renderTitleRankingTable(ranking.month.rankingName, ranking.month.counterForRankingType) : 'RANKING MIESIĘCZNY - BRAK'}
                    />
                </Grid>
            </Grid> */}
            <HeaderPage title='Ranking'></HeaderPage>
            <Grid>
                <RankingPanel isSubmiting={isSubmiting} submit={handleGetRanking} />
            </Grid>
            <Grid container className={classes.tables}>
                {ranking.year && <RankingTabs ranking={ranking.year} title={`ranking roczny za ${ranking.year.year}`} />}
                {ranking.halfYear && <RankingTabs ranking={ranking.halfYear} title='ranking półroczny' />}
                {ranking.quarter && <RankingTabs ranking={ranking.quarter} title='ranking kwartalny' />}
                {ranking.month && <RankingTabs ranking={ranking.month} title='ranking miesięczny' />}
                {ranking.week && <RankingTabs ranking={ranking.week} title='ranking tygodniowy' />}
            </Grid>
            <DialogMessage open={error} close={closeErrorMessage} messages={['Wystąpił błąd podczas pobierania rankingu']} />
        </Grid >
    );
};
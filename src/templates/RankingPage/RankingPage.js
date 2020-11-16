import React, { useState } from 'react';
// import { Card, Grid, Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// import useRanking, { rankingTypes } from '../../hooks/useRanking';
// import RankingTabs from './RankingTabs';
// import DateSelectWeek from '../../components/DateSelectWeek';
// import RankingPanel from './RankingPanel';
// import DialogMessage from '../../components/DialogMessage';
import HeaderPage from '../../components/HeaderPage';
// import { getWeekFromPeriod, getDateToShow } from './../../helpers/dateHelper';
import RankingTypeTable from './RankingTypeTable';
import useRanking, { rankingTypes } from '../../hooks/useRanking';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '10px 20px'
    },
    tables: {
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    },
    table: {
        margin: `50px`,
        minHeight: 600
    }
}));
//TODO dostosować do różnych period
export const RankingPage = () => {

    const classes = useStyles();

    const [ranking, getRanking] = useRanking();


    return (
        <Grid className={classes.root}>
            <HeaderPage title='Ranking'></HeaderPage>
            <Grid container className={classes.tables}>
                <Grid className={classes.table}>
                    <RankingTypeTable
                        title='RANKING TYGODNIOWY'
                        ranking={ranking.week}
                        get={getRanking}
                    />
                </Grid>
                {/* <Grid className={classes.table}>
                    <RankingTypeTable
                        title='RANKING MIESIĘCZNY'
                    />
                </Grid>
                <Grid className={classes.table}>
                    <RankingTypeTable
                        title='RANKING KWARTALNY'
                    />
                </Grid>
                <Grid className={classes.table}>
                    <RankingTypeTable
                        title='RANKING PÓŁROCZNY'
                    />
                </Grid>
                <Grid className={classes.table}>
                    <RankingTypeTable
                        title='RANKING ROCZNY'
                    />
                </Grid> */}
            </Grid>

        </Grid >
    );
};
import React, { useMemo } from 'react';
import RankingTable from './RankingTable';
import TabBars from '../../../components/TabBars';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(({
    root: {
        width: 685,
        margin: 20
    },
    title: {
        textAlign: 'center',
        color: '#f3f3f3',
        backgroundColor: '#222D32',
        padding: 10,
    },
    rankingTables: {
        margin: 0
    }
}))

const headersTab = ['generalny', 'pierwsze stanowisko', 'drugie stanowisko', 'trzecie stanowisko'];

export const RankingTabs = ({ ranking, title }) => {

    const classes = useStyles()
    const components = useMemo(() => {
        return [
            <RankingTable ranking={ranking.generalRanking} name='Ranking generalny' />,
            <RankingTable ranking={ranking.firstWorkplaceRanking} name='Ranking pierwszego stanowiska' />,
            <RankingTable ranking={ranking.secondWorkplaceRanking} name='Ranking drugiego stanowiska' />,
            <RankingTable ranking={ranking.thirdWorkplaceRanking} name='Ranking trzeciego stanowiska' />,
        ]
    }, [ranking]);

    return (
        <Grid className={classes.root}>
            {title ? <h1 className={classes.title}>{title.toUpperCase()}</h1> : null}
            <TabBars className={classes.rankingTables} headers={headersTab} components={components} />
        </Grid>
    );
};


RankingTabs.defaultProps = {
    ranking: {
        firstWorkplaceRanking: [],
        generalRanking: [],
        secondWorkplaceRanking: [],
        thirdWorkplaceRanking: [],
        rankingName: "",
    }
}


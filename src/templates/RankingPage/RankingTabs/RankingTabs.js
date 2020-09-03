import React, { useMemo } from 'react';
import RankingTable from './RankingTable';
import TabBars from '../../../components/TabBars';

const headersTab = ['generalny', 'pierwsze stanowisko', 'drugie stanowisko', 'trzecie stanowisko'];

export const RankingTabs = ({ ranking, title }) => {
    const components = useMemo(() => {
        return [
            <RankingTable ranking={ranking.generalRanking} name='Ranking generalny' />,
            <RankingTable ranking={ranking.firstWorkplaceRanking} name='Ranking pierwszego stanowiska' />,
            <RankingTable ranking={ranking.secondWorkplaceRanking} name='Ranking drugiego stanowiska' />,
            <RankingTable ranking={ranking.thirdWorkplaceRanking} name='Ranking trzeciego stanowiska' />,
        ]
    }, [ranking]);

    return (
        <div>
            <h1>{title.toUpperCase()}</h1>
            <TabBars headers={headersTab} components={components} />
        </div>
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


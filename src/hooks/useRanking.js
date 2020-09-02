import { useState, useEffect, useRef } from 'react';
import * as rankingApi from '../services/rankingApi'
import { rankingTypes } from '../utils/conts';

const useRanking = () => {
    const ref = useRef()

    const [yearRanking, setYearRanking] = useState();
    const [halfYearRanking, setHalfYearRanking] = useState();
    const [quarterRanking, setQuarterYearRanking] = useState();
    const [monthRanking, setMonthRanking] = useState();
    const [weekRanking, setWeekRanking] = useState();

    const [isError, setIsError] = useState(false);

    useEffect(() => {
        ref.current = true;
        return () => ref.current = false;
    }, []);

    const closeError = () => setIsError(false);

    const setRankingByTypes = (ranking, type) => {
        switch (type) {
            case rankingTypes.YEAR:
                return setYearRanking(ranking);
            case rankingTypes.HALF_YEAR:
                return setHalfYearRanking(ranking);
            case rankingTypes.QUARTER:
                return setQuarterYearRanking(ranking);
            case rankingTypes.MONTH:
                return setMonthRanking(ranking);
            case rankingTypes.WEEK:
                return setWeekRanking(ranking);
            default:
                setYearRanking(ranking);
        }
    }
    const getReport = async (date, type) => {
        try {
            switch (type) {
                case rankingTypes.YEAR:
                    return rankingApi.getYear(date);
                case rankingTypes.HALF_YEAR:
                    console.log('weszło')
                    return rankingApi.getHalfYear(date)
                case rankingTypes.QUARTER:
                    return rankingApi.gerQuater(date)
                case rankingTypes.MONTH:
                    return rankingApi.getMonth(date)
                case rankingTypes.WEEK:
                    return rankingApi.getWeek(date)
                default:
                    return rankingApi.getYear(date);
            }
        } catch (err) {

        };
    };

    const handleGetRanking = (date, type) => {
        getReport(date, type).then(ranking => {
            if (ref.current) setRankingByTypes(ranking, type)
        })
            .catch(status => {
                if (ref.current) setIsError(true);
            })
    };
    return [{
        year: yearRanking,
        halfYear: halfYearRanking,
        quarter: quarterRanking,
        month: monthRanking,
        week: weekRanking,
    }, handleGetRanking, { isError, close: closeError }]
};

export { rankingTypes };
export default useRanking;
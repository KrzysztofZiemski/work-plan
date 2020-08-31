import { useState, useEffect, useRef } from 'react';
import * as rankingApi from '../services/rankingApi'
import { rankingTypes } from '../conts';

const useRanking = () => {
    const ref = useRef()
    const [ranking, setRanking] = useState({
        [rankingTypes.YEAR]: [],
        [rankingTypes.HALF_YEAR]: [],
        [rankingTypes.QUARTER]: [],
        [rankingTypes.MONTH]: [],
        [rankingTypes.WEEK]: [],
    });
    const [date, setDate] = useState(null);
    const [error, setError] = useState({
        isError: false,
        errorStatus: null
    });
    useEffect(() => {
        ref.current = true;
        return () => ref.current = false;
    }, []);

    const closeError = () => setError({ isError: false, errorStatus: null });

    const getReport = (date, type) => {
        switch (type) {
            case rankingTypes.YEAR:
                return rankingApi.getYear(date);
            case rankingTypes.HALF_YEAR:
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
    }

    const handleGetRanking = (date, type) => {
        getReport(date, type).then(ranking => {
            if (ref.current) setRanking(state => ({ ...state, [type]: ranking }));
        })
            .catch(status => {
                if (ref.current) setError({ isError: true, errorStatus: status })
            })
    };


    return [ranking, { get: handleGetRanking, types: rankingTypes }]
};

export default useRanking;
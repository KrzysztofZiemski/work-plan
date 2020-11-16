import { useContext } from 'react';
import * as rankingApi from '../services/rankingApi';
import { rankingTypes } from '../utils/conts';
import { RankingContext } from '../Contexts';
//RankingContext
const useRanking = () => {
    const { yearRanking, halfYearRanking, quarterRanking, monthRanking, weekRanking, setYearRanking, setHalfYearRanking, setQuarterYearRanking, setMonthRanking, setWeekRanking } = useContext(RankingContext);

    // const [yearRanking, setYearRanking] = useState();
    // const [halfYearRanking, setHalfYearRanking] = useState();
    // const [quarterRanking, setQuarterYearRanking] = useState();
    // const [monthRanking, setMonthRanking] = useState();
    // const [weekRanking, setWeekRanking] = useState();

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
    const getReport = (date, type) => {

        switch (type) {
            case rankingTypes.YEAR:
                return rankingApi.createYear(date);
            case rankingTypes.HALF_YEAR:
                return rankingApi.createHalfYear(date)
            case rankingTypes.QUARTER:
                return rankingApi.createQuater(date)
            case rankingTypes.MONTH:
                return rankingApi.createMonth(date)
            case rankingTypes.WEEK:
                return rankingApi.createWeek(date)
            default:
                return rankingApi.getYear(date);
        }
    };

    const handleGetRanking = (date, type) => {
        return getReport(date, type).then(ranking => {
            console.log(ranking)
            setRankingByTypes(ranking, type);
            return Promise.resolve();

        })
    };
    return [{
        year: yearRanking,
        halfYear: halfYearRanking,
        quarter: quarterRanking,
        month: monthRanking,
        week: weekRanking,
    }, handleGetRanking]
};

export { rankingTypes };
export default useRanking;
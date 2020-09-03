import React, { useEffect, useState } from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useRanking from '../../hooks/useRanking';
import { rankingTypes } from '../../utils/conts';
import RankingTabs from './RankingTabs';
import DateTimePicker from '../../components/DateTimePicker';



const useStyles = makeStyles((theme) => ({
    root: {
    },
    datePicer: {
        width: '100%'
    }
}));

export const RankingPage = () => {
    const [ranking, getRanking, error] = useRanking();
    const [date, setDate] = useState();
    const [rankingType, setRankingTyle] = React.useState(rankingTypes.YEAR);
    const classes = useStyles();

    console.log(ranking)
    const handleChangeType = (event) => {
        setRankingTyle(event.target.value);
    };

    useEffect(() => {
        getRanking(new Date(), rankingType);
    }, [rankingType])
    // name = '', date, setDate, className
    return (
        <Grid className={classes.root}>
            <Grid>
                <DateTimePicker date={date} setDate={setDate} className={classes.datePicer} />
                <FormControl className={classes.formControl}>
                    <InputLabel>Typ rankingU</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={rankingType}
                        onChange={handleChangeType}
                    >
                        <MenuItem value={rankingTypes.YEAR}>ranking roczny</MenuItem>
                        <MenuItem value={rankingTypes.HALF_YEAR}>ranking półroczny</MenuItem>
                        <MenuItem value={rankingTypes.QUARTER}>ranking kwartalny</MenuItem>
                        <MenuItem value={rankingTypes.MONTH}>ranking miesięczny</MenuItem>
                        <MenuItem value={rankingTypes.WEEK}>ranking tygodniowy</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            {rankingType === rankingTypes.YEAR && <RankingTabs ranking={ranking.year} title='ranking roczny' />}
            {/* {rankingType === rankingTypes.QUARTER && <RankingTabs ranking={ranking.quarter} title='ranking roczny' />}
            {rankingType === rankingTypes.MONTH && <RankingTabs ranking={ranking.month} title='ranking roczny' />}
            {rankingType === rankingTypes.WEEK && <RankingTabs ranking={ranking.week} title='ranking roczny' />} */}

        </Grid>
    );
};
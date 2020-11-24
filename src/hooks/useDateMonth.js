import { useState } from 'react';
// import { getStartEndWeek, getWeekNumber } from '../helpers/dateHelper';

const getStartEndMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0);
    return [start, end];
}

const handleSetDates = (date) => {
    const [start, end] = getStartEndMonth(new Date());
    const numberPeriod = start.getMonth() + 1;
    return { start, end, numberPeriod }
}

export const useDateMonth = () => {
    //ogranicznie końca początku roku
    let [dates, setDate] = useState(handleSetDates(new Date()));

    const handleChange = (pickedDate) => setDate(handleSetDates(new Date(pickedDate)))

    return [dates, handleChange];
}
import { useState } from 'react';
import { getStartEndWeek, getWeekNumber } from '../helpers/dateHelper';



export const useDateWeek = () => {
    //ogranicznie końca początku roku
    let [date, setDate] = useState(() => {
        const [start, end] = getStartEndWeek(new Date());
        const numberWeek = getWeekNumber(new Date());
        return { start, end, numberWeek }
    });

    const handleChange = (pickedDate) => {
        const [start, end] = getStartEndWeek(pickedDate);
        const numberWeek = getWeekNumber(start);
        setDate({ start, end, numberWeek });
    }
    return [date, handleChange];
}
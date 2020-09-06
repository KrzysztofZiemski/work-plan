import { useState } from 'react';
import { subtractionDate, additionDays } from '../helpers/dateHelper';

const handleChangeDate = (date) => {
    const day = new Date(date).getDay();
    let start;
    let end;

    if (day === 0) {
        start = date;
        end = additionDays(6, date);
    } else if (day === 1) {
        start = subtractionDate(day - 1, date);
        end = additionDays(5, date);
    } else {
        start = subtractionDate(day, date);
        end = additionDays(6 - day, date);
    }
    return [start, end];
}

export const useDateWeek = () => {

    let [date, setDate] = useState(() => {
        const [start, end] = handleChangeDate(new Date(Date.now()));
        return { start, end }
    });

    const handleChange = (pickedDate) => {
        const [start, end] = handleChangeDate(pickedDate);
        setDate({ start, end });
    }
    return [date, handleChange];
}
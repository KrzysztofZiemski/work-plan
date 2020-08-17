import { useState } from 'react';
import { subtractionDate, additionDays } from '../helpers/dateHelper';

const handleChangeDate = (date) => {
    const day = new Date(date).getDay();
    let start;
    let end;
    if (day === 0) {
        start = subtractionDate(6, date);
        end = date
    }
    if (day === 1) {
        start = date;
        end = additionDays(6, date);
    } else {
        start = subtractionDate(day - 1, date);
        end = additionDays(7 - day, date);
    }

    return [start, end];
}
export const useDateWeek = (pickedDate) => {
    let [date, setDate] = useState({ start: new Date(Date.now()), end: new Date(Date.now()) });

    const handleChange = (pickedDate) => {
        const [start, end] = handleChangeDate(pickedDate);
        setDate({ start, end });
    }
    return [date, handleChange];
}
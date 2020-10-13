import { rankingTypes } from '../utils/conts';

export const getCorrectlyFormatData = (date) => {
    const dateToConvert = new Date(date);
    const year = dateToConvert.getFullYear();
    const month = dateToConvert.getMonth() + 1 < 10 ? `0${dateToConvert.getMonth() + 1}` : dateToConvert.getMonth() + 1;
    const day = dateToConvert.getDate() < 10 ? `0${dateToConvert.getDate()}` : dateToConvert.getDate();
    const hours = dateToConvert.getHours() < 10 ? `0${dateToConvert.getHours()}` : dateToConvert.getHours();
    const minutes = dateToConvert.getMinutes() < 10 ? `0${dateToConvert.getMinutes()}` : dateToConvert.getMinutes();
    return `${year}-${month}-${day}-${hours}:${minutes}`
};

export const subtractionDate = (countDays = 0, date) => {
    const subtractionMilliseconds = countDays * 24 * 60 * 60 * 1000;
    const dateStart = date ? new Date(date).getTime() : Date.now();
    return new Date(dateStart - subtractionMilliseconds);
};

export const additionDays = (countDays = 0, date) => {
    const additionMilliseconds = countDays * 24 * 60 * 60 * 1000;
    const dateStart = date ? new Date(date).getTime() : Date.now();
    return new Date(dateStart + additionMilliseconds);
};

export const getDateToShow = date => {
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}.${month}.${year}`
}

export const getPeriodsList = (periodType = rankingTypes.WEEK, year = 2020) => {
    const output = [];
    let count = 1;
    switch (periodType) {
        case rankingTypes.MONTH:
            for (let i = 0; i < 12; i++) {
                const start = new Date(year, i, 1)
                const end = new Date(new Date(year, i + 1, 1) - 86400000);
                output.push({ start, end, number: i + 1 });
            }
            break;
        case rankingTypes.QUARTER:
            for (let i = 0; i < 12; i = i + 3) {
                const start = new Date(year, i, 1)
                const end = new Date(new Date(year, i + 3, 1) - 86400000);
                output.push({ start, end, number: count });
                count++
            }
            break;
        case rankingTypes.HALF_YEAR:
            for (let i = 0; i < 12; i = i + 6) {
                const start = new Date(year, i, 1)
                const end = new Date(new Date(year, i + 6, 1) - 86400000);
                output.push({ start, end, number: count });
                count++
            }
            break
        case rankingTypes.YEAR:
            output.push({ start: new Date(year, 0, 1), end: new Date(year, 11, 31), number: 1 });
            break
        default:
            //for week
            let [start, end] = getDateFromWeekNumber(1, 2020);
            const lastYearDay = new Date(year, 11, 31);
            output.push({ start: new Date(year, 0, 1), end, number: 1 });
            for (let i = 2; i <= 53; i++) {
                start = additionDays(7, start);
                end = additionDays(6, start);
                if (end.getFullYear() > year) end = lastYearDay;

                output.push({ start, end, number: i });
                if (lastYearDay === end) break;
            }
    }
    return output;
}

export const getDateFromWeekNumber = (weekNumber, year) => {
    const startYear = new Date(year, 0, 1);
    // const endYear = new Date(year, 11, 31);

    const start = new Date(startYear.getTime() + (weekNumber - 1) * 86400000 * 7 - startYear.getDay() * 86400000);
    const end = additionDays(6, start);
    return [start, end];
};

export const getWeekNumber = (date) => {
    const startYear = new Date(date.getFullYear(), 0, 1);
    return Math.ceil((((date - startYear) / 86400000) + startYear.getDay() + 1) / 7);
};

export const getQuarterNumber = (date) => Math.ceil((date.getMonth() + 1) / 3);

export const getHalfYearNumber = (date) => Math.ceil((date.getMonth() + 1) / 6);

export const getWeekFromPeriod = (period, year = new Date().getFullYear()) => {

    if (period < 1) return;
    const oneDay = 1000 * 60 * 60 * 24;

    const startFirstWeek = new Date(year, 0, 1);
    const endFirstWeek = new Date(startFirstWeek.getTime() + (6 - startFirstWeek.getDay()) * oneDay);

    if (period === 1) {
        return {
            start: startFirstWeek,
            end: endFirstWeek,
        }
    }
    const start = additionDays((period - 1) * 7, subtractionDate(startFirstWeek.getDay(), startFirstWeek))
    let end = additionDays((period - 1) * 7, endFirstWeek);
    if (end.getFullYear() > year) end = new Date(year, 11, 31);
    return {
        start,
        end
    }
};

const setStartDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);

export const getStartEndWeek = (date) => {
    const actuallyDate = new Date(date)
    const day = actuallyDate.getDay();
    let start;
    let end;

    if (day === 0) {
        start = date;
        end = additionDays(6, date);
    } else if (day === 1) {
        start = subtractionDate(1, date);
        end = additionDays(5, date);
    } else {
        start = subtractionDate(day, date);
        end = additionDays(6 - day, date);
    }
    if (start.getFullYear() < actuallyDate.getFullYear()) start = new Date(actuallyDate.getFullYear(), 0, 1);
    if (end.getFullYear() > actuallyDate.getFullYear()) end = new Date(actuallyDate.getFullYear(), 11, 31);

    return [setStartDay(start), setStartDay(end)];
};
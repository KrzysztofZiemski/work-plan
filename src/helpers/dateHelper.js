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

export const getWeekNumber = (date) => {
    const startYear = new Date(date.getFullYear(), 0, 1);
    return Math.ceil((((date - startYear) / 86400000) + startYear.getDay()) / 7)
};

export const getQuarterNumber = (date) => Math.ceil((date.getMonth() + 1) / 3);

export const getHalfYearNumber = (date) => Math.ceil((date.getMonth() + 1) / 6);

export const getWeekFromPeriod = (period, year = new Date().getFullYear()) => {

    const oneDay = 1000 * 60 * 60 * 24;

    const startFirstWeek = new Date(year, 0, 1);
    const endFirstWeek = new Date(startFirstWeek.getTime() + (6 - startFirstWeek.getDay()) * oneDay);

    if (period === 0) {
        return {
            start: startFirstWeek,
            end: endFirstWeek,
        }
    }
    const start = additionDays(period * 7, subtractionDate(startFirstWeek.getDay(), startFirstWeek))
    const end = additionDays(period * 7, endFirstWeek);
    return {
        start,
        end
    }
}
export const getCorrectlyFormatData = (date) => {
    const dateToConvert = new Date(date);
    const year = dateToConvert.getFullYear();
    const month = dateToConvert.getMonth() + 1 < 10 ? `0${dateToConvert.getMonth() + 1}` : dateToConvert.getMonth() + 1;
    const day = dateToConvert.getDate() < 10 ? `0${dateToConvert.getDate()}` : dateToConvert.getDate();
    const hours = dateToConvert.getHours() < 10 ? `0${dateToConvert.getHours()}` : dateToConvert.getHours();
    const minutes = dateToConvert.getMinutes() < 10 ? `0${dateToConvert.getMinutes()}` : dateToConvert.getMinutes();
    return `${year}-${month}-${day}-${hours}:${minutes}`
}

export const subtractionDate = (countDays = 0, date) => {
    const subtractionMilliseconds = countDays * 24 * 60 * 60 * 1000;
    const dateStart = date ? new Date(date).getTime() : Date.now();
    return new Date(dateStart - subtractionMilliseconds);
}
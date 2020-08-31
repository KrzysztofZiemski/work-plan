import { SERVER } from '../config';
import { getWeekNumber, getQuarterNumber, getHalfYearNumber } from '../helpers/dateHelper';

const RANKING = `${SERVER}/api/v1/ranking`;

const fetchCreate = (URL, year, period) => {
    const data = {
        dateRangeNumber: period,
        year: year,
    }
    return fetch.post(`${RANKING}/${URL}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => {
        if (res.ok) return res.json();
        return Promise.reject(res.status);
    })
};

const fetchGet = (URL) => fetch(`${RANKING}/${URL}`).then(res => {
    if (res.ok) return res.json();
    return Promise.reject(res.status);
});


export const createWeek = (date) => fetchCreate('week', date.getFullYear(), getWeekNumber(date));

export const createMonth = (date) => fetchCreate('month', date.getFullYear(), date.getMonth() + 1);

export const createQuater = (date) => fetchCreate('quarter', date.getFullYear(), getQuarterNumber(date));

export const createHalfYear = (date) => fetchCreate('halfYear', date.getFullYear(), getHalfYearNumber(date));

export const createYear = () => (date) => fetchCreate('year', date.getFullYear(), date.getFullYear());

export const getWeek = (date) => fetchGet(`year/${date.getFullYear()}/week/${getWeekNumber(date)}`);

export const getMonth = (date) => fetchGet(`year/${date.getFullYear()}/month/${date.getMonth() + 1}`);

export const gerQuater = (date) => fetchGet(`year/${date.getFullYear()}/quarter/${getQuarterNumber(date)}`);

export const getHalfYear = (date) => fetchGet(`year/${date.getFullYear()}/halfYear/${getHalfYearNumber(date)}`);

export const getYear = (date) => fetchGet(`year/${date.getFullYear()}`);
import { SERVER } from '../config';
import { getWeekNumber, getQuarterNumber, getHalfYearNumber } from '../helpers/dateHelper';

const RANKING = `${SERVER}/api/v1/ranking`;

const fetchCreate = (URL, year, period) => {
    const data = {
        dateRangeNumber: period,
        year: year,
    }
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'include',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    return fetch(`${RANKING}/${URL}`, options).then(res => {
        if (res.ok) return res.json();
        return Promise.reject(res.status);
    })
};

const fetchGet = (URL) => {
    const options = {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    return fetch(`${RANKING}/${URL}`).then(res => {
    if (res.ok) return res.json();
    return Promise.reject(res.status);
});
}

export const createWeek = (date) => fetchCreate('week', date.getFullYear(), getWeekNumber(date));

export const createMonth = (date) => fetchCreate('month', date.getFullYear(), date.getMonth() + 1);

export const createQuater = (date) => fetchCreate('quarter', date.getFullYear(), getQuarterNumber(date));

export const createHalfYear = (date) => fetchCreate('halfYear', date.getFullYear(), getHalfYearNumber(date));

export const createYear = (date) => fetchCreate('year', date.getFullYear(), date.getFullYear());


export const getWeek = (date) => fetchGet(`year/${date.getFullYear()}/week/${getWeekNumber(date)}`);

export const getMonth = (date) => fetchGet(`year/${date.getFullYear()}/month/${date.getMonth() + 1}`);

export const gerQuater = (date) => fetchGet(`year/${date.getFullYear()}/quarter/${getQuarterNumber(date)}`);

export const getHalfYear = (date) => fetchGet(`year/${date.getFullYear()}/halfYear/${getHalfYearNumber(date)}`);

export const getYear = (date) => fetchGet(`year/${date.getFullYear()}`);
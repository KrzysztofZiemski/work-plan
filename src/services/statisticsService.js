import axios from '../utils/axios';
import { SERVER } from '../config';
const SERVER_STATISTICS = `${SERVER}/api/v1/statistic-report`;
const options = {
    averagePerHour: 'averagePerHour',
    percentage: 'percentage',
    averageSpeed: 'averageSpeed',
    totalProduced: 'totalProduced',
    firstWorkplace: 'firstWorkplace',
    secondWorkplace: 'secondWorkplace',
    thirdWorkplace: 'thirdWorkplace',
    product: 'product',
    line: 'line',
    series: 'series'
}

const create = ({ start, end, idItems, type, options }) => {
    if (!start || !end || !idItems || !type) return Promise.reject('Błąd wysłania zapytania - niewystarczające dane');

    const data = {
        start, end, idItems, type, options: options ? options : {}
    }
    return axios.post(`${SERVER_STATISTICS}/circleChart`, JSON.stringify(data))
        .then(res => res.data)
        .catch(err => Promise.reject(err.response.status));
}
const getOptions = () => {
    return axios.get(`${SERVER_STATISTICS}/options`)
        .then(res => res.data)
        .catch(err => Promise.reject(err.response));
}

export default { create, getOptions, options };
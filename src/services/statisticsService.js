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
    const data = {
        start, end, idItems, type, options: options ? options : {}
    }
    return axios.post(`${SERVER_STATISTICS}`, JSON.stringify(data))
        .then(res => res.data)
        .catch(err => Promise.reject(err.response.status));
}
const createCircle = ({ start, end, idItems, type, options }) => {
    const defaultOptions = {
        totalProduced: true,
        averageSpeed: true,
        percentage: true,
        averagePerHour: true,
    }
    const data = {
        end, idItems: idItems, options: { ...defaultOptions, ...options }, start: start, type: type,
    }
    console.log(data)
    return axios.post(`${SERVER_STATISTICS}/circleChart`, JSON.stringify(data))
        .then(res => res.data)
        .catch(err => Promise.reject(err.response.status));
}

const getOptions = () => {
    return axios.get(`${SERVER_STATISTICS}/options`)
        .then(res => res.data)
        .catch(err => Promise.reject(err.response));
}

export default { create, getOptions, options, createCircle };
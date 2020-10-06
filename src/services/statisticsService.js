import axios from '../utils/axios';
import { SERVER } from '../config';
import { getCorrectlyFormatData } from '../helpers/dateHelper';
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
const getProductsInReports = ({ id, start, end, type = 'LINE', options = {} }) => {
    const data = {
        start: getCorrectlyFormatData(start),
        end: getCorrectlyFormatData(end),
        idItems: Array.isArray(id) ? id : [id],
        type,
        options
    }

    return axios.post(`${SERVER_STATISTICS}/products`, JSON.stringify(data))
        .then(res => res.data)
        .catch(err => Promise.reject(err.response.status));
}
const create = ({ start, end, id, type, options = {} }) => {
    const defaultOptions = {
        totalProduced: true,
        averageSpeed: true,
        percentage: true,
        averagePerHour: true,
    }

    const data = {
        start: getCorrectlyFormatData(start),
        end: getCorrectlyFormatData(end),
        idItems: id,
        type,
        options: { ...defaultOptions, ...options }
    }
    return axios.post(`${SERVER_STATISTICS}`, JSON.stringify(data))
        .then(res => res.data)
        .catch(err => Promise.reject(err.response.status));
}
const createCircle = ({ start, end, id, type, options = {} }) => {
    const defaultOptions = {
        totalProduced: true,
        averageSpeed: true,
        percentage: true,
        averagePerHour: true,
    }
    const data = {
        end: getCorrectlyFormatData(end),
        idItems: Array.isArray(id) ? id : [id],
        options: { ...defaultOptions, ...options },
        start: getCorrectlyFormatData(start),
        type,
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

export default { create, getOptions, options, createCircle, getProductsInReports };


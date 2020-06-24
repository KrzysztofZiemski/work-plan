import { SERVER } from '../config';
import axios from '../utils/axios';

const WORKERS_URL = '/api/v1/employee';
const FILTER_FALSE = '?filterIsActive=false';

export const getEmployeesByActive = (active = true) => {
    const URL = active ? WORKERS_URL : `${WORKERS_URL + FILTER_FALSE}`;
    return axios.get(URL)
        .then(res => {
            if (res.status === 200) return res.json();
            return Promise.reject(res.status);
        });
};

export const getAllEmployee = async () => {
    try {
        const activeEmployees = await axios.get(WORKERS_URL)
            .then(res => {
                if (res.status === 200) return res.json();
                return Promise.reject(res.status);
            });
        const inActiveEmployees = await axios.get(`${WORKERS_URL + FILTER_FALSE}`)
            .then(res => {
                if (res.status === 200) return res.json();
                return Promise.reject(res.status);
            });
        return Promise.resolve([...activeEmployees, ...inActiveEmployees]);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const addWEmployee = (data) => {
    return axios.post(WORKERS_URL, JSON.stringify(data))
        .then(res => {
            if (res.ok) return res.json();
            return Promise.reject(res.status);
        });
};

export const deleteEmployee = (id) => {
    return axios.delete(`${WORKERS_URL}/${id}`)
        .then(res => {
            if (res.status === 200) return res.json();
            Promise.resolve();
        });
};

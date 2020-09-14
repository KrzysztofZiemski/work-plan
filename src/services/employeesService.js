import axios from '../utils/axios';

const WORKERS_URL = '/api/v1/employee';
const FILTER_FALSE = '?filterIsActive=false';

export const getEmployeesByActive = (active = true) => {
    const URL = active ? WORKERS_URL : WORKERS_URL + FILTER_FALSE;
    return axios.get(URL)
        .then(res => res.data)
        .catch(err => Promise.reject(err));
};

export const updateEmployee = (id, data) => {
    return axios.put(`${WORKERS_URL}/${id}`, JSON.stringify(data))
        .then(res => res.data)
        .catch(err => Promise.reject(err))
};

export const getAllEmployee = async () => {
    try {
        const activeEmployees = await axios.get(WORKERS_URL)
            .then(res => res.data)
            .catch(err => Promise.reject(err));

        const inActiveEmployees = await axios.get(WORKERS_URL + FILTER_FALSE)
            .then(res => res.data)
            .catch(err => Promise.reject(err));

        return Promise.resolve([...activeEmployees, ...inActiveEmployees]);

    } catch (err) {
        return Promise.reject(err);
    }
};

export const addWEmployee = (data) => {
    return axios.post(WORKERS_URL, JSON.stringify(data))
        .then(res => res.data)
        .catch(err => Promise.reject(err));
};

export const deleteEmployee = (id) => {
    return axios.delete(`${WORKERS_URL}/${id}`)
        .then(res => res.data)
        .catch(err => Promise.reject(err));
};

export const getEmployee = id => {
    return axios.get(`${WORKERS_URL}/${id}`)
        .then(res => res.data)
        .catch(err => Promise.reject(err));
}
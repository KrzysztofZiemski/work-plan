import { SERVER } from '../config.json';

const WORKERS_URL = `${SERVER}/api/v1/employee`

const getAllEmployee = () => {
    return fetch(WORKERS_URL, {
        method: 'GET',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',

        }
    })
        .then(res => {
            if (res.status === 200) return res.json();
            return Promise.reject(res.status);
        });
};

const addWEmployee = (name, lastName) => {
    const data = {
        lastName,
        name
    }
    return fetch(WORKERS_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
};


export {
    getAllEmployee, addWEmployee
}
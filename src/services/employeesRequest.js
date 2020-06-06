import { SERVER } from '../config';

const WORKERS_URL = `${SERVER}/api/v1/employee`

const getAllEmployee = () => {
    return fetch(WORKERS_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
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
const deleteEmployee = (id) => {
    return fetch(`${WORKERS_URL}/${id}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => {
        if (res.status === 200) return res.json();
        console.log('res', res)
        Promise.resolve()
    })
}

export {
    getAllEmployee, addWEmployee, deleteEmployee
}
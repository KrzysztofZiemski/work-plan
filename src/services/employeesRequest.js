import { SERVER } from '../config';

const WORKERS_URL = `${SERVER}/api/v1/employee`

export const getEmployeesByActive = (active = true) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }
    const URL = active ? WORKERS_URL : `${WORKERS_URL}?filterIsActive=false`;
    return fetch(URL, options)
        .then(res => {
            if (res.status === 200) return res.json();
            return Promise.reject(res.status);
        });
};

export const getAllEmployee = async () => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }
    try {
        const activeEmployees = await fetch(WORKERS_URL, options)
            .then(res => {
                if (res.status === 200) return res.json();
                return Promise.reject(res.status);
            });
        const inActiveEmployees = await fetch(`${WORKERS_URL}?filterIsActive=false`, options)
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
    return fetch(WORKERS_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(res => {
        if (res.ok) return res.json();
        return Promise.reject(res.status);
    })
};
export const deleteEmployee = (id) => {
    return fetch(`${WORKERS_URL}/${id}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => {
        if (res.status === 200) return res.json();
        Promise.resolve()
    })
}

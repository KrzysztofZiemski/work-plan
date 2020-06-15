import { SERVER } from '../config';

const WORKERS_URL = `${SERVER}/api/v1/employee`

export const employeeStatus = {
    active: 'active',
    inActive: 'inActive',
    all: 'all'
}

export const getAllEmployee = async (status = employeeStatus.active) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }

    if (status !== employeeStatus.all) {
        const URL = status === employeeStatus.inActive ? `${WORKERS_URL}?filterIsActive=false` : WORKERS_URL;
        return fetch(URL, options)
            .then(res => {
                if (res.status === 200) return res.json();
                return Promise.reject(res.status);
            });
    } else {
        try {
            const activeEmployees = await fetch(WORKERS_URL, options)
                .then(res => {
                    if (res.status === 200) return res.json();
                    return Promise.reject(res.status);
                })
            const inActiveEmployees = await fetch(`${WORKERS_URL}?filterIsActive=false`, options)
                .then(res => {
                    if (res.status === 200) return res.json();
                    return Promise.reject(res.status);
                })
            return Promise.resolve([...activeEmployees, ...inActiveEmployees])

        } catch (err) {
            Promise.reject(err);
        }



        // const inActiveEmployeesPromise = fetch(`${URL}?filterIsActive=false}`, options);

    };
}
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

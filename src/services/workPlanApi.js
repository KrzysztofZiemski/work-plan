import { SERVER } from '../config';
import { getCorrectlyFormatData } from './../helpers/dateHelper';

const WORK_PLAN_URL = `${SERVER}/api/v1/work-plan`


const createWorkPlan = (startDate, endDate, userId) => {
    const start = getCorrectlyFormatData(startDate).slice(0, 10);
    const end = getCorrectlyFormatData(endDate).slice(0, 10);
    const data = {
        createByIdUser: 1,
        endDay: end,
        startDay: start
    }

    return fetch(WORK_PLAN_URL, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "*/*"
        },
        body: JSON.stringify(data)
    }).then(res => {
        if (res.status === 200) return res.json();
        return Promise.reject(res.status);
    })
};

const getWorkPlanByDate = (startDate, endDate) => {
    const start = getCorrectlyFormatData(startDate).slice(0, 10);
    const end = getCorrectlyFormatData(endDate).slice(0, 10);

    return fetch(`${WORK_PLAN_URL}/param?start=${start}&end=${end}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "*/*"
        }
    }).then(res => {
        if (res.ok) return res.json();
        return Promise.reject(res.status);
    }).catch(err => Promise.reject(err))
};

const createOrGetWorkPlan = (startDate, endDate, userId) => {

    const start = getCorrectlyFormatData(startDate).slice(0, 10);
    const end = getCorrectlyFormatData(endDate).slice(0, 10);

    return fetch(`${WORK_PLAN_URL}/param?start=${start}&end=${end}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "*/*"
        }
    })
        .then(res => {
            if (res.ok) return res.json();
            if (res.status !== 404) return Promise.reject(res.status);
            return createWorkPlan(startDate, endDate, userId)
        })
};

const updateWorkPlane = (idUser, workPlan) => {
    return fetch(`${WORK_PLAN_URL}/${workPlan.id}/user/${idUser}`, {
        method: 'PUT',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(workPlan)
    })
};

export { createWorkPlan, getWorkPlanByDate, updateWorkPlane, createOrGetWorkPlan }
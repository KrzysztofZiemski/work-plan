import { SERVER } from '../config.json';

const WORK_PLAN_URL = `${SERVER}/api/v1/work-plan`



const createWorkPlan = (startDate, endDate, userId) => {

    const data = {
        createByIdUser: 1,
        endDay: endDate,
        startDay: startDate
    }
    console.log(JSON.stringify(data))
    return fetch(WORK_PLAN_URL, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "*/*"
        },
        body: JSON.stringify(data)
    }).then(res => {
        if (res.status === 200) return res.json();
        return Promise.reject(res.status);
    })
}
const getWorkPlanByDate = (startDate, endDate) => {
    return fetch(`${WORK_PLAN_URL}/param?start=${startDate}&end=${endDate}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "*/*"

        }
    })
}
const updateWorkPlane = (idUser, workPlan) => {
    console.log(workPlan)
    return fetch(`${WORK_PLAN_URL}/${workPlan.id}/user/${idUser}`, {
        method: 'PUT',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(workPlan)
    })
}

export { createWorkPlan, getWorkPlanByDate, updateWorkPlane }
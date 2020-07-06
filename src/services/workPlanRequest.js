import { SERVER } from '../config';

const WORK_PLAN_URL = `${SERVER}/api/v1/work-plan`
// hextl / api / v1 / work - plan / param ? end = 2020.05.31 & start=2020.05.25


const createWorkPlan = (startDate, endDate, userId) => {
    console.log(startDate, endDate)
    const data = {
        createByIdUser: 1,
        endDay: endDate,
        startDay: startDate
    }

    return fetch(WORK_PLAN_URL, {
        method: 'POST',
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
}
const getWorkPlanByDate = (startDate, endDate) => {
    return fetch(`${WORK_PLAN_URL}/param?start=${startDate}&end=${endDate}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
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
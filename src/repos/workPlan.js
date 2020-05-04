import { SERVER } from '../config.json';

const WORK_PLAN_URL = `${SERVER}/api/v1/work-plan`

const getTemplateWorkPlan = (startDate, endDate, userId) => {
            const data = {
                        createdByIdUser: userId,
                        endDay: endDate,
                        startDay: startDate
            }

            return fetch(WORK_PLAN_URL, {
                        method: 'POST',
                        headers: {
                                    'Content-Type': 'application/json',
                                    "Accept": "*/*"
                        },
                        body: JSON.stringify(data)
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
            return fetch(`${WORK_PLAN_URL}?idUser=${idUser}&idWorkPlan=${workPlan.id}`, {
                        method: 'PUT',
                        headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json'
                        },
                        body: JSON.stringify(workPlan)
            })
                        .then(res => {
                                    if (res.status === 200) return res.json();
                                    throw (res.status);

                        })
}

export { getTemplateWorkPlan, getWorkPlanByDate, updateWorkPlane }
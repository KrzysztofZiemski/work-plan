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
                        mode: 'cors',
                        credentials: 'same-origin',
                        headers: {
                                    'Content-Type': 'application/json',

                        },
                        body: JSON.stringify(data)
            })
}
const getWorkPlanByDate = (startDate, endDate) => {
            return fetch(`${WORK_PLAN_URL}/${startDate}/${endDate}`, {
                        method: 'GET',
                        mode: 'cors',
                        credentials: 'same-origin',
                        headers: {
                                    'Content-Type': 'application/json',

                        }
            })
}
export { getTemplateWorkPlan, getWorkPlanByDate }
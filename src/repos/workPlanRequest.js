import { SERVER } from '../config.json';

const WORK_PLAN_URL = `${SERVER}/api/v1/work-plan`


const _changeValuesNumber = (workPlan) => {

    return {
        id: workPlan.id,
        startDay: workPlan.startDay,
        endDay: workPlan.endDay,
        holidaysEmployees: workPlan.holidaysEmployees.map(employee => Number(employee.id)),
        absenceEmployees: workPlan.absenceEmployees.map(employee => Number(employee.id)),
        infoHolidays: workPlan.infoHolidays,
        infoAbsence: workPlan.infoAbsence,
        workShifts: workPlan.workShifts.map(shift => (
            {
                id: shift.id,
                shiftNumber: shift.shiftNumber,
                comments: shift.comments,
                shiftsLeader: shift.shiftsLeader.map(leader => Number(leader.id)),
                unskilledWorker: shift.unskilledWorker.map(unskilledWorker => Number(unskilledWorker.id)),
                supervision: shift.supervision.map(supervision => Number(supervision.id)),
                other: shift.other.map(other => Number(other.id)),
                lines: shift.lines.map(line => (
                    {
                        id: line.id,
                        lineNumber: line.lineNumber,
                        workplaces: line.workplaces.map(workplace => (
                            {
                                id: workplace.id,
                                employeeListWorkplaces: workplace.employeeListWorkplaces.map(employee => Number(employee.id))
                            }

                        ))
                    }
                ))
            }
        ))
    }
}
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
    }).then(res => {
        if (res.status === 200) return res.json();
        return Promise.reject(res.status);
    })
}
const updateWorkPlane = (idUser, workPlan) => {

    return fetch(`${WORK_PLAN_URL}?idUser=${idUser}&idWorkPlan=${workPlan.id}`, {
        method: 'PUT',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(_changeValuesNumber(workPlan))
    })
        .then(res => {
            if (res.status === 200) return res.json();
            throw (Promise.reject(res.status));

        })
}

export { createWorkPlan, getWorkPlanByDate, updateWorkPlane }
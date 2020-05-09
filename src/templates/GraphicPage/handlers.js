export const workPlaceNames = {
    holidays: 'holidaysEmployees',
    absence: 'absenceEmployees',
    leader: 'shiftsLeader',
    supervision: 'supervision',
    other: 'other',
    unskilled: 'unskilledWorker',
    free: null
}

const _isDuplicate = (object1, object2) => {
    if (object1.id === object2.id) return true;
    return false;

}

export const initFreeEmployee = (allEmployee, workPlan, setFreeEmployees) => {
    //usuwamy z pobranych pracowników, pracowników już przydzielonych

    let copy = [...allEmployee];
    workPlan.holidaysEmployees.forEach(holidayEmployee => {
        copy = copy.filter(employee => !_isDuplicate(holidayEmployee, employee))
    })
    workPlan.absenceEmployees.forEach(absenceEmployee => {
        copy = copy.filter(employee => !_isDuplicate(absenceEmployee, employee))
    })
    workPlan.workShifts.forEach(shift => {

        shift.shiftsLeader.forEach(leader => {
            copy = copy.filter(employee => !_isDuplicate(leader, employee));
        })
        shift.supervision.forEach(supervision => {
            copy = copy.filter(employee => !_isDuplicate(supervision, employee));
        })
        shift.unskilledWorker.forEach(unskillerWorker => {
            copy = copy.filter(employee => !_isDuplicate(unskillerWorker, employee));
        })
        shift.other.forEach(other => {
            copy = copy.filter(employee => !_isDuplicate(other, employee));
        })
        shift.lines.forEach(line => {
            line.workplaces.forEach(workplace => {
                workplace.employeeListWorkplaces.forEach(employeeWorkPlace => {
                    copy = copy.filter(employee => !_isDuplicate(employeeWorkPlace, employee));
                })
            })
        })
    })
    setFreeEmployees(copy);
}

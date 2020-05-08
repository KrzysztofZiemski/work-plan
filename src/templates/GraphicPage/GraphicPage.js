//for tests
import testWorkPlan from './testWorkPlan.json';
import testEmployee from './testEmployees.json';
//
import React, { useState, useEffect, createContext } from 'react';
import { getAllEmployee } from '../../repos/workersRequest';
import NavGraphic from '../../components/NavGraphic/NavGraphic';
import WorkPlace from './WorkPlace/WorkPlace';
import Employee from './Employee/Employee';
import { createWorkPlan, getWorkPlanByDate, updateWorkPlane } from '../../repos/workPlanRequest';
import { workPlaceNames } from './workPlaceNames';
import './GraphicPage.scss';

export const WorkPlanContext = createContext({
    setWorkplaceEmployee: null,
    removeEmployee: null,
    workPlan: null,
    dragable: null
})

const GraphicPage = ({ className }) => {
    let [dateStart, setDateStart] = useState('');
    let [dateEnd, setDateEnd] = useState('');
    let [dragable, setDragable] = useState(true);
    let [freeEmployees, setFreeEmployees] = useState([]);
    let [workPlan, setWorkPlan] = useState(null);

    //todo czekam na cors
    useEffect(() => {
        //fake data
        setWorkPlan(testWorkPlan)
        initFreeEmployee(testEmployee, testWorkPlan)

        //Pobranie planu, jeścli plan nie istnieje stworzenie nowego

        //nie działa narazie serwer

        // if (!dateStart || !dateEnd) return;
        // let isSubscribed = true;
        // const workPlanPromise = getWorkPlanByDate(dateStart, dateEnd)
        //     .catch(e => {
        //         if (isSubscribed && e === 404) return createWorkPlan(dateStart, dateEnd, 1)
        //             .then(resp => console.log(resp));

        //         return Promise.reject('stopped fetch');
        //     });

        // // pobranie pracowników

        // const employeesPromise = getAllEmployee()
        //     .catch(err => console.log(err));

        // // jak już i plan i pracownicy są pobrani, przefiltruj pracowników, po tych już występujących w grafiku

        // Promise.all([workPlanPromise, employeesPromise]).then(result => {
        //     if (!isSubscribed) return;
        //     setWorkPlan(result[0]);
        //     initFreeEmployee(result[1], result[0])
        // }).catch(e => console.log('error promise all', e))

        // // po odmontowaniu elementu zresetuj wartości startowe

        // return () => {
        //     setWorkPlan(null);
        //     setFreeEmployees([]);
        //     isSubscribed = false;
        // };
    }, [dateStart, dateEnd]);

    const isDuplicate = (object1, object2) => {
        if (object1.id === object2.id) return true;
        return false;

    }
    const initFreeEmployee = (allEmployee, workPlan) => {
        //usuwamy z pobranych pracowników, pracowników już przydzielonych

        let copy = [...allEmployee];
        workPlan.holidaysEmployees.forEach(holidayEmployee => {
            copy = copy.filter(employee => !isDuplicate(holidayEmployee, employee))
        })
        workPlan.absenceEmployees.forEach(absenceEmployee => {
            copy = copy.filter(employee => !isDuplicate(absenceEmployee, employee))
        })
        workPlan.workShifts.forEach(shift => {

            shift.shiftsLeader.forEach(leader => {
                copy = copy.filter(employee => !isDuplicate(leader, employee));
            })
            shift.supervision.forEach(supervision => {
                copy = copy.filter(employee => !isDuplicate(supervision, employee));
            })
            shift.unskilledWorker.forEach(unskillerWorker => {
                copy = copy.filter(employee => !isDuplicate(unskillerWorker, employee));
            })
            shift.other.forEach(other => {
                copy = copy.filter(employee => !isDuplicate(other, employee));
            })
            shift.lines.forEach(line => {
                line.workplaces.forEach(workplace => {
                    workplace.employeeListWorkplaces.forEach(employeeWorkPlace => {
                        copy = copy.filter(employee => !isDuplicate(employeeWorkPlace, employee));
                    })
                })
            })
        })
        setFreeEmployees(copy);
    }
    //przt upuszczaniu pracownika pobieramy parametry workplace i dodajemy obiekt pracownika w odpowiednim miejscu
    const setWorkplaceEmployee = ({ shift, line, workPlace }, employee) => {
        console.log('workPlace11', workPlace)
        const copyWorkPlan = Object.assign({}, workPlan);
        if (workPlace === workPlaceNames.holidays) {
            copyWorkPlan.holidaysEmployees.push(employee);
        } else if (workPlace === workPlaceNames.absence) {
            copyWorkPlan.absenceEmployees.push(employee);
        } else if (workPlace === workPlaceNames.free) {
            //for duplicats
            const copyNoWorkplaneEmployee = freeEmployees.filter(activeEmployee => activeEmployee.id !== employee.id);
            copyNoWorkplaneEmployee.push(employee);
            setFreeEmployees(copyNoWorkplaneEmployee);
        } else if (workPlace === workPlaceNames.leader || workPlace === workPlaceNames.other || workPlace === workPlaceNames.supervision || workPlace === workPlaceNames.unskilled) {

            copyWorkPlan.workShifts[shift][workPlace].push(employee);
        }
        else {
            copyWorkPlan.workShifts[shift].lines[line].workplaces[workPlace].employeeListWorkplaces.push(employee);
        }
        setWorkPlan(copyWorkPlan);
    }
    //przy upuszczaniu usuwamy pracownika z jego aktualnej pozycji i zwracamy obiekt pracownika do późniejszego umieszczenia w nowym miejscu
    const removeEmployee = ({ shift, line, workPlace }, id) => {
        const copyWorkPlan = Object.assign({}, workPlan);
        //for noWorking
        if (workPlace === workPlaceNames.holidays) {
            const employeeIndex = copyWorkPlan.holidaysEmployees.findIndex(empoyee => empoyee.id === id);
            const removerEmployee = copyWorkPlan.holidaysEmployees.splice(employeeIndex, 1);

            setWorkPlan(copyWorkPlan);
            return removerEmployee[0];
        } else if (workPlace === workPlaceNames.absence) {
            const employeeIndex = copyWorkPlan.absenceEmployees.findIndex(empoyee => empoyee.id === id);
            const removerEmployee = copyWorkPlan.absenceEmployees.splice(employeeIndex, 1);

            setWorkPlan(copyWorkPlan);
            return removerEmployee[0];
        } else if (workPlace === workPlaceNames.free) {
            const copyNoWorkplaneEmployee = [...freeEmployees];
            const employeeIndex = copyNoWorkplaneEmployee.findIndex(employee => employee.id === id);
            const removerEmployee = copyNoWorkplaneEmployee.splice(employeeIndex, 1);

            setFreeEmployees(copyNoWorkplaneEmployee);
            return removerEmployee[0];
        }
        //for specific workers
        else if (workPlace === workPlaceNames.leader || workPlace === workPlaceNames.other || workPlace === workPlaceNames.supervision || workPlace === workPlaceNames.unskilled) {
            const employeeIndex = copyWorkPlan.workShifts[shift][workPlace].findIndex(empoyee => empoyee.id === id);
            const removerEmployee = copyWorkPlan.workShifts[shift][workPlace].splice(employeeIndex, 1);

            setWorkPlan(copyWorkPlan);
            return removerEmployee;
        }
        //for workplaces
        else {

            const employeeIndex = copyWorkPlan.workShifts[shift].lines[line].workplaces[workPlace].employeeListWorkplaces.findIndex(empoyee => empoyee.id === id);
            const removerEmployee = copyWorkPlan.workShifts[shift].lines[line].workplaces[workPlace].employeeListWorkplaces.splice(employeeIndex, 1);

            setWorkPlan(copyWorkPlan);
            return removerEmployee[0];
        }
    }

    //zapisujemy plan
    const submitWorkPlan = () => {
        updateWorkPlane(1, workPlan)
            .catch(err => console.log('err', err))
    }

    return (
        <div className={`${className} dashboardPage`}>
            <h1>Grafik</h1>
            <WorkPlanContext.Provider value={{ setWorkplaceEmployee, removeEmployee, workPlan, dragable }}>
                <NavGraphic className='GraphicNav' setDragable={setDragable} dateStart={dateStart} setDateStart={setDateStart} dateEnd={dateEnd} setDateEnd={setDateEnd}></NavGraphic>

                <div className='graphic'>

                    <div className='graphic__shifts'>
                        {workPlan ? workPlan.workShifts.map((shift, indexShift) => (
                            <div key={`shift${indexShift}`} className='shift'>
                                <h2>{`Zmiana ${shift.shiftNumber}`}</h2>

                                <WorkPlace key={`supervision${indexShift}`} shift={indexShift} workPlace={workPlaceNames.supervision}>
                                    <h3>Supervisior</h3>
                                    {workPlan.workShifts[indexShift][workPlaceNames.supervision].map(employee => {
                                        return <Employee key={`employee${employee.id}`} id={employee.id} shift={indexShift} workPlace={workPlaceNames.supervision} >
                                            <span>{`${employee.name} ${employee.lastName}`}</span>
                                        </Employee>
                                    })}
                                </WorkPlace>
                                <WorkPlace key={`unskilled${indexShift}`} shift={indexShift} workPlace={workPlaceNames.unskilled}>
                                    <h3>Unskilled</h3>
                                    {workPlan.workShifts[indexShift][workPlaceNames.unskilled].map(employee => {
                                        return <Employee key={`employee${employee.id}`} id={employee.id} shift={indexShift} workPlace={workPlaceNames.unskilled} >
                                            <span>{`${employee.name} ${employee.lastName}`}</span>
                                        </Employee>
                                    })}
                                </WorkPlace>
                                <WorkPlace key={`leader${indexShift}`} shift={indexShift} workPlace={workPlaceNames.leader}>
                                    <h3>Lider zmiany</h3>
                                    {workPlan.workShifts[indexShift][workPlaceNames.leader].map(employee => {
                                        return <Employee key={`employee${employee.id}`} id={employee.id} shift={indexShift} workPlace={workPlaceNames.leader} >
                                            <span>{`${employee.name} ${employee.lastName}`}</span>
                                        </Employee>
                                    })}
                                </WorkPlace>
                                <WorkPlace key={`other${indexShift}`} shift={indexShift} workPlace={workPlaceNames.other}>
                                    <h3>Inni</h3>
                                    {workPlan.workShifts[indexShift][workPlaceNames.other].map(employee => {
                                        return <Employee key={`employee${employee.id}`} id={employee.id} shift={indexShift} workPlace={workPlaceNames.other} >
                                            <span>{`${employee.name} ${employee.lastName}`}</span>
                                        </Employee>
                                    })}
                                </WorkPlace>
                                {workPlan.workShifts[indexShift].lines.map((line, indexLine) => (
                                    <div key={`line${indexLine}`} className='line'>
                                        <h3>{`Linia ${line.lineNumber}`}</h3>
                                        {workPlan.workShifts[indexShift].lines[indexLine].workplaces.map((workplace, indexWorkplace) => {
                                            return <WorkPlace key={`workplace${indexWorkplace}`} shift={indexShift} line={indexLine} workPlace={indexWorkplace}>
                                                <h4>{workplace.nameWorkplace}</h4>
                                                {workPlan.workShifts[indexShift].lines[indexLine].workplaces[indexWorkplace].employeeListWorkplaces.map(employee => (
                                                    <Employee key={`employee${employee.id}`} id={employee.id} line={indexLine} shift={indexShift} workPlace={indexWorkplace} >
                                                        <span>{`${employee.name} ${employee.lastName}`}</span>
                                                    </Employee>
                                                ))}

                                            </WorkPlace>
                                        })}
                                    </div>
                                )
                                )}
                            </div>
                        )) : null}
                    </div>
                    <div className='graphic__other'>
                        <WorkPlace shift={null} line={null} workPlace={workPlaceNames.free} className='workShift workShift__freeEmployees'>
                            <h4>Nieprzydzieleni pracownicy</h4>
                            {freeEmployees.map(employee => (
                                <Employee key={`employee${employee.id}`} id={employee.id} line={null} shift={null} workPlace={workPlaceNames.free} >
                                    <span>{`${employee.name} ${employee.lastName}`}</span>
                                </Employee>
                            ))}

                        </WorkPlace>
                        <WorkPlace shift={null} line={null} workPlace={workPlaceNames.holidays} className='workShift'>
                            <h4>Urlopy</h4>
                            {workPlan ? workPlan.holidaysEmployees.map(employee => (
                                <Employee key={`employee${employee.id}`} id={employee.id} line={null} shift={null} workPlace={workPlaceNames.holidays} >
                                    <span>{`${employee.name} ${employee.lastName}`}</span>
                                </Employee>
                            )) : null}
                        </WorkPlace>
                        <WorkPlace shift={null} line={null} workPlace={workPlaceNames.absence} className='workShift'>
                            <h4>Nieobecni</h4>
                            {workPlan ? workPlan.absenceEmployees.map(employee => (
                                <Employee key={`employee${employee.id}`} id={employee.id} line={null} shift={null} workPlace={workPlaceNames.absence} >
                                    <span>{`${employee.name} ${employee.lastName}`}</span>
                                </Employee>
                            )) : null}
                        </WorkPlace>
                    </div>
                </div>

                <button onClick={submitWorkPlan}>Zapisz</button>
            </WorkPlanContext.Provider>

        </div >
    )
}

export default GraphicPage;

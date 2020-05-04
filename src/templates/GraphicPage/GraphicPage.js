/* eslint-disable no-cond-assign */
import React, { useState, useEffect, createContext } from 'react';
import { getAllEmployee } from '../../repos/workers';
import NavGraphic from '../../components/NavGraphic/NavGraphic';
import Shift from './Shift/Shift';
import WorkPlace from './WorkPlace/WorkPlace';
import Employee from './Employee/Employee';
import { getTemplateWorkPlan, getWorkPlanByDate, updateWorkPlane } from '../../repos/workPlan';

import './GraphicPage.scss';

export const WorkPlanContext = createContext({
            assignEmployee: null,
            removeEmployee: null,
            workPlan: null
})

const GraphicPage = ({ className }) => {
            let [dateStart, setDateStart] = useState('');
            let [dateEnd, setDateEnd] = useState('');
            let [dragable, setDragable] = useState(true);
            let [freeEmployees, setFreeEmployees] = useState([]);
            let [workPlan, setWorkPlan] = useState(null);
            //todo czekam na cors

            useEffect(() => {
                        if (!dateStart || !dateEnd) return;

                        getWorkPlanByDate(dateStart, dateEnd)
                                    .then(res => {
                                                if (res.status === 200) return res.json();
                                                if (res.status === 404) return (
                                                            getTemplateWorkPlan(dateStart, dateEnd, 0)
                                                                        .then(res => {
                                                                                    if (res.status === 200) return res.json();
                                                                                    throw res.status;
                                                                        })
                                                )
                                    })
                                    .then(data => {
                                                setWorkPlan(data);
                                                getAllEmployee()
                                                            .then(allWorkers => {
                                                                        setTimeout(checkNoWorkplaneEmployee(allWorkers, data), 0);
                                                            })
                                                            .catch(err => console.log(err));
                                    })
                                    .catch(err => console.log('err', err))


            }, [dateStart, dateEnd]);

            const isDuplicate = (object1, object2) => {
                        if (object1.id === object2.id) return true;
                        return false;

            }
            const checkNoWorkplaneEmployee = (allEmployee, workPlan) => {
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

            const assignEmployee = ({ shift, line, workPlace }, employee) => {
                        const copyWorkPlan = Object.assign({}, workPlan);

                        if (workPlace === 'holidays') {
                                    copyWorkPlan.holidaysEmployees.push(employee);
                        } else if (workPlace === 'absenceEmployees') {
                                    copyWorkPlan.absenceEmployees.push(employee);
                        } else if (workPlace === null) {
                                    const copyNoWorkplaneEmployee = [...freeEmployees];
                                    copyNoWorkplaneEmployee.push(employee);
                                    return setFreeEmployees(copyNoWorkplaneEmployee);
                        } else {
                                    copyWorkPlan.workShifts[shift].lines[line].workplaces[workPlace].employeeListWorkplaces.push(employee);
                        }
                        setWorkPlan(copyWorkPlan);
            }
            const removeEmployee = ({ shift, line, workPlace }, id) => {
                        const copyWorkPlan = Object.assign({}, workPlan);
                        console.log('workPlace', workPlace)
                        if (workPlace === 'holidays') {
                                    const employeeIndex = copyWorkPlan.holidaysEmployees.findIndex(empoyee => empoyee.id === id);
                                    const removerEmployee = copyWorkPlan.holidaysEmployees.splice(employeeIndex, 1);
                                    setWorkPlan(copyWorkPlan);
                                    return removerEmployee[0];
                        } else if (workPlace === 'absenceEmployees') {
                                    const employeeIndex = copyWorkPlan.absenceEmployees.findIndex(empoyee => empoyee.id === id);
                                    const removerEmployee = copyWorkPlan.absenceEmployees.splice(employeeIndex, 1);
                                    setWorkPlan(copyWorkPlan);
                                    return removerEmployee[0];
                        } else if (workPlace === null) {
                                    const copyNoWorkplaneEmployee = [...freeEmployees];
                                    const employeeIndex = copyNoWorkplaneEmployee.findIndex(employee => employee.id === id);
                                    const removerEmployee = copyNoWorkplaneEmployee.splice(employeeIndex, 1)
                                    setFreeEmployees(copyNoWorkplaneEmployee);
                                    return removerEmployee[0];
                        } else {

                                    const employeeIndex = copyWorkPlan.workShifts[shift].lines[line].workplaces[workPlace].employeeListWorkplaces.findIndex(empoyee => empoyee.id === id);
                                    const removerEmployee = copyWorkPlan.workShifts[shift].lines[line].workplaces[workPlace].employeeListWorkplaces.splice(employeeIndex, 1);
                                    setWorkPlan(copyWorkPlan);
                                    return removerEmployee[0];
                        }
            }
            const submitWorkPlan = () => {
                        updateWorkPlane(1, workPlan)
                                    .then(data => {
                                                console.log('response', data)
                                    })
                                    .catch(err => console.log('err', err))
            }
            return (
                        <div className={`${className} dashboardPage`}>
                                    <h1>Grafik</h1>
                                    <NavGraphic className='GraphicNav' dateStart={dateStart} setDateStart={setDateStart} dateEnd={dateEnd} setDateEnd={setDateEnd}></NavGraphic>
                                    <WorkPlanContext.Provider value={{ assignEmployee, removeEmployee, workPlan }}>
                                                <div className='graphic'>
                                                            <div className='graphic__shifts'>
                                                                        {workPlan ? workPlan.workShifts.map((shift, index) => (
                                                                                    <Shift key={`shift${index}`} shift={index}>
                                                                                                <h2>{`Zmiana ${shift.shiftNumber}`}</h2>
                                                                                    </Shift>
                                                                        )) : null}
                                                            </div>
                                                            <div className='graphic__other'>
                                                                        <WorkPlace shift={null} line={null} workPlace={null}>
                                                                                    <h4>Nieprzydzieleni pracownicy</h4>
                                                                                    {freeEmployees.map(employee => (
                                                                                                <Employee key={`employee${employee.id}`} id={employee.id} line={null} shift={null} workPlace={null} >
                                                                                                            <span>{`${employee.name} ${employee.lastName}`}</span>
                                                                                                </Employee>
                                                                                    ))}

                                                                        </WorkPlace>
                                                            </div>
                                                </div>
                                                <button onClick={submitWorkPlan}>Zapisz</button>
                                    </WorkPlanContext.Provider>

                        </div>
            )
}

export default GraphicPage;

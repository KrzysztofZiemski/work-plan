/* eslint-disable no-cond-assign */
import React, { useState, useEffect, createContext } from 'react';
import { getAllEmployee } from '../../repos/workers';
import NavGraphic from '../../components/NavGraphic/NavGraphic';
import Shift from './Shift/Shift';
import x from './x.json';
import { getTemplateWorkPlan, getWorkPlanByDate } from '../../repos/workPlan';

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
            let [allEmployee, setAllEmployee] = useState([]);
            let [workPlan, setWorkPlan] = useState(null);

            useEffect(() => {
                        // setWorkPlan(x[0])
                        if (!dateStart || !dateEnd) return;
                        // getAllEmployee()
                        //             .then(workers => {
                        //                         setAllEmployee(workers);
                        //             })
                        //             .catch(err => console.log(err));
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
                                    .then(data => console.log('data', data))
                                    .catch(err => console.log('err', err))
            }, [dateStart, dateEnd])
            console.log(workPlan)
            const assignEmployee = ({ shift, line, workplace }, employee) => {
                        const copyWorkPlan = Object.assign({}, workPlan);
                        if (workplace = 'holidays') {
                                    copyWorkPlan.holidaysEmployees.push(employee);
                        } else if (workplace = 'absenceEmployees') {
                                    copyWorkPlan.absenceEmployees.push(employee);
                        } else {
                                    copyWorkPlan.workShifts[shift].lines[line].workplaces[workplace].push(employee);
                        }
                        setWorkPlan(copyWorkPlan);
            }
            const removeEmployee = ({ shift, line, workplace }, id) => {

                        const copyWorkPlan = Object.assign({}, workPlan);

                        if (workplace = 'holidays') {
                                    const employeeIndex = copyWorkPlan.holidaysEmployees.findIndex(empoyee => empoyee.id === id);
                                    const removerEmployee = copyWorkPlan.holidaysEmployees.splice(employeeIndex, 1);
                                    setWorkPlan(copyWorkPlan);
                                    return removerEmployee;
                        } else if (workplace = 'absenceEmployees') {
                                    const employeeIndex = copyWorkPlan.absenceEmployees.findIndex(empoyee => empoyee.id === id);
                                    const removerEmployee = copyWorkPlan.absenceEmployees.splice(employeeIndex, 1);
                                    setWorkPlan(copyWorkPlan);
                                    return removerEmployee;
                        } else {
                                    const employeeIndex = copyWorkPlan.workShifts[shift].lines[line].workplaces[workplace].findIndex(empoyee => empoyee.id === id);
                                    const removerEmployee = copyWorkPlan.workShifts[shift].lines[line].workplaces[workplace].splice(employeeIndex, 1);
                                    setWorkPlan(copyWorkPlan);
                                    return removerEmployee;
                        }
            }
            return (
                        <div className={`${className} dashboardPage`}>
                                    <NavGraphic className='GraphicNav' dateStart={dateStart} setDateStart={setDateStart} dateEnd={dateEnd} setDateEnd={setDateEnd}></NavGraphic>
                                    <WorkPlanContext.Provider value={{ assignEmployee, removeEmployee, workPlan }}>
                                                <div className='graphic'>
                                                            <div className='shifts'>
                                                                        {workPlan ? workPlan.workShifts.map((shift, index) => <Shift key={`shift${index}`} shift={index}></Shift>) : null}
                                                            </div>
                                                </div>
                                    </WorkPlanContext.Provider>
                        </div>
            )
}

export default GraphicPage;

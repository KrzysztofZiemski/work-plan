import React, { useState, useEffect } from 'react';
import { getAllEmployee } from '../../repos/workers';
import NavGraphic from '../../components/NavGraphic/NavGraphic';
import WorkPlace from './WorkPlace/WorkPlace';
import './DashboardPage.scss';

const response = {
            absenceEmployees: [

            ],
            createAt: "2020-04-25T13:24:26.409Z",
            createByIdUser: {
                        id: 0,
                        name: "string",
                        surname: "string"
            },
            endDay: "2020-04-26",
            holidaysEmployees: [

            ],
            "id": 0,
            infoAbsence: "string",
            infoHolidays: "string",
            shifts: [
                        {
                                    comments: "string",
                                    createAt: "2020-04-25T13:24:26.409Z",
                                    id: 0,
                                    otherEmployees: [

                                    ],
                                    shiftNumber: 0,
                                    updateAt: "2020-04-25T13:24:26.409Z",
                                    workplaces: [
                                                {
                                                            employeeListWorkplaces: [

                                                            ],
                                                            id: 1,
                                                            nameWorkplace: "betoniarka"
                                                },
                                                {
                                                            employeeListWorkplaces: [

                                                            ],
                                                            id: 2,
                                                            nameWorkplace: "tokarka"
                                                },
                                                {
                                                            employeeListWorkplaces: [

                                                            ],
                                                            id: 3,
                                                            nameWorkplace: "tokarka"
                                                }
                                    ]
                        },
                        {
                                    comments: "string",
                                    createAt: "2020-04-25T13:24:26.409Z",
                                    id: 1,
                                    otherEmployees: [

                                    ],
                                    shiftNumber: 1,
                                    updateAt: "2020-04-25T13:24:26.409Z",
                                    workplaces: [
                                                {
                                                            employeeListWorkplaces: [

                                                            ],
                                                            id: 1,
                                                            nameWorkplace: "betoniarka"
                                                },
                                                {
                                                            employeeListWorkplaces: [

                                                            ],
                                                            id: 2,
                                                            nameWorkplace: "tokarka"
                                                }
                                    ]
                        }, {
                                    comments: "string",
                                    createAt: "2020-04-25T13:24:26.409Z",
                                    id: 2,
                                    otherEmployees: [

                                    ],
                                    shiftNumber: 2,
                                    updateAt: "2020-04-25T13:24:26.409Z",
                                    workplaces: [
                                                {
                                                            employeeListWorkplaces: [

                                                            ],
                                                            id: 1,
                                                            nameWorkplace: "betoniarka"
                                                },
                                                {
                                                            employeeListWorkplaces: [

                                                            ],
                                                            id: 2,
                                                            nameWorkplace: "tokarka"
                                                }
                                    ]
                        },
            ],
            startDay: "2020-04-20",
            updateAt: "2020-04-25T13:24:26.409Z",
            updateByIdUser: {
                        id: 0,
                        name: "string",
                        surname: "string"
            }
}
const employyes = [{
            id: 232323444253333,
            lastName: "aaaa",
            name: "aaaa"
}, {
            id: 231123232323,
            lastName: "ssss",
            name: "ssss"
}, {
            id: 435654,
            lastName: "laskowski",
            name: "adam"
}, {
            id: 2343434,
            lastName: "hanna",
            name: "shift2"
}, {
            id: 34453532323523,
            lastName: "anna",
            name: "dsotępna"
}]
const DashboardPage = ({ className }) => {
            let [dateStart, setDateStart] = useState(response.startDay);
            let [dateEnd, setDateEnd] = useState(response.endDay);
            let [dragable, setDragable] = useState(true);
            let [allEmployee, setAllEmployee] = useState(employyes);
            let [calendar, setCalendar] = useState(response);
            console.log('allEmployee', allEmployee)
            const setPlacementsOnEmployees = () => {
                        if (!calendar) return;
                        const copyCalendar = Object.assign({}, calendar);
                        let distributedEmployees = [];

                        copyCalendar.absenceEmployees.forEach(employee => {
                                    employee.placement = 'absence';
                                    distributedEmployees.push(employee);
                        });

                        copyCalendar.holidaysEmployees.forEach(employee => {
                                    employee.placement = 'holiday';
                                    distributedEmployees.push(employee);
                        });

                        copyCalendar.shifts[0].workplaces.forEach(workplace => {
                                    workplace.employeeListWorkplaces.forEach(employee => {
                                                employee.shift = 0;
                                                employee.placement = workplace.id;
                                                distributedEmployees.push(employee);
                                    })

                        });

                        copyCalendar.shifts[1].workplaces.forEach(workplace => {
                                    workplace.employeeListWorkplaces.forEach(employee => {
                                                employee.shift = 1;
                                                employee.placement = workplace.id;
                                                distributedEmployees.push(employee);
                                    })

                        });

                        copyCalendar.shifts[2].workplaces.forEach(workplace => {
                                    workplace.employeeListWorkplaces.forEach(employee => {
                                                employee.shift = 2;
                                                employee.placement = workplace.id;
                                                distributedEmployees.push(employee);
                                    })

                        });

                        const subtractionArrays = allEmployee.map(employee => {
                                    for (let i = 0; i < distributedEmployees.length; i++) {
                                                if (distributedEmployees[i].id === employee.id) {
                                                            return distributedEmployees[i];
                                                };
                                    }
                                    employee.placement = null;
                                    return employee;
                        })
                        return subtractionArrays;
            }
            const getEmployeesBy = (searchValue, numberShift) => {
                        if (numberShift === null || numberShift === undefined) return allEmployee.filter(employee => employee.placement === searchValue);
                        console.log('numberShift po ', numberShift)
                        return allEmployee.filter(employee => employee.placement === searchValue && employee.shift === numberShift);
            }

            const renderPlacements = (numberShift) => {

                        let output = []
                        for (let i = 0; i < calendar.shifts[numberShift].workplaces.length; i++) {
                                    const workPlace = calendar.shifts[numberShift].workplaces[i];
                                    output.push(<WorkPlace className={'workplaces'} setAllEmployee={setAllEmployee} allEmployee={allEmployee} dragable numberShift={numberShift} name={workPlace.nameWorkplace} placement={workPlace.id} key={numberShift + workPlace.id} employees={getEmployeesBy(workPlace.id, numberShift)}></WorkPlace>)
                        }
                        return output;
            }
            useEffect(() => {
                        getAllEmployee()
                                    .then(workers => {
                                                setAllEmployee(setPlacementsOnEmployees(workers))
                                    })
                                    .catch(err => {
                                                console.log(err)
                                                setAllEmployee(setPlacementsOnEmployees())
                                    })
            }, [])

            return (
                        <div className={`${className} dashboardPage`}>
                                    <NavGraphic className='GraphicNav' dateStart={dateStart} setDateStart={setDateStart} dateEnd={dateEnd} setDateEnd={setDateEnd}></NavGraphic>
                                    <div className='graphic'>
                                                <div className='graphic__shift graphic__shift--1'>
                                                            <h2> Zmaina 1</h2>
                                                            {renderPlacements(0)}
                                                </div>
                                                <div className='graphic__shift graphic__shift--2'>
                                                            <h2> Zmaina 2</h2>
                                                            {renderPlacements(1)}
                                                </div>
                                                <div className='graphic__shift graphic__shift--3'>
                                                            <h2> Zmaina 3</h2>
                                                            {renderPlacements(2)}
                                                </div>
                                                <div className='freeWorkers'>
                                                            <h2>Panel</h2>
                                                            <WorkPlace placement={null} setAllEmployee={setAllEmployee} dragable allEmployee={allEmployee} className='freeWorkers__free' name='Dostępni' employees={getEmployeesBy(null)}></WorkPlace>
                                                            <WorkPlace placement='absence' setAllEmployee={setAllEmployee} dragable allEmployee={allEmployee} className='freeWorkers__absence' name='Nieobecności' employees={getEmployeesBy('absence')}></WorkPlace>
                                                            <WorkPlace placement='holiday' setAllEmployee={setAllEmployee} allEmployee={allEmployee} dragable className='freeWorkers__holiday' name='Urlopy' employees={getEmployeesBy('holiday')}></WorkPlace>

                                                </div>
                                    </div>
                        </div>
            )
}

export default DashboardPage;

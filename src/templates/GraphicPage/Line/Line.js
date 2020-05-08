import React, { useContext } from 'react';
import WorkPlace from '../WorkPlace/WorkPlace';
import { WorkPlanContext } from '../GraphicPage';
import Employee from '../Employee/Employee';
import './Line.scss';

const Line = ({ shift, line, children }) => {
            const { workPlan } = useContext(WorkPlanContext);
            return (
                        <div className='line'>
                                    {children}
                                    {workPlan.workShifts[shift].lines[line].workplaces.map((workplace, index) => (
                                                <WorkPlace key={`workplace${index}`} shift={shift} line={line} workPlace={index}>
                                                            <h4>{workplace.nameWorkplace}</h4>
                                                            {workPlan.workShifts[shift].lines[line].workplaces[index].employeeListWorkplaces.map(employee => (
                                                                        <Employee key={`employee${employee.id}`} id={employee.id} line={line} shift={shift} workPlace={index} >
                                                                                    <span>{`${employee.name} ${employee.lastName}`}</span>
                                                                        </Employee>
                                                            ))}

                                                </WorkPlace>
                                    ))}
                        </div>
            )
}

export default Line;
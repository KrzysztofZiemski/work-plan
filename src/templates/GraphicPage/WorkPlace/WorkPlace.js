import React, { useContext } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../../utils/ItemTypes';
import { WorkPlanContext } from '../GraphicPage';
import Employee from '../Employee/Employee';
import './WorkPlace.scss';

const WorkPlace = ({ line, shift, workPlace }) => {

            const { assignEmployee, removeEmployee, workPlan } = useContext(WorkPlanContext);

            const [{ isOver }, drop] = useDrop({
                        accept: ItemTypes.EMPLOYEE,
                        drop: (item, mointor) => removeEmployee(item.id),
                        collect: monitor => ({
                                    isOver: !!monitor.isOver(),
                        })
            })

            return (
                        <div
                                    ref={drop}
                        >
                                    {
                                                workPlan.workShifts[shift].lines[line].workplaces[workPlace].employeeListWorkplaces.map(employee => <Employee key={`employee${employee.id}`} id={employee.id} line={line} shift={shift} workPlace={workPlace} ></Employee>)
                                    }
                        </div >
            )
}

export default WorkPlace;
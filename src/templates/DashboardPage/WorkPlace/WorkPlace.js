import React from 'react';
import Employee from '../Employee/Employee';
import './WorkPlace.scss';

const WorkPlace = ({ employees, name, className, dragable, numberShift, setAllEmployee, allEmployee, placement }) => {
            // e.dataTransfer.setData('workerIdTransfer', target.id);
            // e.dataTransfer.setData('shiftIdTransfer', shiftId);
            // e.dataTransfer.setData('workplaceIdTransfer', workplaceId);
            console.log('numberShift render', numberShift)
            const renderWorkers = () => {
                        return employees.map(employee => {
                                    return <Employee className='employee' id={employee.id} key={employee.id} dragable={dragable}><span>{`${employee.name} ${employee.lastName}`}</span></Employee >
                        })
            }

            const drop = e => {
                        e.preventDefault();
                        const idEmployeeTransfer = Number(e.dataTransfer.getData('employeeIdTransfer'));

                        const index = allEmployee.findIndex(employee => employee.id === idEmployeeTransfer);
                        const copy = [...allEmployee];
                        const transferEmployee = copy.splice(index, 1);
                        console.log('placement drop', placement)
                        transferEmployee[0].shift = numberShift;
                        transferEmployee[0].placement = placement;
                        console.log(numberShift)
                        copy.push(transferEmployee[0]);
                        console.log(copy)
                        setAllEmployee(copy);
            }

            const dragOver = e => {
                        e.preventDefault();
            }
            return (
                        <div
                                    onDrop={drop}
                                    onDragOver={dragOver}
                                    className={className}
                        >
                                    <h3>{name}</h3>
                                    <div className='board'>
                                                {renderWorkers()}
                                    </div>
                        </div >
            )
}

export default WorkPlace;
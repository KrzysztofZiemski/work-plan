import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../utils/ItemTypes';
import './Employee.scss';
const Employee = ({ id, line, shift, workPlace, children, className }) => {
    const [{ isDragging }, drag] = useDrag({
        item: {
            type: ItemTypes.EMPLOYEE,
            id, line, shift, workPlace
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        })
    })


    return (
        <div
            ref={drag}
            className={`employee ${isDragging ? 'drag' : ''} ${className ? className : ''}`}
        >
            {children}
        </div>
    )
}

export default Employee;
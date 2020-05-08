import React, { useContext } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../../utils/ItemTypes';
import { WorkPlanContext } from '../GraphicPage';
import './WorkPlace.scss';

const WorkPlace = ({ line, shift, workPlace, children, className }) => {

    const { setWorkplaceEmployee, removeEmployee, workPlan } = useContext(WorkPlanContext);

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.EMPLOYEE,
        drop: (item, mointor) => {
            const deletedItem = removeEmployee({ shift: item.shift, line: item.line, workPlace: item.workPlace }, item.id);
            console.log('deletedItem', deletedItem)

            setWorkplaceEmployee({ shift, line, workPlace }, deletedItem)
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        })
    })

    return (
        <div
            className={`board ${className ? className : ''}`}
            ref={drop}
        >
            {children}
        </div >
    )
}

export default WorkPlace;
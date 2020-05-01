import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../../utils/ItemTypes';

const Employee = ({ id, line, shift, workPlace }) => {

            const [{ isDragging }, drag] = useDrag({
                        item: {
                                    type: ItemTypes.EMPLOYEE
                        },
                        collect: monitor => ({
                                    isDragging: !!monitor.isDragging(),
                                    id
                        })
            })
            const style = {

            }
            const styleDragging = {
                        opacity: '.5'
            }
            return (
                        <div
                                    ref={drag}
                                    style={isDragging ? styleDragging : style}
                        >
                                    sdfdsfds
                        </div>
            )
}

export default Employee;
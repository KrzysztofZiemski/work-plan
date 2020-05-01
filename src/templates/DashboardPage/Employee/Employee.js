import React from 'react';

const Employee = ({ dragable, id, children, className }) => {
            const dragStart = e => {
                        e.stopPropagation();
                        const target = e.target;
                        e.dataTransfer.setData('employeeIdTransfer', id);

                        setTimeout(() => {
                                    target.style.display = 'none';
                        }, 0)
            }

            const dragOver = e => {
                        // e.stopPropagation();
            }
            const dragEnd = e => {
                        e.target.style.display = 'block';
            }
            return (
                        <div
                                    id={id}
                                    draggable={dragable}
                                    onDragStart={dragStart}
                                    onDragOver={dragOver}
                                    onDragEnd={dragEnd}
                                    className={className}
                        >
                                    {children}
                        </div>
            )
}

export default Employee;
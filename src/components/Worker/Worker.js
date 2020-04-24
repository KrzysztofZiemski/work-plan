import React from 'react';

const Worker = props => {
            const dragStart = e => {
                        const target = e.target;
                        e.dataTransfer.setData('workerId', target.id);

                        setTimeout(() => {
                                    target.style.display = 'none';
                        }, 0)
            }
            const dragOver = e => {
                        e.stopPropagation();
            }
            const dragEnd = e => {
                        e.target.style.display = 'block';
            }
            return (
                        <div
                                    id={props.id}
                                    className={props.className}
                                    draggable={props.dragable}
                                    onDragStart={dragStart}
                                    onDragOver={dragOver}
                                    onDragEnd={dragEnd}
                        >
                                    {props.children}
                        </div>
            )
}

export default Worker;
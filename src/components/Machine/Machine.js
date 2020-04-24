import React, { createRef } from 'react';

const Machine = (props, ref) => {
            //workers, setWorkersAvaible name
            const drop = e => {
                        e.preventDefault();
                        const workerTransferId = Number(e.dataTransfer.getData('workerId'));
                        const copy = [...props.workers];
                        const index = copy.findIndex(worker => worker.id === workerTransferId);
                        copy[index].machine = props.name;
                        props.setWorkersAvaible(copy);

                        // const worker = document.getElementById(workerId);
                        // worker.style.display = 'block';
                        // e.target.appendChild(worker);
            }

            const dragOver = e => {
                        e.preventDefault();
            }
            return (
                        <div
                                    ref={createRef()}
                                    id={props.id}
                                    onDrop={drop}
                                    onDragOver={dragOver}
                                    className={props.className}
                        >
                                    {props.children}
                        </div>
            )
}

export default Machine;
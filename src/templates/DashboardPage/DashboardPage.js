import React, { useState, useEffect } from 'react';
import { getAllWorkers } from '../../repos/workers';
import Worker from '../../components/Worker/Worker';
import Machine from '../../components/Machine/Machine';
import NavGraphic from '../../components/NavGraphic/NavGraphic';
import './DashboardPage.scss';

const DashboardPage = () => {
            let [dateStart, setDateStart] = useState('2020-05-27');
            let [dateEnd, setDateEnd] = useState('2020-06-03');

            console.log('start', dateStart)
            console.log('end', dateEnd)
            const setWorkers = (params) => {
                        return workersAvaible.filter(worker => worker.machine === params).map(worker => {
                                    return (
                                                <Worker set={setWorkersAvaible} dragable='true' className='worker' key={`worker${worker.id}`} id={worker.id}>{worker.name}</Worker>
                                    )
                        })
            }

            const workersFree = [{ id: 1, name: 'julian', machine: 'lichwa' }, { id: 2, name: 'marian', machine: null }, { id: 3, name: 'sebastian', machine: null }];
            let [workersAvaible, setWorkersAvaible] = useState(workersFree);

            // let [machine_1, setMachine_1] = useState([]);
            // let [machine_2, setMachine_2] = useState([]);
            // let [machine_3, setMachine_3] = useState([]);
            // useEffect(() => {
            //             getAllWorkers().then(res => setWorkers(res));
            // }, [])

            return (
                        <div className='dashboardPage'>
                                    <NavGraphic className='GraphicNav' dateStart={dateStart} setDateStart={setDateStart} dateEnd={dateEnd} setDateEnd={setDateEnd}></NavGraphic>
                                    <div className='graphic'>
                                                <Machine name='szprota' id='board-1' className='machine' workers={workersAvaible} setWorkersAvaible={setWorkersAvaible}>
                                                            <h1>szprota</h1>
                                                            {setWorkers('szprota')}
                                                </Machine>
                                                <Machine name='lichwa' id='board-2' className='machine' workers={workersAvaible} setWorkersAvaible={setWorkersAvaible}>
                                                            <h1>lichwa</h1>
                                                            {setWorkers('lichwa')}

                                                </Machine>
                                                <Machine name={null} id='board-3' className='machine' workers={workersAvaible} setWorkersAvaible={setWorkersAvaible}>
                                                            <h1>Dostępni pracownicy</h1>
                                                            {setWorkers(null)}
                                                </Machine>
                                    </div>
                        </div>
            )
}

export default DashboardPage;

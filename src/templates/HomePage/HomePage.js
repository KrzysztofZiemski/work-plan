import React, { useState } from 'react';
import { LogService } from '../../services/LogsService';
import { UserService } from '../../services/UserService';
import CircleProgress from '../../components/CircleProgress';

const HomePage = () => {
    let [logs, setLogs] = useState('');
    let [id, setId] = useState('');


    const getLogs = () => {
        LogService.getLogs()
            .then(logs => setLogs(logs))
            .catch(err => setLogs(err))
    }
    const getUser = () => {
        UserService.getUser(id)
            .then(user => console.log('user', user))
            .catch(err => console.log('err', err))
    }

    return (
        <>
            <section>
                <div>Tu na razie jest ściernisko
                        Ale będzie</div>
                <button onClick={getLogs}>Get logs</button>
                <br />
                <button onClick={getUser}> get user by id</button>
                <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
            </section>
            <CircleProgress></CircleProgress>
        </>
    )
}

export default HomePage;
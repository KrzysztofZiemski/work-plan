import React, { useState } from 'react';
import { LogService } from '../../services/LogsService';
import { UserService } from '../../services/UserService';
import { AddFormDialogTest } from '../../components/testAddPanel';

const HomePage = () => {
    let [logs, setLogs] = useState(null);
    let [id, setId] = useState(null);
    console.log('logs', logs)

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
    const options = {
        buttonText: 'Dodaj pracownika',
        fields: [
            {
                name: 'imię',
                type: 'text',
                pattern: '.{3,10}',
                errorMessage: 'Imię musi zawierać od 3 do 10 znaków'
            },
            {
                name: 'nazwisko',
                type: 'text',
                pattern: '.{3,10}',
                errorMessage: 'Nazwisko musi zawierać od 3 do 10 znaków'
            }
        ]
    }
    return (
        <section>
            <div>Tu na razie jest ściernisko
                        Ale będzie</div>
            <button onClick={getLogs}>Get logs</button>
            <br />
            <button onClick={getUser}> get user by id</button>
            <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
            <AddFormDialogTest fields={options.fields} button={options.buttonText} />
        </section>

    )
}

export default HomePage;
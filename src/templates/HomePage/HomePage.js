import React, { useState } from 'react';
import { LogService } from '../../services/LogsService';
import { UserService } from '../../services/UserService';
import { AddFormDialog } from '../../components/AddFormDialog/AddFormDialog';
import PrimaryButton from '../../components/PrimaryButton'
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
                name: 'name',
                type: 'text',
                label: 'imie',
                pattern: '.{3,10}',
                errorMessage: 'Imię musi zawierać od 3 do 10 znaków'
            },
            {
                name: 'lastName',
                label: 'nazwisko',
                type: 'text',
                pattern: '.{3,10}',
                errorMessage: 'Nazwisko musi zawierać od 3 do 10 znaków'
            },
            {
                name: 'desc',
                label: 'opis',
                type: 'date',
                errorMessage: ''
            },
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
            <AddFormDialog fields={options.fields} button={<PrimaryButton value='tesy' />} />
        </section>

    )
}

export default HomePage;
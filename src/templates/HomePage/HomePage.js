import React, { useState } from 'react';
import { LogService } from '../../services/LogsService';
import { UserService } from '../../services/UserService';
import CircleProgress from '../../components/CircleProgress';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
const useStyles = makeStyles(({
    root: {
        backgroundColor: 'red',
        '& ::after': {
            display: 'block',
            constent: '"fffff"',
            height: '20px',
            width: '20px'
        }
    }
}))
const HomePage = ({ className }) => {
    const classes = useStyles()
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
            <section classname={className}>
                <CssBaseline className={classes.root} />
                <div >Tu na razie jest ściernisko
                        Ale będzie</div>
                <button onClick={getLogs}>Get logs</button>
                <br />
                <button onClick={getUser}> get user by id</button>
                <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
            </section>
        </>
    )
}

export default HomePage;
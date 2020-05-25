import React, { useState } from 'react';
import { LogService } from '../../services/LogsService';

import './HomePage.scss';

const HomePage = () => {
    let [logs, setLogs] = useState(null);
    console.log(logs)
    const getLogs = () => {
        LogService.getLogs()
            .then(logs => setLogs(logs))
            .catch(err => setLogs(err))
    }
    return (
        <>
            <div>Tu na razie jest ściernisko
                        Ale będzie</div>
            <button onClick={getLogs}>Get logs</button>
            {/* <div>{logs}</div> */}
        </>
    )
}

export default HomePage;
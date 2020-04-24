import { SERVER } from '../config.json';


const getAllWorkers = () => {
            return fetch(SERVER, {
                        method: 'GET',
                        mode: 'cors',
                        credentials: 'same-origin',
                        headers: {
                                    'Content-Type': 'application/json'
                        }
            })
                        .then(res => {
                                    if (res.status === 200) return res.json();
                                    throw (res.status);
                        });
};


export {
            getAllWorkers
}
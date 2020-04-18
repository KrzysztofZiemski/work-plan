import { SERVER } from '../config.json';


const getAllWorkers = () => {
            return fetch(SERVER).then(res => res.json());
};


export {
            getAllWorkers
}
import { SERVER } from '../config.json';
const SERVER_LOGS = `${SERVER}/hextl/api/v1/log`;
export class LogService {
    static getLogs = () => {
        return fetch(SERVER_LOGS)
            .then(res => {
                console.log(res)
                if (res.ok === true) return res.json();
                return Promise.reject(res.status);
            })
    }
}
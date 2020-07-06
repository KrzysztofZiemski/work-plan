import { SERVER } from '../config';
const SERVER_LOGS = `${SERVER}/api/v1/log`;
export class LogService {

    static getLogs = () => {
        return fetch(SERVER_LOGS)
            .then(res => {
                if (res.ok === true) return res.json();
                return Promise.reject(res.status);
            })
    }
}
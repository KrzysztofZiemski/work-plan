import { SERVER } from '../config';
const SERVER_LOGS = `${SERVER}/hextl/api/v1/log`;
export class LogService {

    static getLogs = () => {
        const requestOptions = {
            method: 'GET',
        }
        return fetch(SERVER_LOGS, requestOptions)
            .then(res => {
                console.log(res)
                if (res.ok === true) return res.json();
                return Promise.reject(res.status);
            })
    }
}
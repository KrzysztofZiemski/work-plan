import { SERVER } from '../config';
const SERVER_LINES = `${SERVER}/api/v1/line`;
class LineService {

    static getAllLines = () => fetch(SERVER_LINES)
        .then(res => {
            if (res.ok === true) return res.json();
            return Promise.reject(res.status);
        })
    static add = (data) => {
        const options = {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
        return fetch(SERVER_LINES, options)
            .then(res => {
                if (res.status === 200) return res.json();
                return Promise.reject(res.status);
            })
    }
    static remove = (id) => {
        const options = {
            method: 'DELETE',
        }
        return fetch(`${SERVER_LINES}/${id}`, options)
            .then(res => {
                if (res.status === 200) return res.json();
                return Promise.reject(res.status);
            })

    }
    static get = (id) => {
        return fetch(`${SERVER_LINES}/${id}`)
            .then(resp => {
                if (resp.status === 200) return resp.json();
                return Promise.reject(resp.status)
            })
            .catch(err => Promise.reject(err))
    }
}

export default LineService;
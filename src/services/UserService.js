import { SERVER } from '../config';
import axios from '../utils/axios'
const USER_SERVER = `${SERVER}/api/v1/user`
export class UserService {
    static getUser(id) {
        const options = {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
        }
        return fetch(`${USER_SERVER}/${id}`,options)
            .then(res => {
                if (res.ok) return res.json();
                Promise.reject(res.status)
            })
    }

    static getAll() {
        return axios('/api/v1/user')
    }
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
        return fetch(USER_SERVER, options)
            .then(res => {
                if (res.status === 200) return res.json();
                return Promise.reject(res.status);
            })
    }
    static remove = (id) => {
        const requestOptions = {
            method: 'DELETE',
            credentials: 'include',
            mode: 'cors',
        }
        return fetch(`${USER_SERVER}/${id}`, requestOptions)
            .then(res => {
                if (res.status === 200) return res.json();
                return Promise.reject(res.status);
            })

    }
}

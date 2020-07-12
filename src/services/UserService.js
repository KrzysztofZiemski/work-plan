import { SERVER } from '../config';
const USER_SERVER = `${SERVER}/api/v1/user`
export class UserService {
    static getUser(id) {
        return fetch(`${USER_SERVER}/${id}`)
            .then(res => {
                if (res.ok) return res.json();
                Promise.reject(res.status)
            })
    }

    static getAll() {
        return fetch(USER_SERVER)
            .then(res => {
                console.log(res)
                if (res.ok) return res.json();
                Promise.reject(res.status)
            })
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
        const options = {
            method: 'DELETE',
        }
        return fetch(`${USER_SERVER}/${id}`, options)
            .then(res => {
                if (res.status === 200) return res.json();
                return Promise.reject(res.status);
            })

    }
}
import { SERVER } from '../config';

const LOGIN_URL = `${SERVER}/login`
const AUTHENTICATION_URL = `${SERVER}/authentication`;
const LOGOUT_URL = `${SERVER}/logout`;
export class AuthService {
    static authentication = (username, password) => {
        const data = { username, password }
        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
        return fetch(LOGIN_URL, requestOptions).then(res => {
            console.log(res)
            if (res.status === 404 || res.status === 200) return Promise.resolve();
            return Promise.reject(res.status);
        })
    }

    static getAuthUser = () => {
        const requestOptions = {
            method: 'GET',
            credentials: 'include',
        };
        return fetch(AUTHENTICATION_URL, requestOptions)
            .then(res => {
                if (res.ok) return res.json();
                return Promise.reject(res.status)
            });
    }

    static logout = () => fetch(LOGOUT_URL, {
        method: 'POST',
        credentials: 'include',
    })

    static createAuthToken = (username, password) => `Basic ${window.btoa(`${username}:${password}`)}`
}

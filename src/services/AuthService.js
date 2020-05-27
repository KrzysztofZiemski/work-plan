import { SERVER } from '../config';

const LOGIN_URL = `${SERVER}/login`
const AUTHENTICATION_URL = `${SERVER}/api/v1/user/authentication`;
const LOGOUT_URL = `${SERVER}/logout`;
export class AuthService {
    static authentication = (username, password) => {

        const requestOptions = {
            method: 'POST',
            headers: { authorization: this.createAuthToken(username, password) },
            credentials: 'include',
        }
        // JSESSIONID
        return fetch(LOGIN_URL, requestOptions).then(res => {
            if (res.status === 404 || res.status === 200) return Promise.resolve();
            return Promise.reject();
        })
        // .then(async res => {
        //     switch (res.status) {
        //         case 200:
        //             return Promise.resolve({ msg: 'ok', res });
        //         case 401:
        //             return Promise.reject({ msg: 'niepoprawny login lub hasło', res });
        //         default:
        //             return Promise.reject({ msg: `wystąpił błąd skontaktuj się z administratorem ${res.status}`, res })
        //     }
        // })
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
    static logout = () => fetch(LOGOUT_URL)

    static createAuthToken = (username, password) => `Basic ${window.btoa(`${username}:${password}`)}`
}

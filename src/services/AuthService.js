import { SERVER } from '../config.json';

const LOGIN_URL = `${SERVER}/hextl/login`
const AUTHENTICATION_URL = `${SERVER}/api/v1/user/authentication`;

export class AuthService {
    static authentication = (username, password) => {

        const requestOptions = {
            method: 'POST',
            headers: { authorization: this.createAuthToken(username, password) }
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
            withCredentials: true,
            credentials: 'include',
        };
        return fetch(AUTHENTICATION_URL, requestOptions)
            .then(res => {
                if (res.ok) return res.json();
                return Promise.reject(res.status)
            });
    }

    static createAuthToken = (username, password) => `Basic ${window.btoa(`${username}:${password}`)}`
}

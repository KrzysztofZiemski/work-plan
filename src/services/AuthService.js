import axios from '../utils/axios';

export class AuthService {
    static authentication = (username, password) => {
        const data = { username, password };
        const decodedData = JSON.stringify(data);
        return axios.post('login', decodedData)
            .then(() => Promise.resolve())
            .catch(err => Promise.reject(err));
    };

    static getAuthUser = () => {
        return axios.get('authentication')
            .then(res => res.data)
            .catch(err => Promise.reject(err));
    };

    static logout = () => axios.post('logout').catch(err => Promise.reject(err.response.status));

    static createAuthToken = (username, password) => `Basic ${window.btoa(`${username}:${password}`)}`;
}

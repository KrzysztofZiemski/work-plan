import axios from '../utils/axios';

export class AuthService {
    static authentication = (username, password) => {
        const data = { username, password };
        const decodedData = JSON.stringify(data);
        return axios.post('login', decodedData)
            .then(res => {
                console.log(res);
                if (res.status === 404 || res.status === 200) return Promise.resolve();
                throw new Error('Error');
            })
            .catch(err => Promise.reject(err.status));
    };

    static getAuthUser = () => {
        return axios.get('authentication')
            .then(res => res.json())
            .catch(err => Promise.reject(err.status));
    };

    static logout = () => axios.post('logout');

    static createAuthToken = (username, password) => `Basic ${window.btoa(`${username}:${password}`)}`;
}

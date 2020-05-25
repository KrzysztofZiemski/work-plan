import { SERVER } from '../config.json';
const USER_SERVER = `${SERVER}/api/v1/user`
export class UserService {
    static getUser(id) {
        return fetch(`${USER_SERVER}/${id}`)
            .then(res => {
                if (res.ok) return res.json();
                Promise.reject(res.status)
            })
    }
}
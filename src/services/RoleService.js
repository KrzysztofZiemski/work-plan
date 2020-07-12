import { SERVER } from '../config';
const SERVER_ROLE = `${SERVER}/api/v1/role`;

class RoleService {

    static getAll = () => {
        return fetch(SERVER_ROLE)
            .then(res => {
                if (res.ok === true) return res.json();
                return Promise.reject(res.status);
            })
    }
}
export default RoleService
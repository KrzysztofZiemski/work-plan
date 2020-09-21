import { SERVER } from '../config';
const SERVER_ROLE = `${SERVER}/api/v1/role`;

class RoleService {
  
    static getAll = () => {
        const options = {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
        }
        return fetch(SERVER_ROLE,options)
            .then(res => {
                if (res.ok === true) return res.json();
                return Promise.reject(res.status);
            })
    }
}
export default RoleService
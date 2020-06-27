import { SERVER } from '../config';
const SERVER_LINES = `${SERVER}/api/v1/line`;
class LineService {

    static getAllLines = () => fetch(SERVER_LINES)
        .then(res => {
            if (res.ok === true) return res.json();
            return Promise.reject(res.status);
        })
}

export default LineService;
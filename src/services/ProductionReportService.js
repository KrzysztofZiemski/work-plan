import { SERVER } from '../config';
const SERVER_REPORT = `${SERVER}/api/v1/production-report`;
class ProductionReportService {
    static save = (data, loggedUserId) => {
        const URL = `${SERVER_REPORT}?idUser=${loggedUserId}`;
        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }

        return fetch(URL, requestOptions)
            .then(res => {
                if (res.status === 200) return Promise.resolve();
                return Promise.reject(res.status);
            })
    }
}

export default ProductionReportService;
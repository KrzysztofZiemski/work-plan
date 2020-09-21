import { SERVER } from '../config';
const SERVER_REPORT = `${SERVER}/api/v1/production-report`;
class ProductionReportService {
    static save = (data, loggedUserId) => {
        data.productionStart = data.productionStart.replace('T', '-');
        data.productionEnd = data.productionEnd.replace('T', '-');

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
    static getBetween = (start, end) => {
        //format date yyyy-MM-dd-HH:mm
        const options = {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
        }
        const URL = `${SERVER_REPORT}/start/${start}/end/${end}`;
        return fetch(URL)
            .then(res => {
                if (res.status === 200) return res.json();
                return Promise.reject(res.status);
            })
    }
    static get = (id) => {
        const requestOptions = {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
        }
        //format date yyyy-MM-dd-HH:mm
        const URL = `${SERVER_REPORT}/${id}`;
        return fetch(URL,requestOptions)
            .then(res => {
                if (res.status === 200) return res.json();
                return Promise.reject(res.status);
            })
    }

    static getAll = () => {
        const requestOptions = {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
        }
        return fetch(SERVER_REPORT,requestOptions)
            .then(res => {
                if (res.status === 200) return res.json();
                return Promise.reject(res.status);
            })
    }
    static update = (id, data) => {
        data.productionStart = data.productionStart.replace('+02:00', '.211Z');
        data.productionEnd = data.productionEnd.replace('+02:00', '.211Z');
        const URL = `${SERVER_REPORT}/${id}`;
        const requestOptions = {
            method: 'PUT',
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
    static remove = (id) => {
        const URL = `${SERVER_REPORT}/${id}`;
        const requestOptions = {
            method: 'DELETE',
            credentials: 'include',
            mode: 'cors'
        }
        
        return fetch(URL, requestOptions)
            .then(res => {
                if (res.status === 200) return Promise.resolve();
                return Promise.reject(res.status);
            })
    }
}

export default ProductionReportService;
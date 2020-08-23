import axios from 'axios';
import { SERVER } from '../config';

export default axios.create({
    withCredentials: true,
    mode: 'cors',
    baseURL: SERVER,
    headers: {
        'Content-Type': 'application/json',
    }
});

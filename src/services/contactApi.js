import axios from '../utils/axios';
const MESSAGE_URL = '/api/v1/employee';
export const sendMessage = ({ mail, message, firstName }) =>
    axios.post(MESSAGE_URL, JSON.stringify({ mail, message, firstName }))
        .then(res => res.data)
        .catch(err => Promise.reject(err));
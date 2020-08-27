import axios from '../utils/axios';
const MESSAGE_URL = '/api/v1/mail/sendMessageContact';
export const sendMessage = (nameSender, addressEmail, titleMessage, content) =>
    axios.post(MESSAGE_URL, JSON.stringify({ nameSender, addressEmail, titleMessage, content }))
        .then(res => res.data)
        .catch(err => Promise.reject(err));
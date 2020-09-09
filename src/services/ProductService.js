import axios from '../utils/axios';
import { SERVER } from './../config';
const PRODUCTS_URL_FETCH = `${SERVER}/api/v1/product`
const PRODUCTS_URL = '/api/v1/product';
const FILTER_FALSE = '?filterIsActive=false';

export const getProductsByActive = (active = true) => {
    const URL = active ? PRODUCTS_URL : PRODUCTS_URL + FILTER_FALSE;
    return axios.get(URL)
        .then(res => res.data)
        .catch(err => Promise.reject(err));
}

export const getAllProducts = async () => {
    try {
        const activeProduct = await axios.get(PRODUCTS_URL)
            .then(res => res.data)
            .catch(err => Promise.reject(err));

        const inActiveProducts = await axios.get(PRODUCTS_URL + FILTER_FALSE)
            .then(res => res.data)
            .catch(err => Promise.reject(err));

        return Promise.resolve([...activeProduct, ...inActiveProducts]);

    } catch (err) {
        return Promise.reject(err);
    }
};

export const addProduct = (data) => {
    return axios.post(PRODUCTS_URL, JSON.stringify(data))
        .then(res => res.data)
        .catch(err => Promise.reject(err.response));
};

export const removeProduct = (id) => {
    return axios.delete(`${PRODUCTS_URL}/${id}`)
        .then(res => res.data)
        .catch(err => Promise.reject(err));
};

export const getProduct = (id) => {
    return axios.get(`${PRODUCTS_URL}/${id}`)
        .then(res => res.data)
        .catch(err => Promise.reject(err.response))
}

export const update = (id, data) => {
    console.log('zapytanie', JSON.stringify(data))
    const options = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return fetch(`${PRODUCTS_URL_FETCH}/${id}`, options)
        .then(res => {
            if (res.status === 200) return res.json();
            return Promise.reject(res);
        })
}

// { "name": "Product B", "instructionId": "12313b", "itemsPerCycle": 6, "description": "test", "isSerialized": "test" }
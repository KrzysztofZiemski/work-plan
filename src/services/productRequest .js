import axios from '../utils/axios';

const PRODUCTS_URL = '/api/v1/product';
const FILTER_FALSE = '?filterIsActive=false';

export const getProductsByActive = (active = true) => {
    const URL = active ? PRODUCTS_URL : PRODUCTS_URL + FILTER_FALSE;
    return axios.get(URL)
        .then(res => res.datta)
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

    }   catch (err){
        return Promise.reject(err);
    }
};


export const addProduct = (data) => {
    return axios.post(PRODUCTS_URL, JSON.stringify(data))
        .then(res =>res.data)
        .catch(err => Promise.reject(err));
};

export const deleteProduct = (id) => {
    return axios.delete(`${PRODUCTS_URL}/${id}`)
    .then(res => res.data) 
    .catch(err => Promise.reject(err));
        Promise.resolve()
    
};

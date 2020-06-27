import { SERVER } from '../config';

const PRODUCTS_URL = `${SERVER}/api/v1/product`

export const getProductsByActive = (active = true) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }
    const URL = active ? PRODUCTS_URL : `${PRODUCTS_URL}?filterIsActive=false`;
    return fetch(URL, options)
        .then(res => {
            if (res.status === 200) return res.json();
            return Promise.reject(res.status);
        });
};

export const getAllProducts = async () => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }
    try {
        const activeProducts = await fetch(PRODUCTS_URL, options)
            .then(res => {
                if (res.status === 200) return res.json();
                return Promise.reject(res.status);
            });
        const inActiveProducts = await fetch(`${PRODUCTS_URL}?filterIsActive=false`, options)
            .then(res => {
                if (res.status === 200) return res.json();
                return Promise.reject(res.status);
            });
        return Promise.resolve([...activeProducts, ...inActiveProducts]);
    } catch (err) {
        return Promise.reject(err);
    }

};

export const addProduct = (data) => {
    return fetch(PRODUCTS_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(res => {
        if (res.ok) return res.json();
        return Promise.reject(res.status);
    })
};
export const deleteProduct = (id) => {
    return fetch(`${PRODUCTS_URL}/${id}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => {
        if (res.status === 200) return res.json();
        Promise.resolve()
    })
}

import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card } from '@material-ui/core';

import HeaderDetailsCircles from '../../components/HeaderDetailsCircles';
import HeaderDetails from './../../components/HeaderDetails';
import { getProduct } from '../../services/productService';
import DialogMessage from '../../components/DialogMessage';
import ProductTable from './ProductTable';

const styles = makeStyles(({
    header: {
        display: 'flex',
        flexWrap: 'nowrap'
    }
}))


export const ProductDetails = ({ className, match }) => {
    const { params } = match;
    const classes = styles();
    let [product, setProduct] = useState('');
    let [message, setMessage] = useState({ isOpen: false, text: [] });

    const content = [
        {
            name: 'Produkt',
            value: product.name,
            type: 'h1'
        },
        {
            name: 'Seria',
            value: product.instructionId,
            type: 'p'
        },
        {
            name: 'itemsPerCycle',
            value: product.itemsPerCycle,
            type: 'p'
        },
        {
            name: 'Opis',
            value: product.description,
            type: 'p'
        }
    ]

    const handleCloseMessage = () => {
        setMessage({ isOpen: false, text: [] })
    }

    useEffect(() => {
        getProduct(params.idProduct)
            .then(data => setProduct(data))
            .catch(status => {
                if (status === 404) {
                    setMessage({ isOpen: true, text: ['Sprawdź poprawność linku', 'Błąd przy próbie pobrania informacji'] })
                }
                setMessage({ isOpen: true, text: ['Wystąpił błąd łączności', `Błąd ${status}`, 'spróbuj ponownie'] })
            })

    }, [params.idProduct]);

    return (
        <section className={className}>
            <DialogMessage open={message.isOpen} close={handleCloseMessage} messages={message.text} />
            <Card container component={Grid} className={classes.header}>
                <HeaderDetails content={content} />
                <HeaderDetailsCircles title='Produkcja' id={params.idProduct} type='PRODUCT' setMessage={setMessage} />
            </Card>
            <ProductTable id={params.idProduct} type={'PRODUCT'} />
        </section >
    );
};


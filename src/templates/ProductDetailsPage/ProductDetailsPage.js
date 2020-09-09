import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card } from '@material-ui/core';

import HeaderDetailsCircles from '../../components/HeaderDetailsCircles';
import HeaderDetails from '../../components/HeaderDetails';
import { getProduct, removeProduct, update } from '../../services/ProductService';
import DialogMessage from '../../components/DialogMessage';
import ProductTable from './ProductTable';
import { Redirect } from 'react-router-dom';
import routes from '../../utils/routes';
import { YES, NO } from '../../utils/conts';

const styles = makeStyles(({
    header: {
        display: 'flex',
        flexWrap: 'nowrap'
    }
}))

export const ProductDetailsPage = ({ className, match }) => {
    const { params } = match;
    const classes = styles();
    const [product, setProduct] = useState('');
    const [message, setMessage] = useState({ isOpen: false, text: [] });
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [isExistingProduct, setIsExistingProduct] = useState(true);

    const content = [
        {
            label: 'Produkt',
            value: product.name,
            name: 'name',
            edit: true,
            pattern: '.{1,70}',
            errorMessage: 'Nazwa produktu musi zawierać od 1 do 70 znaków'
        },
        {
            label: 'Seria',
            value: product.instructionId,
            name: 'instructionId',
            edit: true,
            pattern: '.{1,20}',
            errorMessage: 'pole obowiązkowe'
        },
        {
            label: 'ilość na cykl',
            value: product.itemsPerCycle,
            name: 'itemsPerCycle',
            edit: true,
            type: 'number',
            pattern: '^([2-9]|1[0-6])$',
            errorMessage: 'musi być liczbą od 2 do 16'
        },
        {
            label: 'Opis',
            value: product.description,
            name: 'description',
            edit: true,
        },
        {
            label: 'Czy serializowany',
            value: product.isSerialized,
            name: 'isSerialized',
            edit: true,
            type: 'select',
            options: [
                { label: YES, value: true },
                { label: NO, value: false },
            ]
        },
    ]

    const handleCloseMessage = () => {
        setMessage({ isOpen: false, text: [] })
    }

    const handleRemove = () => {
        const answer = window.confirm("Czy na pewno chcesz usunąć produkt?");
        if (!answer) return
        setIsSubmiting(true);
        removeProduct(params.idProduct)
            .then(res => {
                setIsSubmiting(false);
                setMessage({ isOpen: true, text: ['Usunieto produkt'] });
                setTimeout(() => setIsExistingProduct(false), 1500);
            })
            .catch(err => {
                setIsSubmiting(false);
                setMessage({ isOpen: true, text: ['Nie udało się usunąc produktu', `Błąd ${err.status}`] });
            })
    }

    const handleUpdate = (data) => {
        data.isSerialized = true
        update(params.idProduct, data)
            .then(res => {
                setIsSubmiting(false);
                setMessage({ isOpen: true, text: ['Zaktualizowano produkt'] });
                setProduct(res);
            })
            .catch(err => {
                setIsSubmiting(false);
                if (err.status === 409) return setMessage({ isOpen: true, text: ['Numer instrukcji już istnieje w innym produkcie.', `Nie może się powtarzać`] });
                setMessage({ isOpen: true, text: ['Nie udało się zaktualizować produktu', `Błąd ${err.status}`] });
            })
    }

    useEffect(() => {
        setIsSubmiting(true)
        getProduct(params.idProduct)
            .then(data => {
                setIsSubmiting(false);
                setProduct(data);
            })
            .catch(err => {
                setIsSubmiting(false);
                if (err.status === 404) {
                    setMessage({ isOpen: true, text: ['Sprawdź poprawność linku', 'produkt nie istnieje'] });
                    setTimeout(() => setIsExistingProduct(false), 2000);
                }
                setMessage({ isOpen: true, text: ['Wystąpił błąd łączności', `Błąd ${err.status}`, 'spróbuj ponownie'] });
            })

    }, [params.idProduct]);

    return (
        isExistingProduct ?
            <section className={className}>
                <DialogMessage open={message.isOpen} close={handleCloseMessage} messages={message.text} />
                <Card container component={Grid} className={classes.header}>
                    <HeaderDetails content={content} isSubmiting={isSubmiting} onRemove={handleRemove} onChange={handleUpdate} />
                    <HeaderDetailsCircles title='Produkcja' id={params.idProduct} type='PRODUCT' setMessage={setMessage} />
                </Card>
                <ProductTable id={params.idProduct} type={'PRODUCT'} />
            </section > :
            < Redirect to={routes.productManagement} />
    );
};


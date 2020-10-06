import React, { useEffect, useState } from 'react';

import Grid from '@material-ui/core/Grid';

import TableProducts from './TableProducts/TableProducts';
import Loader from '../../components/Loader';
import DialogMessage from '../../components/DialogMessage';
import { getProductsByActive, removeProduct, addProduct } from '../../services/ProductService';
import PanelProductsList from './PanelProductsList';
import AddFormDialog from '../../components/AddFormDialog';
import HeaderPage from '../../components/HeaderPage';


const options = {
    active: {
        value: 'active',
        name: 'aktywne'
    },
    inActive: {
        value: 'inActive',
        name: 'nieaktywne'
    },
    all: {
        value: 'all',
        name: 'wszystko'
    }
}

const fieldsAddProduct = [
    {
        name: 'name',
        type: 'text',
        label: 'nazwa produktu',
        pattern: '.{1,70}',
        errorMessage: 'Nazwa produktu musi zawierać od 1 do 70 znaków'
    },
    {
        name: 'instructionId',
        label: 'numer instrukcji',
        type: 'string',
        pattern: '.{1,20}',
        errorMessage: 'pole obowiązkowe'
    },
    {
        name: 'itemsPerCycle',
        label: 'Przedmioty na cykl',
        type: 'number',
        pattern: '^([2-9]|1[0-6])$',
        errorMessage: 'musi być liczbą od 2 do 16'
    },
    {
        name: 'isSerialized',
        label: 'serializacja',
        type: 'select',
        errorMessage: 'pole obowiązkowe',
        pattern: '^([Tt][Rr][Uu][Ee]|[Ff][Aa][Ll][Ss][Ee])$',
        options: [
            {
                value: true,
                label: 'TAK'
            },
            {
                value: false,
                label: 'NIE'
            }
        ]
    },
    {
        name: 'description',
        label: 'opis',
        type: 'text',
        errorMessage: ''
    },
];

export const ProductManagement = ({ className }) => {


    let [products, setProducts] = useState({
        active: {
            list: [],
            fetched: false
        },
        inActive: {
            list: [],
            fetched: false
        },
    });

    let [filterProducts, setFiletrProducts] = useState(options.active.value);
    let [isLoaded, setIsLoaded] = useState(false);
    let [alert, setAlert] = useState(false);
    let [alertMessage, setAlertMessage] = useState(null);

    useEffect(() => {
        if (products.active.fetched && products.inActive.fetched) return;
        if (filterProducts === options.all.value) {
            const PromisesProducts = [];
            products.active.fetched ? PromisesProducts.push(Promise.resolve(false)) : PromisesProducts.push(getProductsByActive());
            products.inActive.fetched ? PromisesProducts.push(Promise.resolve(false)) : PromisesProducts.push(getProductsByActive(false));
            Promise.all(PromisesProducts).then(responseList => {
                setProducts(prevState => {
                    const active = responseList[0] ? {
                        active: {
                            list: responseList[0],
                            fetched: true
                        },
                    } : { ...prevState.active };
                    const inActive = responseList[1] ? {
                        inActive: {
                            list: responseList[1],
                            fetched: true
                        },
                    } : { ...prevState.inActive };
                    return {
                        ...prevState,
                        ...active,
                        ...inActive
                    }
                });
            }).catch(err => {
                setAlertMessage(['wystapił błąd podczas pobierania produktów']);
                setAlert(true);
            })
        } else {
            if (!products.hasOwnProperty(filterProducts) || products[filterProducts].fetched) return;
            const isGetActive = filterProducts === options.active.value ? true : false;
            getProductsByActive(isGetActive).then(data => {
                setProducts(prevState => ({
                    ...prevState,
                    [filterProducts]: {
                        list: data,
                        fetched: true
                    }
                }))
            }).catch(err => {
                setAlertMessage(['wystapił błąd podczas pobierania produktów']);
                setAlert(true);
            })
        }
        return () => {
            setIsLoaded(false);
        };
    }, [filterProducts, products]);

    const updateProducts = () => {
        if (products.active.fetched) {
            getProductsByActive().then(data => {
                setIsLoaded(false);
                setProducts(prevState => ({
                    ...prevState,
                    active: {
                        list: data,
                        fetched: true
                    }
                }))
            }).catch(err => {
                setAlertMessage(['wystapił błąd podczas pobierania produktów']);
                setAlert(true);
                setIsLoaded(false);
            })
        } else if (products.active.fetched) {
            getProductsByActive(false).then(data => {
                setIsLoaded(false);
                setProducts(prevState => ({
                    ...prevState,
                    inActive: {
                        list: data,
                        fetched: true
                    }
                }))
            }).catch(err => {
                setAlertMessage(['wystapił błąd podczas pobierania produktów']);
                setAlert(true);
                setIsLoaded(false);
            })
        }
    }

    const closeAlert = () => {
        setAlert(false);
        setAlertMessage(null);
    }

    const removeProducts = (idArr) => {
        setIsLoaded(true);
        const promiesList = idArr.map(product => removeProduct(product.id))
        Promise.all(promiesList)
            .then(results => {
                const messages = ['Usunięto produkty'];
                results.forEach(product => messages.push(`${product.name} ${product.description}`));
                setIsLoaded(false);
                setAlertMessage(messages);
                setAlert(true);
                updateProducts();
            })
            .catch(err => {
                const messages = [
                    'Wystąpił błąd podczas usuwania produktów'
                ];
                setIsLoaded(false);
                setAlertMessage(messages);
                setAlert(true);
            });
    }

    const handleAddProduct = (data) => {
        setIsLoaded(true);
        addProduct(data).then(data => {
            setIsLoaded(false);
            updateProducts();
            setAlertMessage(['Dodano produkt', `${data.name} ${data.description}`]);
            setAlert(true);
        })
            .catch(err => {
                setIsLoaded(false);
                const message = err.status === 409 ? 'Istnieje już produkt z wartością nazwy lub instrukcji' : `błąd ${err.status}`;
                setAlertMessage(['Nie udało się dodać produktu', message]);
                setAlert(true);
            })
    };

    const renderList = () => {
        if (filterProducts === options.all.value) {
            return [...products.active.list, ...products.inActive.list]
        }
        return products[filterProducts].list;
    }
    return (
        <Grid container component='section' direction='column' className={className}>
            <DialogMessage open={alert} close={closeAlert} messages={alertMessage} />
            <Grid item>
                <HeaderPage title='Produkty'></HeaderPage>
            </Grid>
            <Grid container>
                <Grid item>
                    <PanelProductsList setFilter={setFiletrProducts} value={filterProducts} options={options} />
                </Grid>
                <Grid item>
                    <AddFormDialog onSubmit={handleAddProduct} fields={fieldsAddProduct} button='Dodaj produkt' title='Dodaj produkt' />
                </Grid>
            </Grid>
            <Grid item>
                <TableProducts list={renderList()} remove={removeProducts}></TableProducts>
            </Grid>
            <Loader open={isLoaded} />
        </Grid>
    );
};

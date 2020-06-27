import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TableProducts from './TableProducts/TableProducts';
import Loader from '../../components/Loader';
import DialogMessage from '../../components/DialogMessage';
import { getProductsByActive, deleteProduct, addProduct } from '../../services/productRequest';
import PanelProductsList from './PanelProductsList';
import AddFormDialog from '../../components/AddFormDialog';
const useStyles = makeStyles(theme => ({
    header: {
        backgroundColor: '#222d32',
        color: '#fff',
        padding: 10
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 180,
    },
}));
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
        pattern: '.{3,20}',
        errorMessage: 'Nazwa produktu musi zawierać od 1 do 20 znaków'
    },
    {
        name: 'description',
        label: 'opis',
        type: 'text',       
        errorMessage: ''
    },
    // {
    //     name: 'desc',
    //     label: 'opis',
    //     type: 'text',
    //     errorMessage: ''
    // },
];

export const ProductManagement = () => {
    const classes = useStyles();

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
            setIsLoaded(true);
            Promise.all(PromisesProducts).then(responseList => {
                setIsLoaded(false);
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
                setIsLoaded(false);
            })
        } else {
            if (!products.hasOwnProperty(filterProducts) || products[filterProducts].fetched) return;
            setIsLoaded(true);
            const isGetActive = filterProducts === options.active.value ? true : false;
            getProductsByActive(isGetActive).then(data => {
                setIsLoaded(false);
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
                setIsLoaded(false);
            })
        }
        return () => {
            setIsLoaded();
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
        const promiesList = idArr.map(product => deleteProduct(product.id))
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
    };

    const renderList = () => {
        if (filterProducts === options.all.value) {
            return [...products.active.list, ...products.inActive.list]
        }
        return products[filterProducts].list;
    }
    return (
        <Grid container component='section' direction='column'>
            <DialogMessage open={alert} close={closeAlert} messages={alertMessage} />
            <Grid item>
                <Typography component='h2' align='center' variant='button' className={classes.header}>
                    Produkty
                </Typography>
            </Grid>
            <Grid container>
                <Grid item>
                    <PanelProductsList setFilter={setFiletrProducts} value={filterProducts} options={options} />
                </Grid>
                <Grid item>
                    <AddFormDialog onSubmit={handleAddProduct} fields={fieldsAddProduct} button='Dodaj produkt' />
                </Grid>
            </Grid>
            <Grid item>
                <TableProducts list={renderList()} remove={removeProducts}></TableProducts>
            </Grid>
            <Loader open={isLoaded} />
        </Grid>
    );
};


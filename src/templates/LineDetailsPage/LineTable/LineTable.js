import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';

import statistics from '../../../services/statisticsService';
import TableDetails from '../../../components/TableDetails';
import ButtonLoader from '../../../components/ButtonLoader';
import DateTimePicker from '../../../components/DateTimePicker';
import { subtractionDate } from '../../../helpers/dateHelper';
import DialogMessage from '../../../components/DialogMessage';
import { getProductsByActive } from './../../../services/ProductService';

const useStyles = makeStyles(({
    root: {
        padding: 20,
        flexWrap: 'nowrap'
    },
    tableContainer: {
        flexGrow: 1,
        margin: '0 20px'
    },
    panelFilter: {
        display: 'flex',
        flexDirection: 'column'
    },
    date: {
        marginTop: 10,
        flexWrap: 'nowrap'
    },
    button: {
        padding: '15px 25px',
        alignSelf: 'center',
    },
    seriesInput: {
        margin: '10px 0'
    }
}));



const headersTable = [' ', 'Ilość wyprodukowana', 'Wydajność', 'Prędkość', 'Wydajność na godzinę'];

const StatisticsContainer = ({ id, type }) => {

    const classes = useStyles();
    let [dateStart, setDateStart] = useState(subtractionDate(30));
    let [dateEnd, setDateEnd] = useState(subtractionDate(0));
    let [isFetching, setFetching] = useState(false);
    let [message, setMessage] = useState({ isOpen: false, text: [] });
    let [dataTable, setDataTable] = useState(['Brak produktów spełniających kryteria', "0", "s", "d", "d"]);
    let [seriesFilter, setSeriesFilter] = useState('');
    const [products, setProducts] = useState([]);
    const [productFilter, setProductFilter] = useState('');

    console.log('dataTable', dataTable)
    useEffect(() => {
        setFetching(true)
        getProductsByActive()
            .then(products => {
                setFetching(false);
                setProducts(products);
            })
            .catch(err => {
                setFetching(false);
                setMessage({ isOpen: true, text: [`Błąd ${err.status}`] });
            })
    }, [])
    if (!id || !type) return;

    const handleCloseMessage = () => {
        setMessage({ isOpen: false, text: [] })
    }

    const handleChangeProductFilter = (e) => {
        setProductFilter(e.target.value);
    };

    const handleSeriesFilter = ({ target }) => {
        setSeriesFilter(target.value)
    }

    const getReportByProduct = async () => {

        const data = {
            start: dateStart,
            end: dateEnd,
            id: [id],
            type,
            options: {}
        }
        if (seriesFilter) data.options.series = seriesFilter;

        setFetching(true);

        if (productFilter) {
            try {
                data.options['product'] = productFilter;
                const stats = await statistics.createCircle(data);
                const row = [stats.options.product, stats.options.totalProduced, `${stats.options.percentage}%`, stats.options.averageSpeed, stats.options.averagePerHour];
                setFetching(false);
                return setDataTable([row]);
            } catch (err) {
                setFetching(false);
                setMessage({
                    isOpen: true,
                    text: ['Wystąpił błąd pobierania', `Błąd ${err}`]
                });
            }

        }

        const productRequests = products.map(product => {
            data.options['product'] = product.id
            return statistics.createCircle(data)
        })
        delete data.options.product;

        //summary
        productRequests.push(statistics.createCircle(data));

        Promise.all(productRequests)
            .then(dataArr => {
                const rows = [];
                setFetching(false);
                dataArr.forEach(data => {
                    if (data.options.totalProduced === 0) return;
                    const name = data.options.product ? data.options.product : 'Total';
                    const row = [name, data.options.totalProduced, `${data.options.percentage}%`, data.options.averageSpeed, data.options.averagePerHour];
                    rows.push(row);
                })
                if (rows.length === 0) rows.push(['Brak produktów spełniających kryteria', 0, 0, 0, 0])
                setDataTable(rows);
            })
            .catch(err => {
                setFetching(false);
                setMessage({
                    isOpen: true,
                    text: ['Wystąpił błąd pobierania', `Błąd ${err}`]
                })
            })
    }


    return (
        <Grid container className={classes.root}>
            <DialogMessage open={message.isOpen} close={handleCloseMessage} messages={message.text} />
            <Grid className={classes.panelFilter}>
                <DateTimePicker date={dateStart} setDate={setDateStart} name='Czas początkowy' className={classes.date} />
                <DateTimePicker date={dateEnd} setDate={setDateEnd} name='Czas końcowy' className={classes.date} />
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="lineId">Produkt</InputLabel>
                    <Select
                        labelId="lineId"
                        id="lineSelect"
                        value={productFilter || ''}
                        onChange={handleChangeProductFilter}
                        name='product'
                        label="Produkt"
                    >
                        <MenuItem value=''>&nbsp;</MenuItem>
                        {products.map(({ id, name }) => (
                            <MenuItem key={`Produkt${id}`} value={id}>{name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField label="Filtruj po serii" variant="outlined" className={classes.seriesInput} onChange={handleSeriesFilter} value={seriesFilter} />
                <ButtonLoader onClick={getReportByProduct} className={classes.button} value='Pobierz dane' isSubmitting={isFetching} />
            </Grid>
            <Grid className={classes.tableContainer}>
                <TableDetails headers={headersTable} rows={dataTable ? dataTable : []} />
            </Grid>
        </Grid>
    );
};

export default StatisticsContainer;
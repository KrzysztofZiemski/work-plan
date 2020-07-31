import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { subtractionDate } from '../../../helpers/dateHelper';
import { TextField, Select, InputLabel, FormControl, FormHelperText, MenuItem } from '@material-ui/core';

import DateTimePicker from '../../../components/DateTimePicker';
import DialogMessage from '../../../components/DialogMessage';
import statistics from '../../../services/statisticsService';
import TableDetails from '../../../components/TableDetails';
import ButtonLoader from '../../../components/ButtonLoader';
import LineService from '../../../services/LineService';


const headersTable = [' ', 'Ilość wyprodukowana', 'Wydajność', 'Prędkość', 'Wydajność na godzinę'];

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


export const ProductTable = ({ id, type }) => {
    const classes = useStyles();
    let [dateStart, setDateStart] = useState(subtractionDate(30));
    let [dateEnd, setDateEnd] = useState(subtractionDate(0));
    let [isFetching, setFetching] = useState(false);
    let [message, setMessage] = useState({ isOpen: false, text: [] });
    let [dataTable, setDataTable] = useState([]);
    let [linesFilter, setLinesFilter] = useState('');
    let [linesList, setLinesList] = useState([]);

    useEffect(() => {
        console.log(LineService)
        LineService.getAllLines()
            .then(data => setLinesList(data))
            .catch(err => setMessage({ isOpen: true, text: ['Wystąpił błąd podczas wczytywania zasobu', `Błąd ${err}`] }))
    }, [])

    if (!id || !type) return;

    const handleCloseMessage = () => {
        setMessage({ isOpen: false, text: [] })
    }
    const handleChangeLine = (e) => {
        //trzeba zmienić na select
        const name = e.target.name;
        const value = e.target.value;
        setLinesFilter(prevState => ({ ...prevState, [name]: value }))
    }

    const getReportProduct = async () => {

        const data = {
            start: dateStart,
            end: dateEnd,
            id: [id],
            type,
            options: {}
        }
        const x = await statistics.create(data)
        setFetching(true);

        console.log('response', x)


        // .then(dataArr => {
        //     const rows = [];
        //     setFetching(false);
        //     dataArr.forEach(data => {
        //         if (data.options.totalProduced === 0) return;
        //         const name = data.options.product ? data.options.product : 'Total';
        //         const row = [name, data.options.totalProduced, `${data.options.percentage}%`, data.options.averageSpeed, data.options.averagePerHour];
        //         rows.push(row);
        //     })
        //     if (rows.length === 0) rows.push(['Brak produktów spełniających kryteria', 0, 0, 0, 0])
        //     setDataTable(rows);
        // })
        // .catch(err => {
        //     setFetching(false);
        //     setMessage({
        //         isOpen: true,
        //         text: ['Wystąpił błąd pobierania', `Błąd ${err}`]
        //     })
        // })
    }


    return (

        <Grid container className={classes.root}>
            <DialogMessage open={message.isOpen} close={handleCloseMessage} messages={message.text} />
            <Grid className={classes.panelFilter}>
                <DateTimePicker date={dateStart} setDate={setDateStart} name='Czas początkowy' className={classes.date} />
                <DateTimePicker date={dateEnd} setDate={setDateEnd} name='Czas końcowy' className={classes.date} />
                <ButtonLoader onClick={getReportProduct} className={classes.button} value='Pobierz dane' isSubmitting={isFetching} />
            </Grid>
            <Grid className={classes.tableContainer}>
                <TableDetails headers={headersTable} rows={dataTable ? dataTable : []} />
            </Grid>
        </Grid>

    );
};


import React, { useEffect, useState, useMemo } from 'react';
import MUIDataTable from "mui-datatables";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Loader from '../Loader';
import DialogMessage from '../DialogMessage';
import LineService from '../../services/LineService';
import SettingsMenu from '../SettingsMenu';
import Poper from '../Poper';
import { default as routes } from '../../utils/routes';
import { sortProvider } from '../../helpers/dataTableHelpers';

const headerNames = [
    {
        name: 'lineId',
        label: 'linia',
        download: true,
    },
    {
        name: 'productionStart',
        download: true,
        label: 'początek produkcji'
    },
    {
        name: 'productionEnd',
        download: true,
        label: 'koniec produkcji'
    },
    {
        name: 'productionTimeToHour',
        download: true,
        label: 'czas pracy'
    },
    {
        name: 'product',
        download: true,
        label: 'produkt'
    },
    {
        name: 'series',
        download: true,
        label: 'seria'
    },
    {
        name: 'totalQuantityProduced',
        label: 'wyprodukowano',
        download: true,
    },
    {
        name: 'maxPossibleItems',
        label: 'maksymalna ilość',
        download: false,
    },
    {
        name: 'percentagePerformance',
        download: true,
        label: 'OEE'
    },
    {
        name: 'performancePerHour',
        download: true,
        label: 'wydajność/h'
    },
    {
        name: 'speedMachinePerCycle',
        download: true,
        label: 'szybkość'
    },

    {
        name: 'firstWorkplace',
        download: true,
        label: 'stanowisko 1'
    },
    {
        name: 'secondWorkplace',
        download: true,
        label: 'stanowisko 2'
    },
    {
        name: 'thirdWorkplace',
        download: true,
        label: 'stanowisko 3'
    },
    {
        name: 'id',
        download: false,
        label: ' '
    },
    {
        name: 'description',
        download: false,
    }
];

const options = {
    rowsPerPageOptions: [5, 20, 50],
    rowsPerPage: 20,
    filter: true,
    responsive: 'standard',
    filterType: "dropdown",
    selectableRows: false,
    pagination: true,
    print: true,
    download: true,
    search: true,
    sort: true,
    downloadOptions: {
        filename: 'raporty.csv',
        separator: ';',
        filterOptions: {
            useDisplayedColumnsOnly: true,
            useDisplayedRowsOnly: true,
        },
    },
    onDownload: (buildHead, buildBody, columns, data) => {
        for (let i = 0; i < data.length; i++) {
            data[i].data[4] = data[i].data[4].name
            data[i].data[10] = data[i].data[10].name
            data[i].data[11] = data[i].data[11].name
            data[i].data[12] = data[i].data[12].name
        }
        return "\uFEFF" + buildHead(headerNames) + buildBody(data);
    },
    onPrint: (buildHead, buildBody, columns, data) => {

        for (let i = 0; i < data.length; i++) {
            data[i].data[4] = data[i].data[4].name
            data[i].data[10] = data[i].data[10].name
            data[i].data[11] = data[i].data[11].name
            data[i].data[12] = data[i].data[12].name
        }
        return "\uFEFF" + buildHead(headerNames) + buildBody(data);
    },
    textLabels: {
        body: {
            noMatch: "Brak wyników",
        },
        pagination: {
            next: "Następna strona",
            previous: "Poprzednia strona",
            rowsPerPage: "Ilość pozycji na stronie:",
            displayRows: "z",
        },
        toolbar: {
            search: "Szukaj",
            downloadCsv: "Pobierz CSV",
            print: "Drukuj",
            viewColumns: "Widok kolumn",
            filterTable: "Filtruj tabele",
        },
        filter: {
            all: "Wszystko",
            title: "Filtry",
            reset: "zresetuj",
        },
    },
};


const styles = makeStyles({
    optionLink: {
        color: 'black',
        fontFamily: 'Roboto, Helvetica, Arial, sans- serif',
        lineHeight: '1.5',
        textDecoration: 'none',
        letterSpacing: '0.00938em',
        fontSize: '1rem'
    },
    linkInTable: {
        textDecoration: 'none',
        color: 'black',
        fontSize: '0.875rem',
        '&:hover': {
            color: '#3C8DBC',
            textDecoration: 'underline'
        }
    }
});

export const ReportsList = ({ list, remove, fullHeight, className, isFetching }) => {
    const classes = styles();
    let [message, setMessage] = useState([]);
    let [messageIsOpen, setMessageIsOpen] = useState(false);
    let [lines, setLines] = useState([]);
    const handleCloseMessage = () => {
        setMessageIsOpen(false);
        setMessage([]);
    }

    useEffect(() => {
        LineService.getAllLines()
            .then(data => setLines(data))
            .catch(err => {
                setMessage(['błąd połączenia', err]);
                setMessageIsOpen(true);
            })
    }, []);

    const columns = useMemo(() => {
        return (
            [
                {
                    name: 'lineId',
                    label: 'Linia',
                    options: {
                        filter: true,
                        sort: true,
                        print: true,
                        download: true,
                        expandableRowsHeader: true,
                        customBodyRender: (value, tableMeta, updateValue) => {
                            const lineName = lines.filter(line => line.id === value);
                            return (
                                lineName[0] && <Typography className={classes.linkInTable} component={Link} to={`${routes.lineDetails}/${value}`}>{lineName[0].name}</Typography>
                            )
                        },
                    },
                },
                {
                    name: 'productionStart',
                    label: 'Początek produkcji',
                    options: {
                        filter: true,
                        sort: true,
                        print: true,
                        download: true,
                        expandableRowsHeader: true,
                        customBodyRender: (value, tableMeta, updateValue) => value.substring(0, 16).replace('T', ' ')
                    },
                },
                {
                    name: 'productionEnd',
                    label: 'Koniec produkcji',
                    options: {
                        filter: true,
                        sort: true,
                        print: true,
                        download: true,
                        expandableRowsHeader: true,
                        customBodyRender: (value, tableMeta, updateValue) => value.substring(0, 16).replace('T', ' ')
                    },
                },
                {
                    name: 'productionTimeToHour',
                    label: 'Czas pracy',
                    options: {
                        filter: true,
                        sort: false,
                        expandableRowsHeader: true,
                        customBodyRender: (value, tableMeta, updateValue) => {
                            const hours = Math.floor(value);
                            const minutes = Math.floor(60 * (value - hours))
                            return `${hours} h ${minutes} min`
                        },
                    },
                },
                {
                    name: 'product',
                    label: 'Produkt',
                    options: {
                        filter: true,
                        sort: true,
                        print: true,
                        download: true,
                        expandableRowsHeader: true,
                        customBodyRender: (value, tableMeta, updateValue) => {
                            return (
                                <Typography className={classes.linkInTable} component={Link} to={`${routes.productDetails}/${value.id}`}>{value.name}</Typography>
                            )
                        },
                        sortCompare: sortProvider('name')
                    },
                },
                {
                    name: 'series',
                    label: 'Seria',
                    options: {
                        filter: true,
                        sort: false,
                    },
                },
                {
                    name: 'totalQuantityProduced',
                    label: 'Wyprodukowano',
                    options: {
                        filter: true,
                        sort: true,
                        print: true,
                        download: true,
                        expandableRowsHeader: true,
                        customBodyRender: (value, tableMeta, updateValue) => `${value} / ${tableMeta.rowData[7]}`,
                    },
                },
                {
                    name: 'maxPossibleItems',
                    label: 'Maksymalna ilość',
                    options: {
                        filter: true,
                        sort: true,
                        print: true,
                        download: true,
                        display: false
                    },
                },
                {
                    name: 'percentagePerformance',
                    label: 'OEE',
                    options: {
                        filter: true,
                        sort: true,
                        print: true,
                        download: true,
                        expandableRowsHeader: true,
                        customBodyRender: (value, tableMeta, updateValue) => `${value}`
                    },
                },
                {
                    name: 'performancePerHour',
                    label: 'Wydajność/h',
                    options: {
                        filter: true,
                        sort: true,
                        print: true,
                        download: true,
                        expandableRowsHeader: true,
                        customBodyRender: (value, tableMeta, updateValue) => `${value}`
                    },
                },

                {
                    name: 'speedMachinePerCycle',
                    label: 'Takty/mi',
                    options: {
                        filter: true,
                        sort: false,
                    },
                },

                {
                    name: 'firstWorkplace',
                    label: 'Stanowisko 1',
                    options: {
                        filter: true,
                        sort: true,
                        print: true,
                        download: true,
                        expandableRowsHeader: true,
                        customBodyRender: (value, tableMeta, updateValue) => (
                            <Typography className={classes.linkInTable} component={Link} to={`${routes.employeeDetails}/${value.id}`}>
                                {`${value.name} ${value.lastName}`}
                            </Typography>
                        ),
                        sortCompare: sortProvider('lastName')
                    },
                },
                {
                    name: 'secondWorkplace',
                    label: 'Stanowisko 2',
                    options: {
                        filter: true,
                        sort: true,
                        print: true,
                        download: true,
                        expandableRowsHeader: true,
                        customBodyRender: (value, tableMeta, updateValue) => (
                            <Typography className={classes.linkInTable} component={Link} to={`${routes.employeeDetails}/${value.id}`}>
                                {`${value.name} ${value.lastName}`}
                            </Typography>
                        ),
                        sortCompare: sortProvider('lastName')
                    },
                },
                {
                    name: 'thirdWorkplace',
                    label: 'Stanowisko 3',
                    options: {
                        filter: true,
                        sort: true,
                        print: true,
                        download: true,
                        expandableRowsHeader: true,
                        customBodyRender: (value, tableMeta, updateValue) => (
                            <Typography className={classes.linkInTable} component={Link} to={`${routes.employeeDetails}/${value.id}`}>
                                {`${value.name} ${value.lastName}`}
                            </Typography>
                        ),
                        sortCompare: sortProvider('lastName')
                    },
                },
                {
                    name: 'description',
                    download: false,
                    options: {
                        filter: false,
                        sort: false,
                        print: false,
                        download: false,
                        expandableRowsHeader: true,
                        display: false
                    },
                },
                {
                    name: 'id',
                    label: ' ',
                    options: {
                        filter: false,
                        sort: false,
                        print: false,
                        download: false,
                        expandableRowsHeader: true,
                        customBodyRender: (value, tableMeta, updateValue) => {
                            return (
                                <SettingsMenu>
                                    {tableMeta.rowData[14] && <Poper content={tableMeta.rowData[14]}>Pokarz opis</Poper>}
                                    <Poper>
                                        <Typography className={classes.optionLink} component={Link} to={`${routes.productionReportDetail}/${value}`}>Szczegóły</Typography>
                                    </Poper>
                                    {remove && <Typography onClick={() => remove(value)} className={classes.optionLink}>Usuń</Typography>}
                                </SettingsMenu>
                            )
                        },
                    },
                },
            ]
        )
    }, [classes.linkInTable, classes.optionLink, lines, remove])

    return (

        list ? <Grid className={className}>
            <Loader open={isFetching} />
            <DialogMessage open={messageIsOpen} close={handleCloseMessage} messages={message} />
            <MUIDataTable
                title={"Lista raportów"}
                data={list}
                columns={columns}
                options={options}
            />
        </Grid> :
            <Loader open={isFetching} />
    )
}
import React, { useEffect, useState, useMemo } from 'react';
import MUIDataTable from "mui-datatables";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Loader from '../../../components/Loader';
import DialogMessage from '../../../components/DialogMessage';
import ProductionReportService from '../../../services/ProductionReportService';
import LineService from '../../../services/LineService';
import SettingsMenu from '../../../components/SettingsMenu';
import Poper from '../../../components/Poper';
import { default as routes } from '../../../utils/routes';

const headerNames = [
    {
        name: 'lineId',
        label: 'linia',
        download: true,
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
        label: 'procent'
    },
    {
        name: 'performancePerHour',
        download: true,
        label: 'wydajność'
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
        name: 'speedMachinePerCycle',
        download: true,
        label: 'szybkość'
    },
    {
        name: 'productionTimeToHour',
        download: true,
        label: 'czas pracy'
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
        name: 'id',
        download: false,
        label: ' '
    },
    {
        name: 'description',
        download: false,
    }
];
const styles = makeStyles({
    optionLink: {
        color: 'black',
        fontFamily: 'Roboto, Helvetica, Arial, sans- serif',
        lineHeight: '1.5',
        textDecoration: 'none',
        letterSpacing: '0.00938em',
        fontSize: '1rem'
    }
})
export const ReportsList = ({ startDate, endDate, fullHeight, pagination = 20 }) => {
    const classes = styles();
    let [reportsList, setReportsList] = useState([]);
    let [fetching, setFetching] = useState(false);
    let [message, setMessage] = useState([]);
    let [messageIsOpen, setMessageIsOpen] = useState(false);
    let [lines, setLines] = useState([]);

    const handleCloseMessage = () => {
        setMessageIsOpen(false);
        setMessage([]);

    }

    useEffect(() => {
        const sorterByNewest = (a, b) => new Date(b.productionEnd).getTime() - new Date(a.productionEnd).getTime();
        LineService.getAllLines()
            .then(data => setLines(data));

        if (startDate && endDate) {
            ProductionReportService.getBetween(startDate, endDate)
                .then(data => setReportsList(data.sort(sorterByNewest)))
                .catch(err => {
                    setMessage(['błąd połączenia']);
                    setMessageIsOpen(true);
                });
        } else {
            ProductionReportService.getAll()
                .then(data => setReportsList(data.sort(sorterByNewest)))
                .catch(err => {
                    setMessage(['błąd połączenia']);
                    setMessageIsOpen(true)
                });
        }
    }, [startDate, endDate]);

    const remove = async (id) => {
        const confirm = window.confirm("Czy na pewno chcesz usunąc raport?");
        if (!confirm) return;
        setFetching(true);
        try {
            await ProductionReportService.remove(id);
            setFetching(false);
            setReportsList(prevState => prevState.filter(report => report.id !== id));
            setMessage(['Usunieto raport']);
            setMessageIsOpen(true);
        } catch (status) {
            setMessage(['Wystąpił problem z usunieciem raportu', `status ${status}`]);
            setMessageIsOpen(true);
            setFetching(false);
        };
    };

    const options = {
        rowsPerPageOptions: [5, 20, 50],
        rowsPerPage: pagination,
        filter: true,
        responsive: 'standard',
        filterType: "dropdown",
        selectableRows: false,
        pagination: true,
        print: true,
        download: true,
        search: true,
        sort: false,
        downloadOptions: {
            filename: 'raporty.csv',
            separator: ';',
            filterOptions: {
                useDisplayedColumnsOnly: true,
                useDisplayedRowsOnly: true,
            },
        },
        onDownload: (buildHead, buildBody, columns, data) => {
            return "\uFEFF" + buildHead(headerNames) + buildBody(data);
        },
    };
    const columns = useMemo(() => {
        return (
            [
                {
                    name: 'lineId',
                    label: 'linia',
                    options: {
                        filter: true,
                        sort: true,
                        print: true,
                        download: true,
                        expandableRowsHeader: true,
                        customBodyRender: (value, tableMeta, updateValue) => {
                            const lineName = lines.filter(line => line.id === value);
                            return lineName.length === 1 ? lineName[0].name : `id ${value}`
                        },
                    },
                },
                {
                    name: 'totalQuantityProduced',
                    label: 'wyprodukowano',
                    options: {
                        filter: true,
                        sort: true,
                        print: true,
                        download: true,
                        expandableRowsHeader: true,
                        customBodyRender: (value, tableMeta, updateValue) => `${value} / ${tableMeta.rowData[2]}`
                    },
                },
                {
                    name: 'maxPossibleItems',
                    label: 'maksymalna ilość',
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
                    label: 'procent',
                    options: {
                        filter: true,
                        sort: true,
                        print: true,
                        download: true,
                        expandableRowsHeader: true,
                        customBodyRender: (value, tableMeta, updateValue) => `${value}%`
                    },
                },
                {
                    name: 'performancePerHour',
                    label: 'wydajność',
                    options: {
                        filter: true,
                        sort: true,
                        print: true,
                        download: true,
                        expandableRowsHeader: true,
                        customBodyRender: (value, tableMeta, updateValue) => `${value} / h`
                    },
                },
                {
                    name: 'product',
                    label: 'produkt',
                    options: {
                        filter: true,
                        sort: true,
                        print: true,
                        download: true,
                        expandableRowsHeader: true,
                        customBodyRender: (value, tableMeta, updateValue) => value.name
                    },
                },
                {
                    name: 'series',
                    label: 'seria',
                    options: {
                        filter: true,
                        sort: false,
                    },
                },
                {
                    name: 'speedMachinePerCycle',
                    label: 'szybkość',
                    options: {
                        filter: true,
                        sort: false,
                    },
                },
                {
                    name: 'productionTimeToHour',
                    label: 'czas pracy',
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
                    name: 'firstWorkplace',
                    label: 'stanowisko 1',
                    options: {
                        filter: true,
                        sort: true,
                        print: true,
                        download: true,
                        expandableRowsHeader: true,
                        customBodyRender: (value, tableMeta, updateValue) => `${value.name} ${value.lastName}`
                    },
                },
                {
                    name: 'secondWorkplace',
                    label: 'stanowisko 2',
                    options: {
                        filter: true,
                        sort: true,
                        print: true,
                        download: true,
                        expandableRowsHeader: true,
                        customBodyRender: (value, tableMeta, updateValue) => `${value.name} ${value.lastName}`
                    },
                },
                {
                    name: 'thirdWorkplace',
                    label: 'stanowisko 3',
                    options: {
                        filter: true,
                        sort: true,
                        print: true,
                        download: true,
                        expandableRowsHeader: true,
                        customBodyRender: (value, tableMeta, updateValue) => `${value.name} ${value.lastName}`
                    },
                },
                {
                    name: 'productionStart',
                    label: 'początek produkcji',
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
                    label: 'koniec produkcji',
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
                            console.log(value, tableMeta, updateValue)
                            return (
                                <SettingsMenu>
                                    <Poper content={tableMeta.rowData[14]}>Pokarz opis</Poper>
                                    <Poper>
                                        <Typography className={classes.optionLink} component={Link} to={`${routes.productionReportDetail}/${value}`}>Szczegóły</Typography>
                                    </Poper>
                                    <Typography onClick={() => remove(value)} className={classes.optionLink}>Usuń</Typography>
                                </SettingsMenu>
                            )
                        },
                    },
                },
            ]
        )
    }, [classes.optionLink, lines])

    return (
        <Grid>
            <Loader open={fetching} />
            <DialogMessage open={messageIsOpen} close={handleCloseMessage} messages={message} />
            <MUIDataTable
                title={"Lista raportów"}
                data={reportsList}
                columns={columns}
                options={options}
            />
        </Grid>
    )
}
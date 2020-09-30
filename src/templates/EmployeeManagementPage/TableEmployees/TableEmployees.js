import React, { useMemo } from 'react';
import MUIDataTable from "mui-datatables";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { Link } from 'react-router-dom';
import routes from '../../../utils/routes';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SettingsMenu from '../../../components/SettingsMenu';
import Poper from '../../../components/Poper';
import { statisticsTypes } from '../../../utils/conts';

const useStyles = makeStyles(({
    linkInTable: {
        textDecoration: 'none',
        color: 'black',
        fontSize: '0.875rem',
        '&:hover': {
            color: '#3C8DBC',
            textDecoration: 'underline'
        }
    },
    optionLink: {
        color: 'black',
        fontFamily: 'Roboto, Helvetica, Arial, sans- serif',
        lineHeight: '1.5',
        textDecoration: 'none',
        letterSpacing: '0.00938em',
        fontSize: '1rem'
    },
}));

const headerNames = [
    {
        name: 'id',
        download: false,
        print: false,
    },
    {
        name: 'name',
        download: true,
        print: true,
        label: 'imię'
    },
    {
        name: 'lastName',
        download: true,
        print: true,
        label: 'nazwisko'
    },
    {
        name: 'isActive',
        download: true,
        print: true,
        label: 'status'
    },
    {
        name: 'settings',
        download: false,
        print: false
    },
];


const TableEmployees = ({ list, remove }) => {

    const classes = useStyles();

    const columns = useMemo(() => [
        {
            name: 'id',
            label: 'id',
            options: {
                filter: false,
                sort: false,
                display: false,
                customBodyRender: () => <AccountBoxIcon />
            }
        },

        {
            name: 'name',
            label: 'Imię',
            options: {
                filter: true,
                sort: true,
                customFilterListOptions: {
                    render: v => v.map(l => l.toUpperCase())
                },
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <Typography className={classes.linkInTable} component={Link} to={`${routes.employeeDetails}/${tableMeta.rowData[0]}`}>
                        {value}
                    </Typography>
                }
            },
        },
        {
            name: 'lastName',
            label: 'Nazwisko',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <Typography className={classes.linkInTable} component={Link} to={`${routes.employeeDetails}/${tableMeta.rowData[0]}`}>
                        {value}
                    </Typography>
                }
            },

        },
        {
            name: 'isActive',
            label: 'Status',
            options: {
                filter: true,
                sort: true,
                download: true,
                customBodyRender: (value, tableMeta, updateValue) => value ? 'aktywny' : 'nieaktywny'
            }
        },
        {
            name: 'settings',
            label: 'Edycja',
            options: {
                filter: false,
                sort: false,
                print: false,
                download: false,
                expandableRowsHeader: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const id = tableMeta.rowData[0];
                    return <SettingsMenu>
                        <Poper>
                            <Typography className={classes.optionLink} component={Link} to={`${routes.employeeDetails}/${id}`}>Szczegóły</Typography>
                        </Poper>
                        <Poper>
                            <Typography className={classes.optionLink} component={Link} to={`${routes.productionReportList}/?type=${statisticsTypes.EMPLOYEE}&id=${id}`}>
                                Raporty pracownika
                            </Typography>
                        </Poper>
                    </SettingsMenu>
                },
            },
        },
    ], [classes.linkInTable, classes.optionLink])


    let modalMessage = 'Czy na pewno chcesz usunąć pracowników?';

    const handleRemoveEmployeesBtn = ({ data, deleteEmployees }) => {

        const confirm = window.confirm(modalMessage);
        if (confirm !== true) return false;

        const idRemovedEmployees = data.map(record => list[record.dataIndex]);
        remove(idRemovedEmployees);
    }
    const options = {
        rowsPerPageOptions: [5, 20, 50],
        rowsPerPage: 20,
        filter: true,
        responsive: 'standard',
        filterType: "dropdown",
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
        onRowsDelete: handleRemoveEmployeesBtn,
        onDownload: (buildHead, buildBody, columns, data) => "\uFEFF" + buildHead(headerNames) + buildBody(data),
        onPrint: (buildHead, buildBody, columns, data) => "\uFEFF" + buildHead(headerNames) + buildBody(data),
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

    return (
        <>
            <MUIDataTable
                title={"Lista pracowników"}
                data={list}
                columns={columns}
                options={options}
            />
        </>
    )
}

export default TableEmployees;
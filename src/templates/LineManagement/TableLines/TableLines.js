import React, { useMemo } from 'react';
import MUIDataTable from "mui-datatables";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';

import routes from '../../../utils/routes';
import Poper from '../../../components/Poper';
import SettingsMenu from '../../../components/SettingsMenu';
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

const headerProduct = [
    {
        name: 'id',
        download: false,
    },
    {
        name: 'name',
        download: true,
        label: 'nazwa produktu'
    },
    {
        name: 'settings',
        download: false,
        print: false
    },
    {
        name: 'numberLine',
        download: true,
        print: true,
        label: 'numer linii'
    },
];




export const TableLines = ({ list, remove }) => {
    const classes = useStyles();

    const columns = useMemo(() => {
        return [
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
                label: 'Nazwa linii',
                options: {
                    filter: true,
                    sort: true,
                    customFilterListOptions: {
                        render: v => v.map(l => l.toUpperCase())
                    },
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return <Typography className={classes.linkInTable} component={Link} to={`${routes.lineDetails}/${tableMeta.rowData[0]}`}>
                            {value}
                        </Typography>
                    }
                },
            },
            {
                name: 'numberLine',
                label: 'Numer linii',
                options: {
                    filter: true,
                    sort: true,
                    customFilterListOptions: {
                        render: v => v.map(l => l.toUpperCase())
                    },
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return <Typography className={classes.linkInTable} component={Link} to={`${routes.lineDetails}/${tableMeta.rowData[0]}`}>
                            {value}
                        </Typography>
                    }
                },
            },
            {
                name: 'settings',
                label: 'Ustawienia',
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
                                <Typography className={classes.optionLink} component={Link} to={`${routes.lineDetails}/${id}`}>Szczegóły</Typography>
                            </Poper>
                            <Poper>
                                <Typography className={classes.optionLink} component={Link} to={`${routes.productionReportList}/?type=${statisticsTypes.LINE}&id=${id}`}>
                                    Raporty linii
                                </Typography>
                            </Poper>
                        </SettingsMenu>
                    },
                },
            },
        ]
    }, [classes.linkInTable, classes.optionLink]);

    const options = useMemo(() => {
        const handleRemoveProductsBtn = ({ data, deleteProducts }) => {
            let modalMessage = 'Czy na pewno chcesz usunąć Linie?';
            const confirm = window.confirm(modalMessage);
            if (confirm !== true) return false;

            const idRemovedProducts = data.map(record => list[record.dataIndex]);
            remove(idRemovedProducts);
        }

        return {
            rowsPerPageOptions: [10, 20, 50],
            filter: true,
            responsive: 'standard',
            filterType: "dropdown",
            fixedSelectColumn: true,
            onRowsDelete: handleRemoveProductsBtn,
            rowsSelected: [],
            onDownload: (buildHead, buildBody, columns, data) => {
                return "\uFEFF" + buildHead(headerProduct) + buildBody(data);
            },
            downloadOptions: {
                filename: 'excel-format.csv',
                separator: ';',
                filterOptions: {
                    useDisplayedColumnsOnly: true,
                    useDisplayedRowsOnly: true,
                },
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
    }, [list, remove])

    return (
        <>
            <MUIDataTable
                title={"Lista Linii"}
                data={list}
                columns={columns}
                options={options}
            />
        </>
    )
};
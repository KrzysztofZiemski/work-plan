import React, { useMemo } from 'react';
import MUIDataTable from "mui-datatables";
import { Link } from 'react-router-dom';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import SettingsMenu from '../../../components/SettingsMenu';
import Poper from '../../../components/Poper';
import routes from '../../../utils/routes';
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
        print: true,
    },
    {
        name: 'name',
        download: true,
        label: 'nazwa produktu',
        print: true,
    },
    // {
    //     name: 'description',
    //     download: true,
    //     label: 'opis'
    // },
    {
        name: 'isSerialized',
        download: true,
        label: 'serializowany',
        print: true,
    },
    {
        name: 'instructionId',
        download: true,
        label: 'Numer instrukcji',
        print: true,
    },
    {
        name: 'itemsPerCycle',
        download: true,
        label: 'Przedmioty na cykl',
        print: true,
    },
    {
        name: 'description',
        download: true,
        label: 'opis',
        print: true,
    },
    {
        name: 'settings',
        download: false,
        print: false,
    },
];

const TableProducts = ({ list, remove }) => {

    const classes = useStyles()

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
                label: 'Nazwa produktu',
                options: {
                    filter: true,
                    sort: true,
                    customFilterListOptions: {
                        render: v => v.map(l => l.toUpperCase())
                    },
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return <Typography className={classes.linkInTable} component={Link} to={`${routes.productDetails}/${tableMeta.rowData[0]}`}>
                            {value}
                        </Typography>
                    }
                },
            },
            {
                name: 'isSerialized',
                label: 'Serializowany',
                options: {
                    filter: true,
                    sort: true,
                    download: true,
                    customBodyRender: (value, tableMeta, updateValue) => value ? 'TAK' : 'NIE'
                }
            },
            {
                name: 'instructionId',
                label: 'Numer instrukcji',
                options: {
                    filter: true,
                    sort: true,
                    download: true,
                    customBodyRender: (value, tableMeta, updateValue) => value
                }
            },
            {
                name: 'itemsPerCycle',
                label: 'Przedmioty na cykl',
                options: {
                    filter: true,
                    sort: true,
                    download: true,
                    customBodyRender: (value, tableMeta, updateValue) => value
                }
            },
            {
                name: 'description',
                label: 'Opis',
                options: {
                    filter: true,
                    sort: true,
                    download: true,
                    customBodyRender: (value, tableMeta, updateValue) => value
                }
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
                                <Typography className={classes.optionLink} component={Link} to={`${routes.productDetails}/${id}`}>Szczegóły</Typography>
                            </Poper>
                            <Poper>
                                <Typography className={classes.optionLink} component={Link} to={`${routes.productionReportList}/?type=${statisticsTypes.PRODUCT}&id=${id}`}>
                                    Raporty produktu
                                </Typography>
                            </Poper>
                        </SettingsMenu>
                    }
                }
            },
        ]
    }, [classes.linkInTable, classes.optionLink])

    const options = useMemo(() => {
        const handleRemoveProductsBtn = ({ data, deleteProducts }) => {
            let modalMessage = 'Czy na pewno chcesz usunąć produkty?';
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
            isRowSelectable: (index) => list[index].isActive,
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
                title={"Lista produktów"}
                data={list}
                columns={columns}
                options={options}
            />
        </>
    )
}

export default TableProducts;
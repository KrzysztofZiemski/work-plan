import React from 'react';
import MUIDataTable from "mui-datatables";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom';
import routes from '../../../utils/routes';

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

const columns = [
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
                return <Link to={`${routes.lineDetails}/${id}`}><SettingsIcon color="primary" /></Link>
            }
        }
    },
]


export const TableLines = ({ list, remove }) => {

    let modalMessage = 'Czy na pewno chcesz usunąć Linie?';

    const handleRemoveProductsBtn = ({ data, deleteProducts }) => {

        const confirm = window.confirm(modalMessage);
        if (confirm !== true) return false;

        const idRemovedProducts = data.map(record => list[record.dataIndex]);
        remove(idRemovedProducts);
    }
    const options = {
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
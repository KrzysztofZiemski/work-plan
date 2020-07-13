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
        label: 'Imię'
    },
    {
        name: 'surname',
        label: 'nazwisko',
        download: true,
        print: true
    },
    {
        name: 'login',
        download: true,
        print: true,
    },
    {
        name: 'email',
        download: true,
        print: true,
        label: 'e-mail',
    },
    {
        name: 'idRole',
        download: true,
        print: true,
        label: 'rola',
    },
];


export const TableUsers = ({ list, remove, roles }) => {
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
            label: 'Imię',
            options: {
                filter: true,
                sort: true,
                customFilterListOptions: {
                    render: v => v.map(l => l.toUpperCase())
                },
            },
        },
        {
            name: 'surname',
            label: 'nazwisko',
            options: {
                filter: true,
                sort: true,
                customFilterListOptions: {
                    render: v => v.map(l => l.toUpperCase())
                },
            },
        },
        {
            name: 'login',
            label: 'login',
            options: {
                filter: true,
                sort: true,
                customFilterListOptions: {
                    render: v => v.map(l => l.toUpperCase())
                },
            },
        },
        {
            name: 'email',
            label: 'email',
            options: {
                filter: true,
                sort: true,
                customFilterListOptions: {
                    render: v => v.map(l => l.toUpperCase())
                },
            },
        },
        {
            name: 'idRole',
            label: 'rola',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const userRole = roles.find(role => role.id === value);
                    return userRole ? userRole.description : null;
                },
            },
        },
        {
            name: 'settings',
            label: 'ustawienia',
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
    ];

    let modalMessage = 'Czy na pewno chcesz usunąć Użytkownika?';

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
        }
    };

    return (
        <>
            <MUIDataTable
                title={"Lista użytkowników"}
                data={list}
                columns={columns}
                options={options}
            />
        </>
    )
};
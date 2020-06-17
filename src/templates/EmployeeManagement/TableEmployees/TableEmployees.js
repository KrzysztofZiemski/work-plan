import React from 'react';
import MUIDataTable from "mui-datatables";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom';

import routes from '../../../utils/routes';


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
        name: ' ',
        label: ' ',
        options: {
            filter: false,
            sort: false,
            customBodyRender: () => <AccountBoxIcon />
        },
    },
    {
        name: 'name',
        label: 'imię',
        options: {
            filter: true,
            sort: true,
            customFilterListOptions: {
                render: v => v.map(l => l.toUpperCase())
            },
        },
    },
    {
        name: 'lastName',
        label: 'nazwisko',
        options: {
            filter: true,
            sort: true
        }
    },
    {
        name: 'isActive',
        label: 'status',

        options: {
            filter: true,
            sort: true,
            print: false,
            download: false,
            customBodyRender: (value, tableMeta, updateValue) => value ? 'aktywny' : 'nieaktywny'
        }
    },
    {
        name: 'settings',
        label: 'ustawienia',
        options: {
            filter: false,
            sort: false,
            print: false,
            download: false,
            customBodyRender: (value, tableMeta, updateValue) => {
                const id = tableMeta.rowData[0];
                return <Link to={`${routes.employeeDetails}/${id}`}><SettingsIcon color="primary" /></Link>
            }
        }
    },
]


const TableEmployees = ({ list, remove }) => {
    console.log(list)
    let modalMessage = 'Czy na pewno chcesz usunąć pracowników?';

    const handleRemoveEmployeesBtn = ({ data, deleteEmployees }) => {

        const confirm = window.confirm(modalMessage);
        if (confirm !== true) return false;

        const idRemovedEmployees = data.map(record => list[record.dataIndex]);
        remove(idRemovedEmployees);
    }
    const options = {
        rowsPerPageOptions: [10, 20, 50],
        filter: true,
        fixedSelectColumn: true,
        onRowsDelete: handleRemoveEmployeesBtn,
        isRowSelectable: (index) => list[index].isActive,
        rowsSelected: [],
        downloadOptions: { filename: 'tableDownload.csv', separator: ',' },
        // onDownload: TODO
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
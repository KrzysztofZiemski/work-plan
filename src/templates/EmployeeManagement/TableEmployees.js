import React from 'react';
import MUIDataTable from "mui-datatables";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom';

import routes from '../../utils/routes';
import DialogMessage from '../../components/DialogMessage';

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
        }
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
        }
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
            customBodyRender: (value, tableMeta, updateValue) => value ? 'aktywny' : 'nieaktywny'
        }
    },
    {
        name: '',
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value, tableMeta, updateValue) => {
                const id = tableMeta.rowData[0];
                return <Link to={`${routes.employeeDetails}/${id}`}><SettingsIcon color="primary" /></Link>
            }
        }
    }
]


const TableEmployees = ({ list, setList }) => {

    const handleDeleteEmployees = ({ data }) => {
        //is sure modal
        const confirm = window.confirm("Czy na pewno chcesz usunąć pracowników?");
        if (confirm !== true) return false;
        const listCopy = [...list];
        data.forEach(indexData => listCopy.splice(indexData.index, 1));
        setList(listCopy);
        //komunikat usunieto
    }
    const options = {
        filterType: 'textField',
        rowsPerPageOptions: [10, 20, 50],
        onRowsDelete: handleDeleteEmployees
    };
    //logika pokazywania modala do zrobienia
    return (
        <>
            {/* <DialogMessage message='asdsfs' /> */}
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
import React from 'react';
import MUIDataTable from "mui-datatables";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom';
import routes from '../../../utils/routes';

const headerNames = [
    {
        name: 'id',
        download: false,
    },
    {
        name: 'name',
        download: true,
        label: 'imię'
    },
    {
        name: 'lastName',
        download: true,
        label: 'nazwisko'
    },
    {
        name: 'isActive',
        download: true,
        label: 'status'
    },
    {
        name: 'settings',
        download: false,
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
        name: 'lastName',
        label: 'Nazwisko',
        options: {
            filter: true,
            sort: true
        }
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
                return <Link key={id} to={`${routes.employeeDetails}/${id}`}><SettingsIcon color="primary" /></Link>
            }
        }
    },
]


const TableEmployees = ({ list, remove }) => {

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
        responsive: 'standard',
        filterType: "dropdown",
        fixedSelectColumn: true,
        onRowsDelete: handleRemoveEmployeesBtn,
        isRowSelectable: (index) => list[index].isActive,
        rowsSelected: [],
        onDownload: (buildHead, buildBody, columns, data) => {
            return "\uFEFF" + buildHead(headerNames) + buildBody(data);
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
                title={"Lista pracowników"}
                data={list}
                columns={columns}
                options={options}
            />
        </>
    )
}

export default TableEmployees;
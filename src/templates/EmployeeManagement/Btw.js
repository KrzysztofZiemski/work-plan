import React from 'react';
import MUIDataTable from "mui-datatables";



class Btw extends React.Component {
    state = {
        downloadFile: true,
    };

    render() {
        const columns = [
            'Name',
            'title',
            {
                name: 'location',
                options: {
                    display: 'false'
                }
            },
            {
                name: 'age',
                options: {
                    customBodyRender: value => <div><span>{value}</span></div>
                }
            },
            {
                name: 'salary',
                options: {
                    download: false,
                },
            },
        ];

        const data = [
            {
                name: 'Gabby George',
                title: 'Business Consultant',
                age: 30,
                location: 'Minneapolis',
                salary: 100000,
            }
            // ['Aiden Lloyd', 'Business Consultant', 'Dallas', 55, 200000],

        ];

        const options = {
            filter: true,
            selectableRows: 'multiple',
            filterType: 'dropdown',
            responsive: 'vertical',
            rowsPerPage: 10,
            downloadOptions: {
                filename: 'excel-format.csv',
                separator: ';',
                filterOptions: {
                    useDisplayedColumnsOnly: true,
                    useDisplayedRowsOnly: true,
                }
            },
            onDownload: (buildHead, buildBody, columns, data) => {
                if (this.state.downloadFile) {
                    return `${buildHead(columns)}${buildBody(data)}`.trim();
                }

                return false;
            },
            onRowSelectionChange: (currentRowsSelected, allRows, rowsSelected) => {
                console.log(currentRowsSelected, allRows, rowsSelected);
            },
            onRowsDelete: rowsDeleted => {
                console.log(rowsDeleted, 'were deleted!');
            },
            onChangePage: numberRows => {
                console.log(numberRows);
            },
            onSearchChange: searchText => {
                console.log(searchText);
            },
            onColumnSortChange: (column, direction) => {
                console.log(column, direction);
            },
            onViewColumnsChange: (column, action) => {
                console.log(column, action);
            },
            onFilterChange: (column, filters) => {
                console.log(column, filters);
            },
            onCellClick: (cellIndex, rowIndex) => {
                console.log(cellIndex, rowIndex);
            },
            onRowClick: (rowData, rowState) => {
                console.log(rowData, rowState);
            },
        };

        return (
            <React.Fragment>
                <MUIDataTable title={'ACME Employee list CSV'} data={data} columns={columns} options={options} />
            </React.Fragment>
        );
    }
}

export default Btw;
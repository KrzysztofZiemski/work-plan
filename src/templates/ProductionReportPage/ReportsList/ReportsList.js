import React from 'react';
import MUIDataTable from "mui-datatables";
import Grid from '@material-ui/core/Grid';

// const columns = [
// {
//     name: 'id',
//     label: 'id',
//     options: {
//         filter: false,
//         sort: false,
//         display: false,
//         customBodyRender: () => <AccountBoxIcon />
//     }
// },
// ]
// const headerNames = [
// {
//     name: 'id',
//     download: false,
// },
// {
//     name: 'name',
//     download: true,
//     label: 'imię'
// },
// {
//     name: 'lastName',
//     download: true,
//     label: 'nazwisko'
// },
// {
//     name: 'isActive',
//     download: true,
//     label: 'status'
// },
// {
//     name: 'settings',
//     download: false,
// },
// ];
// const handleRemoveEmployeesBtn = ({ data, deleteEmployees }) => {

// const confirm = window.confirm(modalMessage);
// if (confirm !== true) return false;

// const idRemovedEmployees = data.map(record => list[record.dataIndex]);
// remove(idRemovedEmployees);
// }
// const options = {
//     rowsPerPageOptions: [10, 20],
//     filter: true,
//     responsive: 'standard',
//     filterType: "dropdown",
//     fixedSelectColumn: true,
//     onRowsDelete: handleRemoveEmployeesBtn,
//     isRowSelectable: (index) => list[index].isActive,
//     rowsSelected: [],
//     onDownload: (buildHead, buildBody, columns, data) => {
//         return "\uFEFF" + buildHead(headerNames) + buildBody(data);
//     },
//     downloadOptions: {
//         filename: 'excel-report-list.csv',
//         separator: ';',
//         filterOptions: {
//             useDisplayedColumnsOnly: true,
//             useDisplayedRowsOnly: true,
//         },
//     }
// };

export const ReportsList = () => {

    return (
        <Grid>
            {/* <MUIDataTable
                title={"Lista pracowników"}
                data={[]}
                columns={}
                options={}
            /> */}
        </Grid>
    )
}
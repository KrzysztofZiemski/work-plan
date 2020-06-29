import React, { useEffect, useState } from 'react';
import MUIDataTable from "mui-datatables";
import Grid from '@material-ui/core/Grid';
import Loader from '../../../components/Loader';
import DialogMessage from '../../../components/DialogMessage';
import ProductionReportService from '../../../services/ProductionReportService';
// name: 'description',
// label: 'opis',
// options: {
//     filter: true,
//     sort: false,
//     customBodyRender: () => <AccountBoxIcon />
// }
// reateAt: "2020-06-28T20:16:15+02:00"
// createdByUser: {id: 1, name: "Michał", surname: "Pol"}
// description: "string"
// firstWorkplace: {id: 32, name: "Lara", lastName: "Wiśniewska"}
// id: 589
// lineId: 587
// maxPossibleItems: 9180
// percentagePerformance: 12.1
// performancePerHour: 1088.24
// product: {id: 588, name: "Product Test 1", isSerialized: true, isActive: true, itemsPerCycle: 6, …}
// productionEnd: "2020-06-28T20:14:24+02:00"
// productionStart: "2020-06-28T20:14:24+02:00"
// productionTimeToHour: 1.02
// secondWorkplace: {id: 34, name: "Oksana", lastName: "Woźniak"}
// series: "TS42552"
// speedMachinePerCycle: 25
// thirdWorkplace: {id: 35, name: "Bogumiła", lastName: "Chmielewska"}
// totalQuantityProduced: 1110
// updateAt: "2020-06-28T20:16:15+02:00"
// updatedByUser: {id: 1, name: "Michał", surname: "Pol"}

const columns = [
    {
        name: 'description',
        label: 'opis',
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: 'firstWorkplace: ',
        label: 'pierwsze stanowisko',
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: 'secondWorkplace: : ',
        label: 'drugie stanowisko',
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: 'thirdWorkplace: : : ',
        label: 'trzecie stanowisko',
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: 'series',
        label: 'seria',
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: 'speedMachinePerCycle',
        label: 'szybkość',
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: 'totalQuantityProduced',
        label: 'ilość wyprodukowana',
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: 'productionTimeToHour',
        label: 'czas w godzinach',
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: 'productionStart',
        label: 'start produkcji',
        options: {
            filter: true,
            sort: false,
        }
    },
    // {
    //     name: 'product',
    //     label: 'produkt',
    //     options: {
    //         filter: true,
    //         sort: false,
    //     }
    // },
    {
        name: 'productionEnd',
        label: 'koniec produkcji',
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: 'productionEnd',
        label: 'koniec produkcji',
        options: {
            filter: true,
            sort: false,
        }
    },

]
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

export const ReportsList = ({ startDate, endDate }) => {
    let [reportsList, setReportsList] = useState([]);
    let [fetching, setFetching] = useState(false);
    let [message, setMessage] = useState([]);
    let [messageIsOpen, setMessageIsOpen] = useState(false);
    //add loader//message?
    const handleCloseMessage = () => {
        setMessageIsOpen(false);
        setMessage([])
    }
    console.log('reportsList', reportsList)
    useEffect(() => {
        setFetching(true);
        if (startDate && endDate) {
            ProductionReportService.getBetween(startDate, endDate)
                .then(data => {
                    console.log(data)
                    setReportsList(data);
                    setFetching(false);
                })
                .catch(err => {
                    setFetching(false);
                    setMessage(['błąd połączenia']);
                    setMessageIsOpen(true);
                });
        } else {
            ProductionReportService.getAll()
                .then(data => {
                    setReportsList(data);
                    setFetching(false)
                })
                .catch(err => {
                    setFetching(false);
                    setMessage(['błąd połączenia']);
                    setMessageIsOpen(true)
                });
        }
    }, [startDate, endDate])
    return (
        <Grid>
            <Loader open={fetching} />
            <DialogMessage open={messageIsOpen} close={handleCloseMessage} messages={message} />
            <MUIDataTable
                title={"Lista raportów"}
                data={reportsList}
                columns={columns}
            // options={}
            />
        </Grid>
    )
}
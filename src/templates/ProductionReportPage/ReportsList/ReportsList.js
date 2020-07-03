import React, { useEffect, useState } from 'react';
import MUIDataTable from "mui-datatables";
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Loader from '../../../components/Loader';
import DialogMessage from '../../../components/DialogMessage';
import ProductionReportService from '../../../services/ProductionReportService';
import LineService from '../../../services/LineService';
import EditIcon from '@material-ui/icons/Edit';
import { default as routes } from '../../../utils/routes';

const options = {
    rowsPerPageOptions: [10, 20],
    filter: true,
    responsive: 'standard',
    filterType: "dropdown",
    selectableRows: false,
    print: false,
    download: false,
    search: false
};

export const ReportsList = ({ startDate, endDate }) => {
    let [reportsList, setReportsList] = useState([]);
    let [fetching, setFetching] = useState(false);
    let [message, setMessage] = useState([]);
    let [messageIsOpen, setMessageIsOpen] = useState(false);
    let [lines, setLines] = useState([]);
    //add loader//message?

    const handleCloseMessage = () => {
        setMessageIsOpen(false);
        setMessage([]);

    }

    useEffect(() => {
        setFetching(true);
        LineService.getAllLines()
            .then(data => setLines(data));

        if (startDate && endDate) {
            ProductionReportService.getBetween(startDate, endDate)
                .then(data => {
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
    }, [startDate, endDate]);


    const columns = [
        {
            name: 'lineId',
            label: 'linia',
            options: {
                filter: true,
                sort: true,
                print: true,
                download: true,
                expandableRowsHeader: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const lineName = lines.filter(line => line.id === value);
                    return lineName.length === 1 ? <span>{lineName[0].name}</span> : <span>{`id ${value}`}</span>
                }
            }
        },
        {
            name: 'totalQuantityProduced',
            label: 'wyprodukowano',
            options: {
                filter: true,
                sort: true,
                print: true,
                download: true,
            }
        },
        {
            name: 'maxPossibleItems',
            label: 'maksymalna ilość',
            options: {
                filter: true,
                sort: true,
                print: true,
                download: true,
            }
        },
        {
            name: 'performancePerHour',
            label: 'sztuk na godzinę',
            options: {
                filter: true,
                sort: true,
                print: true,
                download: true,
            }
        },
        {
            name: 'percentagePerformance',
            label: 'procent',
            options: {
                filter: true,
                sort: true,
                print: true,
                download: true,
            }
        },
        {
            name: 'product',
            label: 'produkt',
            options: {
                filter: true,
                sort: true,
                print: true,
                download: true,
                expandableRowsHeader: true,
                customBodyRender: (value, tableMeta, updateValue) => <span>{value.name}</span>
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
            name: 'firstWorkplace',
            label: 'pierwsze stanowisko',
            options: {
                filter: true,
                sort: true,
                print: true,
                download: true,
                expandableRowsHeader: true,
                customBodyRender: (value, tableMeta, updateValue) => <span>{`${value.name} ${value.lastName}`}</span>
            }
        },
        {
            name: 'secondWorkplace',
            label: 'drugie stanowisko',
            options: {
                filter: true,
                sort: true,
                print: true,
                download: true,
                expandableRowsHeader: true,
                customBodyRender: (value, tableMeta, updateValue) => <span>{`${value.name} ${value.lastName}`}</span>
            }
        },
        {
            name: 'thirdWorkplace',
            label: 'trzecie stanowisko',
            options: {
                filter: true,
                sort: true,
                print: true,
                download: true,
                expandableRowsHeader: true,
                customBodyRender: (value, tableMeta, updateValue) => <span>{`${value.name} ${value.lastName}`}</span>
            }
        },
        {
            name: 'productionStart',
            label: 'początek produkcji',
            options: {
                filter: true,
                sort: true,
                print: true,
                download: true,
                expandableRowsHeader: true,
                customBodyRender: (value, tableMeta, updateValue) => <span>{value.substring(0, 16).replace('T', ' ')}</span>
            }
        },
        {
            name: 'productionEnd',
            label: 'koniec produkcji',
            options: {
                filter: true,
                sort: true,
                print: true,
                download: true,
                expandableRowsHeader: true,
                customBodyRender: (value, tableMeta, updateValue) => <span>{value.substring(0, 16).replace('T', ' ')}</span>
            }
        },
        {
            name: 'description',
            label: 'opis',
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: 'updatedByUser',
            label: 'stworzony przez',
            options: {
                filter: true,
                sort: true,
                print: true,
                download: true,
                expandableRowsHeader: true,
                customBodyRender: (value, tableMeta, updateValue) => <span>{`${value.name} ${value.surname}`}</span>
            }
        },
        {
            name: 'id',
            label: ' ',
            options: {
                filter: true,
                sort: true,
                print: true,
                download: true,
                expandableRowsHeader: true,
                customBodyRender: (value, tableMeta, updateValue) => <span> <Link to={`${routes.productionReportList}/report/${value}`}><EditIcon /></Link></span>
            }
        },


    ]

    return (
        <Grid>
            <Loader open={fetching} />
            <DialogMessage open={messageIsOpen} close={handleCloseMessage} messages={message} />
            <MUIDataTable
                title={"Lista raportów"}
                data={reportsList}
                columns={columns}
                options={options}
            />
        </Grid>
    )
}
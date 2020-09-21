import React, { useState, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { subtractionDate } from '../../../helpers/dateHelper';
import { Select, InputLabel, FormControl, MenuItem, Typography } from '@material-ui/core';
import { getCorrectlyFormatData } from '../../../helpers/dateHelper';
import DateTimePicker from '../../../components/DateTimePicker';
import DialogMessage from '../../../components/DialogMessage';
import statistics from '../../../services/statisticsService';
import TableDetails from '../../../components/TableDetails';
import ButtonLoader from '../../../components/ButtonLoader';
import LineService from '../../../services/LineService';
import TabBars from '../../../components/TabBars';

const headersTable = [' ', 'Ilość wyprodukowana', 'Wydajność', 'Prędkość', 'Wydajność na godzinę'];
const headerReports = ['Czas', 'Wyprodukowano', 'Seria', 'Czas Produkcji', 'Prędkość', 'Linia', 'Stanowisko 1', 'Stanowisko 2', 'Stanowisko 3']

const useStyles = makeStyles(({
    root: {
        padding: 20,
        flexWrap: 'nowrap'
    },
    tableContainer: {
        flexGrow: 1,
        margin: '0 20px'
    },
    panelFilter: {
        display: 'flex',
        flexDirection: 'column'
    },
    date: {
        marginTop: 10,
        flexWrap: 'nowrap'
    },
    button: {
        padding: '15px 25px',
        margin: '10px 0',
        alignSelf: 'center',
    },
    seriesInput: {
        margin: '10px 0'
    },
    reportsHeader: {
        fontSize: 19,
        margin: '0 auto',
        padding: 10,
    }
}));


export const ProductTable = ({ id, type }) => {
    const classes = useStyles();
    let [dateStart, setDateStart] = useState(subtractionDate(30));
    let [dateEnd, setDateEnd] = useState(subtractionDate(0));
    let [isFetching, setFetching] = useState(false);
    let [message, setMessage] = useState({ isOpen: false, text: [] });
    let [dataTable, setDataTable] = useState([]);
    let [linesFilter, setLinesFilter] = useState('');
    let [linesList, setLinesList] = useState([]);
    let [reports, setReports] = useState([]);

    //nie pobiera po linii jeszcze
    useEffect(() => {
        LineService.getAllLines()
            .then(data => setLinesList(data))
            .catch(err => setMessage({ isOpen: true, text: ['Wystąpił błąd podczas wczytywania zasobu', `Błąd ${err}`] }))
    }, [])
    if (!id || !type) return;

    const handleCloseMessage = () => {
        setMessage({ isOpen: false, text: [] })
    }
    const handleChangeLine = (e) => {
        setLinesFilter(e.target.value);
    }

    const getReportProduct = async () => {
        const dataRequest = {
            start: dateStart,
            end: dateEnd,
            id: [id],
            type,
            options: {}
        }
        try {
            setFetching(true);
            if (linesFilter) {
                dataRequest.options = { line: linesFilter };
                const response = await statistics.create(dataRequest);

                const dataTable = [response.options.line, response.options.totalProduced, response.options.percentage, response.options.averageSpeed, response.options.averagePerHour];

                setReports(response.dataReport);
                setDataTable([dataTable]);
            } else {
                const requests = linesList.map(line => {
                    dataRequest.options = { line: line.id };
                    return statistics.create(dataRequest);
                });

                Promise.all(requests).then(async responses => {
                    const reportList = [];

                    const dataTable = responses.map(response => {
                        reportList.push(...response.dataReport)
                        return [response.options.line, response.options.totalProduced, response.options.percentage, response.options.averageSpeed, response.options.averagePerHour];
                    });

                    dataRequest.options = {};
                    const summaryResponse = await statistics.create(dataRequest);
                    const summaryData = ['Podsumowanie', summaryResponse.options.totalProduced, summaryResponse.options.percentage, summaryResponse.options.averageSpeed, summaryResponse.options.averagePerHour];

                    dataTable.push(summaryData);
                    setReports(reportList);
                    setDataTable(dataTable);

                })
            }
            setFetching(false);
        } catch (err) {
            setFetching(false);
            setMessage({ isOpen: true, text: ['Nie udało się pobrać danych', `Błąd ${err}`] });
        }
    }
    const renderReports = () => {
        if (!reports) return [];
        return reports.map(report => {
            return ([
                `${getCorrectlyFormatData(report.startProduction)}  -  ${getCorrectlyFormatData(report.endProduction)}`, report.totalQuantityProduced, report.series, `${report.performancePerHour} h`, report.speedMachinePerCycle, report.line.name, `${report.firstWorkplace.name} ${report.firstWorkplace.lastName}`, `${report.secondWorkplace.name} ${report.secondWorkplace.lastName}`, `${report.thirdWorkplace.name} ${report.thirdWorkplace.lastName}`
            ])
        })

    }
    return (
        <Grid>
            <Grid container className={classes.root}>
                <DialogMessage open={message.isOpen} close={handleCloseMessage} messages={message.text} />
                <Grid className={classes.panelFilter}>
                    <DateTimePicker date={dateStart} setDate={setDateStart} name='Czas początkowy' className={classes.date} />
                    <DateTimePicker date={dateEnd} setDate={setDateEnd} name='Czas końcowy' className={classes.date} />
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="lineId">Linia</InputLabel>
                        <Select
                            labelId="lineId"
                            id="lineSelect"
                            value={linesFilter}
                            onChange={handleChangeLine}
                            name='lineId'
                            label="Linia"
                        >
                            <MenuItem value=''>&nbsp;</MenuItem>
                            {linesList.map(line => (
                                <MenuItem key={`line${line.id}`} value={line.id}>{line.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <ButtonLoader onClick={getReportProduct} className={classes.button} value='Pobierz dane' isSubmitting={isFetching} />
                </Grid>
                <Grid className={classes.tableContainer}>
                    <TableDetails headers={headersTable} rows={dataTable ? dataTable : []} />
                </Grid>
            </Grid>
            {reports.length > 0 ? <Grid container>
                <Typography component='h2' className={classes.reportsHeader}>Raporty</Typography>
                <TableDetails headers={headerReports} rows={renderReports()} summary={false} />
            </Grid> : null}
        </Grid>
    );
};


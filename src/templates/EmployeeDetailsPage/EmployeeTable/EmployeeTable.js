import React, { useState, useEffect, useMemo } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { subtractionDate } from '../../../helpers/dateHelper';
import { Select, InputLabel, FormControl, MenuItem } from '@material-ui/core';
import DateTimePicker from '../../../components/DateTimePicker';
import DialogMessage from '../../../components/DialogMessage';
import statistics from '../../../services/statisticsService';
import TableDetails from '../../../components/TableDetails';
import ButtonLoader from '../../../components/ButtonLoader';
import LineService from '../../../services/LineService';
import TabBars from '../../../components/TabBars';
import ReportsList from '../../../components/ReportsList';
import { convertReportsToTable } from '../../../helpers/statisticsHelper';

const headersTable = [' ', 'Ilość wyprodukowana', 'Wydajność', 'Prędkość', 'Wydajność na godzinę'];
const tabHeaders = ['Wszystkie', 'stanowisko pierwsze', 'stanowisko drugie', 'stanowisko trzecie']

const useStyles = makeStyles(({
    root: {
        padding: 20,
        flexWrap: 'nowrap',
        display: 'flex'
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


export const EmployeeTable = ({ id, type }) => {
    const classes = useStyles();
    let [dateStart, setDateStart] = useState(subtractionDate(30));
    let [dateEnd, setDateEnd] = useState(subtractionDate(0));
    let [isFetching, setFetching] = useState(false);
    let [message, setMessage] = useState({ isOpen: false, text: [] });

    let [dataTableAll, setDataTableAll] = useState([]);
    let [dataTableFirstWorkplace, setDataTableFirstWorkplace] = useState([]);
    let [dataTableSecondWorkplace, setDataTableSecondWorkplace] = useState([]);
    let [dataTableThirdWorkplace, setDataTableThirdWorkplace] = useState([]);

    let [linesFilter, setLinesFilter] = useState('');
    let [linesList, setLinesList] = useState([]);
    let [reports, setReports] = useState([]);

    useEffect(() => {
        LineService.getAllLines()
            .then(data => setLinesList(data))
            .catch(err => setMessage({ isOpen: true, text: ['Wystąpił błąd podczas wczytywania zasobu', `Błąd ${err}`] }))
    }, []);

    const reportsList = useMemo(() => convertReportsToTable(reports), [reports])

    if (!id || !type) return;

    const handleCloseMessage = () => {
        setMessage({ isOpen: false, text: [] })
    };

    const handleChangeLine = (e) => {
        setLinesFilter(e.target.value);
    };

    const getDataTables = (options = {}, isGetReports = false) => {
        const dataRequest = {
            start: dateStart,
            end: dateEnd,
            id: [id],
            type,
            options
        };
        return isGetReports ? statistics.create(dataRequest) : statistics.createCircle(dataRequest);
    };

    const convertToDataTable = ({ line, totalProduced, percentage, averageSpeed, averagePerHour }) => [line ? line : 'Podsumowanie', totalProduced, percentage, averageSpeed, averagePerHour];

    const getReportEmployee = async () => {
        setFetching(true);

        const linesToRequest = linesFilter ? [{ id: linesFilter }] : linesList;

        const dataAllWorkplaces = [];
        const dataFirstWorkplace = [];
        const dataSecondWorkplace = [];
        const dataThirdWorkplace = [];
        const promises = linesToRequest.map(async (line, index) => {
            const requestOptions = { line: line.id };
            if (linesToRequest.length === 1) {
                const { options, dataReport } = await getDataTables(requestOptions, true);
                dataAllWorkplaces.push(convertToDataTable(options));
                setReports(dataReport);
            } else {
                const { options } = await getDataTables(requestOptions);
                dataAllWorkplaces.push(convertToDataTable(options));
            }

            requestOptions.firstWorkplace = +id;
            const first = await getDataTables(requestOptions);
            dataFirstWorkplace.push(convertToDataTable(first.options));

            delete requestOptions.firstWorkplace;
            requestOptions.secondWorkplace = +id;
            const second = await getDataTables(requestOptions);
            dataSecondWorkplace.push(convertToDataTable(second.options));

            delete requestOptions.secondWorkplace;
            requestOptions.thirdWorkplace = +id;
            const third = await getDataTables(requestOptions);
            dataThirdWorkplace.push(convertToDataTable(third.options));
            if (index === linesToRequest.length - 1 && linesToRequest.length > 1) {
                delete requestOptions.line;
                const all = await getDataTables(requestOptions, true);
                setReports(all.dataReport);
                dataAllWorkplaces.push(convertToDataTable(all.options));

                requestOptions.firstWorkplace = +id;
                const first = await getDataTables(requestOptions);
                dataFirstWorkplace.push(convertToDataTable(first.options));

                delete requestOptions.firstWorkplace;
                requestOptions.secondWorkplace = +id;
                const second = await getDataTables(requestOptions);
                dataSecondWorkplace.push(convertToDataTable(second.options));

                delete requestOptions.secondWorkplace;
                requestOptions.thirdWorkplace = +id;
                const third = await getDataTables(requestOptions);
                dataThirdWorkplace.push(convertToDataTable(third.options));
            }
            return Promise.resolve();
        })
        Promise.all(promises).then(t => {
            setFetching(false);
            setDataTableAll(dataAllWorkplaces);
            setDataTableFirstWorkplace(dataFirstWorkplace);
            setDataTableSecondWorkplace(dataSecondWorkplace);
            setDataTableThirdWorkplace(dataThirdWorkplace);
        })
    };

    const dataTableComponents = () => ([
        <TableDetails headers={headersTable} rows={dataTableAll ? dataTableAll : []} summary={dataTableAll && dataTableAll.length > 1} />,
        <TableDetails headers={headersTable} rows={dataTableFirstWorkplace ? dataTableFirstWorkplace : []} summary={dataTableFirstWorkplace && dataTableFirstWorkplace.length > 1} />,
        <TableDetails headers={headersTable} rows={dataTableSecondWorkplace ? dataTableSecondWorkplace : []} summary={dataTableSecondWorkplace && dataTableSecondWorkplace.length > 1} />,
        <TableDetails headers={headersTable} rows={dataTableThirdWorkplace ? dataTableThirdWorkplace : []} summary={dataTableThirdWorkplace && dataTableThirdWorkplace.length > 1} />
    ]);

    return (
        <Grid container>
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
                    <ButtonLoader onClick={getReportEmployee} className={classes.button} value='Pobierz dane' isSubmitting={isFetching} />
                </Grid>
                <TabBars headers={tabHeaders} components={dataTableComponents()} />
            </Grid>
            {reports.length > 0 ? <Grid container>
                <ReportsList isFetching={isFetching} list={reportsList} />
            </Grid> : null}
        </Grid>
    );
};


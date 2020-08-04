import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { subtractionDate } from '../../../helpers/dateHelper';
import { Select, InputLabel, FormControl, MenuItem, Typography } from '@material-ui/core';
import { getCorrectlyFormatData } from './../../../helpers/dateHelper';
import DateTimePicker from '../../../components/DateTimePicker';
import DialogMessage from '../../../components/DialogMessage';
import statistics from '../../../services/statisticsService';
import TableDetails from '../../../components/TableDetails';
import ButtonLoader from '../../../components/ButtonLoader';
import LineService from '../../../services/LineService';
import TabBars from '../../../components/TabBars';


const headersTable = [' ', 'Ilość wyprodukowana', 'Wydajność', 'Prędkość', 'Wydajność na godzinę'];
const headerReports = ['Czas', 'Wyprodukowano', 'Seria', 'Czas Produkcji', 'Prędkość', 'Linia', 'Stanowisko 1', 'Stanowisko 2', 'Stanowisko 3']
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

    //nie pobiera po linii jeszcze
    useEffect(() => {
        LineService.getAllLines()
            .then(data => setLinesList(data))
            .catch(err => setMessage({ isOpen: true, text: ['Wystąpił błąd podczas wczytywania zasobu', `Błąd ${err}`] }))
    }, []);

    if (!id || !type) return;

    const handleCloseMessage = () => {
        setMessage({ isOpen: false, text: [] })
    }
    const handleChangeLine = (e) => {
        setLinesFilter(e.target.value);
    }
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

    const convertToDataTable = (report) => [report.options.line ? report.options.line : 'Podsumowanie', report.options.totalProduced, report.options.percentage, report.options.averageSpeed, report.options.averagePerHour];
    const getReportEmployee = async () => {
        setFetching(true);

        const linesToRequest = linesFilter ? [{ id: linesFilter }] : linesList;

        const dataAllWorkplaces = [];
        const dataFirstWorkplace = [];
        const dataSecondWorkplace = [];
        const dataThirdWorkplace = [];
        const promises = linesToRequest.map(async (line, index) => {
            const options = { line: line.id };
            if (linesToRequest.length === 1) {
                const all = await getDataTables(options, true);
                dataAllWorkplaces.push(convertToDataTable(all));
                setReports(all.dataReport);
            } else {
                const all = await getDataTables(options);
                dataAllWorkplaces.push(convertToDataTable(all));
            }

            options.firstWorkplace = +id;
            const first = await getDataTables(options);
            dataFirstWorkplace.push(convertToDataTable(first));

            delete options.firstWorkplace;
            options.secondWorkplace = +id;
            const second = await getDataTables(options);
            dataSecondWorkplace.push(convertToDataTable(second));

            delete options.secondWorkplace;
            options.thirdWorkplace = +id;
            const third = await getDataTables(options);
            dataThirdWorkplace.push(convertToDataTable(third));
            if (index === linesToRequest.length - 1 && linesToRequest.length > 1) {
                delete options.line;
                const all = await getDataTables(options, true);
                setReports(all.dataReport);
                dataAllWorkplaces.push(convertToDataTable(all));

                options.firstWorkplace = +id;
                const first = await getDataTables(options);
                dataFirstWorkplace.push(convertToDataTable(first));

                delete options.firstWorkplace;
                options.secondWorkplace = +id;
                const second = await getDataTables(options);
                dataSecondWorkplace.push(convertToDataTable(second));

                delete options.secondWorkplace;
                options.thirdWorkplace = +id;
                const third = await getDataTables(options);
                dataThirdWorkplace.push(convertToDataTable(third));
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


    }
    const renderReports = () => {
        if (!reports) return [];
        return reports.map(report => {
            return ([
                `${getCorrectlyFormatData(report.startProduction)}  -  ${getCorrectlyFormatData(report.endProduction)}`, report.totalQuantityProduced, report.series, `${report.performancePerHour} h`, report.speedMachinePerCycle, report.line.name, `${report.firstWorkplace.name} ${report.firstWorkplace.lastName}`, `${report.secondWorkplace.name} ${report.secondWorkplace.lastName}`, `${report.thirdWorkplace.name} ${report.thirdWorkplace.lastName}`
            ])
        })

    }
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
                <Typography component='h2' className={classes.reportsHeader}>Raporty</Typography>
                <TableDetails headers={headerReports} rows={renderReports()} summary={false} />
            </Grid> : null}
        </Grid>
    );
};


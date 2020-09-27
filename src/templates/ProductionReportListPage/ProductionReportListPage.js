import React, { useEffect, useState, useRef } from 'react';
import ProductionReportService from '../../services/ProductionReportService';
import Loader from '../../components/Loader';
import DialogMessage from '../../components/DialogMessage';
import ReportsList from '../../components/ReportsList';
import HeaderPage from '../../components/HeaderPage';
import { convertReportsToTable } from '../../helpers/statisticsHelper';

import statistics from '../../services/statisticsService';
import { getEmployee } from '../../services/employeesService';
import LineService from '../../services/LineService';
import { getProduct } from '../../services/ProductService';

import { subtractionDate } from '../../helpers/dateHelper';
import { getQueries } from '../../helpers/requestHelper';
import { statisticsTypes } from './../../utils/conts';
import { Redirect } from 'react-router-dom';

export const ProductionReportListPage = ({ className, match, location }) => {
    let [messages, setMessages] = useState([])
    let [openMessage, setOpenMessage] = useState(false);
    let [reportList, setReportsList] = useState(false);
    let [isFetching, setIsFetching] = useState(false);
    const [objectName, setObjectName] = useState();

    const [queries, setQueries] = useState('INIT');

    useEffect(() => {
        const queries = getQueries(location.search)
        setQueries(queries);
        try {
            switch (queries.type) {
                case statisticsTypes.EMPLOYEE:
                    getEmployee(queries.id).then(({ name, lastName }) => setObjectName(`${name} ${lastName}`));
                    break;
                case statisticsTypes.PRODUCT:
                    getProduct(queries.id).then(({ name }) => setObjectName(`${name}`));
                    break;
                case statisticsTypes.LINE:
                    LineService.get(queries.id).then(({ name }) => setObjectName(`${name}`));
                    break;
                default:
            }
        }
        catch (err) {
            console.log(`BŁĄD POBRANIA OBIEKTU ${err}`)
        }

    }, [location.search])


    useEffect(() => {
        if ((queries && queries.hasOwnProperty('type')) && (queries && queries.hasOwnProperty('id'))) {
            if (queries.type !== statisticsTypes.EMPLOYEE && queries.type !== statisticsTypes.LINE && queries.type !== statisticsTypes.PRODUCT) {
                return;
            }

            const start = queries.start ? new Date(queries.start) : new Date(subtractionDate(30));
            const end = queries.end ? new Date(queries.end) : new Date();
            const dataRequest = {
                start,
                end,
                id: [queries.id],
                type: queries.type.toUpperCase(),
                options: {},
            }
            statistics.create(dataRequest)
                .then(data => {
                    setReportsList(convertReportsToTable(data.dataReport));
                }).catch(status => {
                    setOpenMessage(true);
                    setMessages(['nie usało się pobrać raportów', `status ${status}`])
                })
        } else {
            if (queries === 'INIT') return
            const sorterByNewest = (a, b) => new Date(b.productionEnd).getTime() - new Date(a.productionEnd).getTime();
            setIsFetching(true);
            ProductionReportService.getAll()
                .then(data => {
                    setReportsList(data.sort(sorterByNewest));
                    setIsFetching(false);
                })
                .catch(err => {
                    setMessages(['błąd połączenia']);
                    setOpenMessage(true);
                    setIsFetching(false);
                });
        }
    }, [queries])

    const handleCloseMessage = () => {
        setOpenMessage(false);
        setMessages([]);
    };
    const renderTitle = () => {
        if (!queries || !objectName) return 'Lista raportów'
        switch (queries.type) {
            case statisticsTypes.EMPLOYEE:
                return 'Lista raportów dla pracownika ' + objectName
            case statisticsTypes.PRODUCT:
                return 'Lista raportów dla produktu ' + objectName
            case statisticsTypes.LINE:
                return 'Lista raportów dla linii ' + objectName
            default:
                return 'Lista raportów '
        }
    }

    const remove = async (id) => {
        const confirm = window.confirm("Czy na pewno chcesz usunąc raport?");
        if (!confirm) return;
        setReportsList(true);
        try {
            await ProductionReportService.remove(id);
            setReportsList(false);
            setReportsList(prevState => prevState.filter(report => report.id !== id));
            setMessages(['Usunieto raport']);
            setOpenMessage(true);
        } catch (status) {
            setMessages(['Wystąpił problem z usunieciem raportu', `status ${status}`]);
            setOpenMessage(true);
            setReportsList(false);
        };
    };

    return (
        <div className={className}>
            <Loader open={isFetching} />
            <DialogMessage open={openMessage} close={handleCloseMessage} messages={messages} />
            <HeaderPage title={renderTitle()} />
            <ReportsList list={reportList} remove={remove} isFetching={isFetching} />
        </div>
    );
};



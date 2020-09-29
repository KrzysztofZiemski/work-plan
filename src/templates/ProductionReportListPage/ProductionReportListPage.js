import React, { useEffect, useState } from 'react';
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

export const ProductionReportListPage = ({ className, match, location }) => {
    let [messages, setMessages] = useState([])
    let [openMessage, setOpenMessage] = useState(false);
    let [reportList, setReportsList] = useState(false);
    let [isFetching, setIsFetching] = useState(false);
    const [objectName, setObjectName] = useState('');
    console.log('objectName', objectName)
    const getNameObject = (type, id) => {
        switch (type) {
            case statisticsTypes.EMPLOYEE:
                return getEmployee(id).then(({ name, lastName }) => `${name} ${lastName}`);
            case statisticsTypes.PRODUCT:
                return getProduct(id).then(({ name }) => `${name}`);
            case statisticsTypes.LINE:
                return LineService.get(id).then(({ name }) => `${name}`);
            default:
                return Promise.resolve(null)
        }
    }
    useEffect(() => {
        const queries = getQueries(location.search)
        if (queries && queries.type && queries.id) {

            getNameObject(queries.type, queries.id)
                .then(name => setObjectName(name))
                .catch(err => console.log(`nie udało się pobrać nazwy obiektu`, err));
        };

        setIsFetching(true);
        if (!queries || (queries.type !== statisticsTypes.EMPLOYEE && queries.type !== statisticsTypes.LINE && queries.type !== statisticsTypes.PRODUCT)) {
            const sorterByNewest = (a, b) => new Date(b.productionEnd).getTime() - new Date(a.productionEnd).getTime();
            ProductionReportService.getAll()
                .then(data => {
                    setReportsList(data.sort(sorterByNewest));
                    setIsFetching(false);
                }).catch(status => {
                    setIsFetching(false);
                    setMessages(['Błąd pobrania raportów', `status ${status}`]);
                    setOpenMessage(true);
                })
        } else {
            if (!queries.id) {
                setMessages(['Sprawdź poprawność linku']);
                setOpenMessage(true);
                setIsFetching(false);
                return;
            }
            const start = queries.start ? new Date(queries.start) : new Date(subtractionDate(365 * 5));
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
                    setIsFetching(false);
                }).catch(status => {
                    setOpenMessage(true);
                    setMessages(['nie usało się pobrać raportów', `status ${status}`]);
                    setIsFetching(false);
                })
        }


    }, [location.search])

    const handleCloseMessage = () => {
        setOpenMessage(false);
        setMessages([]);
    };

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
            <HeaderPage title={`Lista raportów ${objectName ? `dla ${objectName}` : ''}`} />
            <ReportsList list={reportList} remove={remove} isFetching={isFetching} />
        </div>
    );
};



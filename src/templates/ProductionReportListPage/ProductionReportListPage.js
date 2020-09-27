import React, { useEffect, useState, useRef } from 'react';
import ProductionReportService from '../../services/ProductionReportService';
import Loader from '../../components/Loader';
import DialogMessage from '../../components/DialogMessage';
import ReportsList from '../../components/ReportsList';
import HeaderPage from '../../components/HeaderPage';
import { convertReportsToTable } from '../../helpers/statisticsHelper';
import statistics from '../../services/statisticsService';
import { subtractionDate } from '../../helpers/dateHelper';
import { getQueries } from '../../helpers/requestHelper';

export const ProductionReportListPage = ({ className, match, location }) => {

    getQueries(location.search)
    let [messages, setMessages] = useState([])
    let [openMessage, setOpenMessage] = useState(false);
    let [reportList, setReportsList] = useState(false);
    let [isFetching, setIsFetching] = useState(false);
    const queries = useRef();

    useEffect(() => {
        queries.current = getQueries(location.search);
    }, [location.search])

    useEffect(() => {
        if ((queries.current && queries.current.hasOwnProperty('type')) && (queries.current && queries.current.hasOwnProperty('id'))) return;
        // if (queries.current.hasOwnProperty('type')) return
        // if (!queries.current.type || !queries.current.id) return;
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
    }, [location])

    useEffect(() => {
        if (!(queries.current && queries.current.hasOwnProperty('type')) || !(queries.current && queries.current.hasOwnProperty('id'))) return;
        const start = queries.current.start ? new Date(queries.current.start) : new Date(subtractionDate(30));
        const end = queries.current.end ? new Date(queries.current.end) : new Date();
        const dataRequest = {
            start,
            end,
            id: [queries.current.id],
            type: queries.current.type.toUpperCase(),
            options: {},
        }
        console.log('dataRequest', dataRequest)
        statistics.create(dataRequest)
            .then(data => {
                console.log('data', data)
                setReportsList(convertReportsToTable(data.dataReport));
            }).catch(err => console.log('err', err))
    }, [])


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
            <HeaderPage title='Lista raportów' />
            <ReportsList list={reportList} remove={remove} isFetching={isFetching} />
        </div>
    );
};



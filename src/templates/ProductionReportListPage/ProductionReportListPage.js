import React, { useEffect, useState } from 'react';
import ProductionReportService from '../../services/ProductionReportService';
import Loader from '../../components/Loader';
import DialogMessage from '../../components/DialogMessage';
import ReportsList from '../../components/ReportsList';
import HeaderPage from '../../components/HeaderPage';

export const ProductionReportListPage = ({ className }) => {

    let [messages, setMessages] = useState([])
    let [openMessage, setOpenMessage] = useState(false);
    let [reportList, setReportsList] = useState(false);
    let [isFetching, setIsFetching] = useState(false);

    useEffect(() => {

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
    console.log(reportList)
    return (
        <div className={className}>
            <Loader open={isFetching} />
            <DialogMessage open={openMessage} close={handleCloseMessage} messages={messages} />
            <HeaderPage title='Lista raportów' />
            <ReportsList list={reportList} remove={remove} isFetching={isFetching} />
        </div>
    );
};



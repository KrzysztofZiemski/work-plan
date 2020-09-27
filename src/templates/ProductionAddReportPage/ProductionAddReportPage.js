import React, { useState, useEffect } from 'react';

import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

import AddReportForm from '../../components/AddReportForm';
import Loader from '../../components/Loader';
import DialogMessage from '../../components/DialogMessage';
import ReportsList from '../../components/ReportsList';
import ProductionReportService from '../../services/ProductionReportService';
import HeaderPage from '../../components/HeaderPage';


const styles = makeStyles({
    card: {
        margin: '0 auto',
        width: '99%'
    }
})
//TODO - texthelper for date
export const ProductionAddReportPage = ({ className }) => {
    let [messages, setMessages] = useState([])
    let [openMessage, setOpenMessage] = useState(false);
    let [isFetching, setIsFetching] = useState(false);
    let [dateEnd, setDateEnd] = useState(false);
    let [reportList, setReportsList] = useState(false);
    useEffect(() => {
        const sorterByNewest = (a, b) => new Date(b.productionEnd).getTime() - new Date(a.productionEnd).getTime();

        ProductionReportService.getAll()
            .then(data => setReportsList(data.sort(sorterByNewest)))
            .catch(err => {
                setMessages(['błąd połączenia']);
                setOpenMessage(true)
            });
    }, [])
    // const { loggedUser } = useContext(UserContext);
    const classes = styles();

    const handleCloseMessage = () => {
        setOpenMessage(false);
        setMessages([]);
    };

    const handleOpenMessage = (messageArr) => {
        setOpenMessage(true);
        setMessages(messageArr)
    };

    const handleSubmit = (data) => {

        setIsFetching(true);
        return ProductionReportService.save(data)
            .then(data => {
                setIsFetching(false);
                handleOpenMessage(['Dodano raport']);
                setDateEnd(new Date())
                return true;
            })
            .catch(err => {
                setIsFetching(false);
                handleOpenMessage(['Nie udało się zapisać raportu', 'wystąpił błąd łączności', `status ${err}`]);
                return false;
            })
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
        <section className={className}>
            <Loader open={isFetching} />
            <DialogMessage open={openMessage} close={handleCloseMessage} messages={messages} />
            <Card className={classes.card}>
                <HeaderPage title='Wprowadź raport produkcji' />
                <AddReportForm setMessage={handleOpenMessage} isSubmiting={isFetching} onSubmit={handleSubmit} />
            </Card>
            <ReportsList pagination={5} list={reportList} remove={remove} isFetching={isFetching} />
        </section>
    )
};
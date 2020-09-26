import React, { useState, useContext } from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';

import AddReportForm from '../../components/AddReportForm';
import Loader from '../../components/Loader';
import DialogMessage from '../../components/DialogMessage';
import ReportsList from './../../components/ReportsList';
import ProductionReportService from '../../services/ProductionReportService';
import { UserContext } from '../../Contexts';
import HeaderPage from '../../components/HeaderPage';

const styles = makeStyles({
    card: {
        margin: '0 auto',
        width: '99%'
    }
})
//TODO - texthelper for date
export const ProductionReportPage = ({ className }) => {
    let [messages, setMessages] = useState([])
    let [openMessage, setOpenMessage] = useState(false);
    let [isSubmiting, setIsSubmiting] = useState(false);
    let [dateStart, setDateStart] = useState(false);
    let [dateEnd, setDateEnd] = useState(false);

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

        setIsSubmiting(true);
        return ProductionReportService.save(data)
            .then(data => {
                setIsSubmiting(false);
                handleOpenMessage(['Dodano raport']);
                setDateEnd(new Date())
                return true;
            })
            .catch(err => {
                setIsSubmiting(false);
                handleOpenMessage(['Nie udało się zapisać raportu', 'wystąpił błąd łączności', `status ${err}`]);
                return false;
            })
    };

    return (
        <section className={className}>
            <Loader open={isSubmiting} />
            <DialogMessage open={openMessage} close={handleCloseMessage} messages={messages} />
            <Card className={classes.card}>
                <HeaderPage title='Wprowadź raport produkcji' />
                <AddReportForm setMessage={handleOpenMessage} isSubmiting={isSubmiting} onSubmit={handleSubmit} />
            </Card>
            <ReportsList pagination={5} endDate={dateEnd} />
        </section>
    )
};
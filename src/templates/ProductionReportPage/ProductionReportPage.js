import React, { useState } from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';

import AddReportForm from './AddReportForm';
import Loader from '../../components/Loader';
import DialogMessage from '../../components/DialogMessage';
import ReportsList from './ReportsList';

const styles = makeStyles({
    cardHeader: {
        textAlign: 'center'
    },
    card: {
        margin: '0 auto',
        width: '99%'
    }
})

export const ProductionReportPage = () => {
    let [messages, setMessages] = useState('')
    let [openMessage, setOpenMessage] = useState(false);
    let [wait, setWait] = useState(false);

    const classes = styles();

    const handleClose = () => {
        setOpenMessage(false)
    }
    return (
        <section>
            <Loader open={wait} />
            <DialogMessage open={openMessage} close={handleClose} messages={messages} />
            <Card className={classes.card}>
                <CardHeader component='h1' title=' Wprowadź raport' className={classes.cardHeader} />
                <AddReportForm setOpenMessage={setOpenMessage} setMessages={setMessages} setLoader={setWait} />
            </Card>
            <ReportsList />
        </section>
    )
};
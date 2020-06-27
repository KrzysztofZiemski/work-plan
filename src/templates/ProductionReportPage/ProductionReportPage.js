import React, { useState } from 'react';
import { AddReportForm } from './AddReportForm';
import Loader from '../../components/Loader';
import DialogMessage from '../../components/DialogMessage';

export const ProductionReportPage = () => {
    let [messages, setMessages] = useState('')
    let [openMessage, setOpenMessage] = useState(false)
    const handleClose = () => {
        setOpenMessage(false)
    }
    return (
        <section>
            <DialogMessage open={openMessage} close={handleClose} messages={messages} />
            <AddReportForm setOpenMessage={setOpenMessage} setMessages={setMessages} />
        </section>
    )
}
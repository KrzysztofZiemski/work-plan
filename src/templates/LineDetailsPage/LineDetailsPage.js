import React, { useState, useEffect } from 'react';

import LineService from '../../services/LineService';
import DialogMessage from '../../components/DialogMessage';
import { makeStyles } from '@material-ui/core/styles';

import LineTable from './LineTable';
import { Grid, Card } from '@material-ui/core';
import HeaderDetailsCircles from '../../components/HeaderDetailsCircles';
import HeaderDetails from '../../components/HeaderDetails';


export const LineDetailsPage = props => {
    const { match: { params } } = props;
    let [line, setLine] = useState('');
    let [message, setMessage] = useState({ isOpen: false, text: [] });

    const content = [
        {
            label: 'Linia',
            name: 'name',
            value: line.name,
            type: 'h1',
            edit: true
        },
        {
            label: 'Numer linii',
            value: line.numberLine,
            name: 'numberLine',
            type: 'p'
        }
    ]

    const handleCloseMessage = () => {
        setMessage({ isOpen: false, text: [] })
    }

    useEffect(() => {
        LineService.get(params.idLine)
            .then(data => setLine(data))
            .catch(status => {
                if (status === 404) {
                    setMessage({ isOpen: true, text: ['Sprawdź poprawność linku', 'Błąd przy próbie pobrania informacji'] })
                }
                setMessage({ isOpen: true, text: ['Wystąpił błąd łączności', `Błąd ${status}`, 'spróbuj ponownie'] })
            })

    }, [params.idLine])
    return (
        <section className={props.className}>
            <DialogMessage open={message.isOpen} close={handleCloseMessage} messages={message.text} />
            <Card container component={Grid}>
                <HeaderDetails content={content} />
                <HeaderDetailsCircles title='Produkcja' id={params.idLine} type='LINE' setMessage={setMessage} />
            </Card>
            {/* <LineTable id={params.idLine} type='LINE' /> */}
        </section >
    );
};

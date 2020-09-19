import React, { useState, useEffect } from 'react';

import LineService from '../../services/LineService';
import DialogMessage from '../../components/DialogMessage';

import LineTable from './LineTable';
import { Grid, Card } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';

import HeaderDetailsCircles from '../../components/HeaderDetailsCircles';
import HeaderDetails from '../../components/HeaderDetails';
import routes from '../../utils/routes';
import { Redirect } from 'react-router-dom';


export const LineDetailsPage = props => {


    const { match: { params } } = props;
    const [line, setLine] = useState('');
    const [message, setMessage] = useState({ isOpen: false, text: [] });
    const [isExistingId, setIsExistingId] = useState(true);
    const [isSubmiting, setIsSubmiting] = useState(false);
    const content = [
        {
            label: 'Linia',
            name: 'name',
            value: line.name,
            edit: true,
            pattern: '.{4,30}',
            errorMessage: 'Nazwa linii musi zawierać od 4 do 30 znaków'
        },
        {
            label: 'Numer linii',
            value: line.numberLine,
            name: 'numberLine',
            type: 'number'
        }
    ]

    const handleCloseMessage = () => {
        setMessage({ isOpen: false, text: [] })
    };

    const handleUpdateLine = (data) => {
        setIsSubmiting(true);
        LineService.update(params.idLine, data)
            .then(res => {
                setIsSubmiting(false);
                setLine(res);
                setMessage({ isOpen: true, text: ['Zaktualizowano'] });
            })
            .catch(err => {
                setIsSubmiting(false);
                setMessage({ isOpen: true, text: ['Wystąpił błąd łączności', `Błąd ${err}`, 'spróbuj ponownie'] });
            });
    }
    const handleRemoveLine = () => {
        const answer = window.confirm("Czy na pewno chcesz usunąć produkt?");
        if (!answer) return
        setIsSubmiting(true);
        LineService.remove(params.idLine)
            .then(res => {
                setMessage({ isOpen: true, text: ['Usunieto linię'] });
                setTimeout(() => setIsExistingId(false), 2000);
                setIsSubmiting(false);
            })
            .catch(err => {
                setIsSubmiting(false);
                setMessage({ isOpen: true, text: ['Wystąpił błąd łączności', `Błąd ${err}`, 'spróbuj ponownie'] })
            });
    }

    useEffect(() => {
        setIsSubmiting(true);
        LineService.get(params.idLine)
            .then(data => {
                setIsSubmiting(false);
                setLine(data);
            })
            .catch(status => {
                setIsSubmiting(false);
                if (status === 404) {
                    setMessage({ isOpen: true, text: ['Sprawdź poprawność linku', 'Linia nie istnieje'] })
                    setTimeout(() => setIsExistingId(false), 3000)
                    return <Redirect to={routes.lineManagement} />
                }
                setMessage({ isOpen: true, text: ['Wystąpił błąd łączności', `Błąd ${status}`, 'spróbuj ponownie'] })
            })

    }, [params.idLine])
    return (
        isExistingId ? (
            <section className={props.className} >
                <DialogMessage open={message.isOpen} close={handleCloseMessage} messages={message.text} />
                <Card container component={Grid}>
                    <HeaderDetails content={content} onChange={handleUpdateLine} onRemove={handleRemoveLine} isSubmiting={isSubmiting} />
                    <HeaderDetailsCircles title='Produkcja' id={params.idLine} type='LINE' setMessage={setMessage} />
                </Card>
                <LineTable id={params.idLine} type='LINE' />
            </section >
        ) :
            <Redirect to={routes.lineManagement} />
    );
};

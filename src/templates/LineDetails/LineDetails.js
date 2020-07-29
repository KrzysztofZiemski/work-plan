import React, { useState, useEffect } from 'react';

import LineService from '../../services/LineService';
import DialogMessage from '../../components/DialogMessage';
import { makeStyles } from '@material-ui/core/styles';

import StatisticsContainer from './StatisticsContainer';
import { Grid, Card } from '@material-ui/core';
import HeaderDetailsCircles from '../../components/HeaderDetailsCircles';
import HeaderDetails from './../../components/HeaderDetails';

const styles = makeStyles(({

}))

const LineDetails = props => {
    const { match: { params } } = props;

    let [line, setLine] = useState('');
    let [message, setMessage] = useState({ isOpen: false, text: [] });

    const content = [
        {
            name: 'Linia',
            value: line.name,
            type: 'h1'
        },
        {
            name: 'Numer linii',
            value: line.numberLine,
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
        <div>
            <DialogMessage open={message.isOpen} close={handleCloseMessage} messages={message.text} />
            <Card container component={Grid}>
                <HeaderDetails content={content} />
                <HeaderDetailsCircles title='Produkcja' id={params.idLine} type='LINE' setMessage={setMessage} />
            </Card>
            {/* <HeaderDetails content={content} type='LINE' setMessage={setMessage} id={params.idLine} /> */}
            <StatisticsContainer id={params.idLine} type='LINE' />
        </div >
    );
};

// LineDetails.propTypes = {

// };

export default LineDetails;
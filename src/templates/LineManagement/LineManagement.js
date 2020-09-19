import React, { useEffect, useContext, useState } from 'react';
import { LinesContext } from '../../Contexts';
import LineService from '../../services/LineService';
import DialogMessage from '../../components/DialogMessage';
import Loader from '../../components/Loader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TableLines from './TableLines';
import AddFormDialog from '../../components/AddFormDialog';
import HeaderPage from '../../components/HeaderPage';

const fieldsAddLine = [
    {
        name: 'name',
        type: 'text',
        label: 'nazwa linii',
        pattern: '.{4,30}',
        errorMessage: 'Nazwa linii musi zawierać od 4 do 30 znaków'
    },
    {
        name: 'numberLine',
        label: 'numer linii',
        type: 'number',
        pattern: '^[1-9][0-9]*$',
        errorMessage: 'musi być liczbą większą od zera'
    }
];
const useStyles = makeStyles(theme => ({
    header: {
        backgroundColor: '#222d32',
        color: '#fff',
        padding: 10
    },
    formControl: {
        minWidth: 180,
    },
}));

export const LineManagement = ({ className }) => {
    const classes = useStyles();
    const { linesList, setLinesList } = useContext(LinesContext);
    let [openMessage, setOpenMessage] = useState(false);
    let [message, setMessage] = useState([]);
    let [fetching, setFetching] = useState(false);

    useEffect(() => {
        if (linesList.length < 1) {
            LineService.getAllLines().then(data => setLinesList(data))
                .catch(err => {
                    setMessage(['Nie udało się połączyc z serwerem', `status ${err}`])
                    setOpenMessage(true);
                })
        }
    }, [linesList, setFetching, setLinesList, setMessage, setOpenMessage])
    const refresh = () => {
        LineService.getAllLines().then(data => setLinesList(data))
            .catch(err => {
                setMessage(['Nie udało się połączyc z serwerem', `status ${err}`])
                setOpenMessage(true);
            })
    }
    const handleRemove = (lines) => {
        setFetching(true);
        const deletedLinesMessage = [];
        const errors = [];
        const requests = lines.map(line => {
            return LineService.remove(line.id)
                .then(resData => deletedLinesMessage.push(`nazwa: ${resData.name}, numer: ${resData.numberLine}`))
                .catch(status => errors.push(status));
        })
        Promise.all(requests)
            .then(() => {
                setFetching(false);
                setMessage(['usunięte linie:', ...deletedLinesMessage]);
                setOpenMessage(true);
                refresh();
            }).catch(err => {
                setFetching(false);
                setMessage(['Wystąpił błąd podczas usuwania elementów', 'usunięte linie:', ...deletedLinesMessage, 'status błędów:', ...errors])
                setOpenMessage(true);
                refresh();
            })
    }
    const handleAdd = (data) => {
        setFetching(true);
        LineService.add(data).then(resData => {
            setFetching(false);
            setMessage(['Dodano linię', `nazwa: ${resData.name}, numer: ${resData.numberLine}`]);
            setOpenMessage(true);
            refresh();
        })
            .catch(status => {
                setFetching(false);
                const message = status === 409 ? 'istnieje już linia o takiej nazwie lub numerze' : 'nie udało się dodać linii';
                setMessage([message, `błąd ${status}`]);
                setOpenMessage(true);
                refresh();
            })
    }
    const handleCloseMessage = () => {
        setOpenMessage(false);
    }
    return (
        <Grid container component='section' direction='column' className={className}>
            <DialogMessage open={openMessage} close={handleCloseMessage} messages={message} />
            <Grid item>
                <HeaderPage title='Linie'></HeaderPage>
            </Grid>
            <Grid container>
                <Grid item>
                    <AddFormDialog onSubmit={handleAdd} fields={fieldsAddLine} button='Dodaj linie' title='dodaj linie' />
                </Grid>
            </Grid>
            <Grid item>
                <TableLines list={linesList} remove={handleRemove}></TableLines>
            </Grid>
            <Loader open={fetching} />
        </Grid>
    )
}
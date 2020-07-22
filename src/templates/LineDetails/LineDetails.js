import React, { useState, useEffect } from 'react';

import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import PrimaryButton from '../../components/PrimaryButton';
import LineService from '../../services/LineService';
import DialogMessage from '../../components/DialogMessage';
import CircleProgress from '../../components/CircleProgress';
import statisticsService from '../../services/statisticsService';
import DateTimePicker from './DateTimePicker';

const styles = makeStyles(({
    root: {
        padding: 30
    },
    changeButton: {
        fontSize: 8,
        marginLeft: 10,
    },
}));

const LineDetails = props => {
    const { match: { params } } = props;
    const classes = styles();
    let [line, setLine] = useState('');
    let [lastStats, setLastStats] = useState({
        last24H: '',
        last7Days: '',
        last30Days: ''
    });

    let [message, setMessage] = useState({ isOpen: false, text: [] });
    const getSubtractionDate = (countDays = 0, date) => {
        const subtractionMilliseconds = countDays * 24 * 60 * 60 * 1000;
        const dateStart = date ? new Date(date).getTime() : Date.now();
        return new Date(dateStart - subtractionMilliseconds);
    }
    const getFormatData = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        return `${year}-${month}-${day}-${hours}:${minutes}`
    }

    const getDataRequest = (start, end, type = 'LINE', options = { percentage: true, totalProduced: true }) => ({
        start: getFormatData(start),
        end: getFormatData(end),
        idItems: [
            params.idLine
        ],
        options,
        type
    })
    useEffect(() => {

        const getLastStats = async () => {
            try {
                const last24Hoptions = getDataRequest(getSubtractionDate(100), getSubtractionDate(0));
                const last7Doptions = getDataRequest(getSubtractionDate(20), getSubtractionDate(0));
                const last30Doptions = getDataRequest(getSubtractionDate(100), getSubtractionDate(0));

                const last24H = await statisticsService.create(last24Hoptions).then(data => data.options);
                const last7Days = await statisticsService.create(last7Doptions).then(data => data.options);
                const last30Days = await await statisticsService.create(last30Doptions).then(data => data.options);

                setLastStats(prevStats => ({
                    ...prevStats, last24H: last24H, last7Days: last7Days, last30Days: last30Days
                }))
            } catch (err) {
                setMessage({ isOpen: true, text: ['Coś poszło nie tak', 'Błąd przy próbie pobrania informacji', `Błąd ${err}`] })
            }
        }
        getLastStats();
        LineService.get(params.idLine)
            .then(data => setLine(data))
            .catch(status => {
                if (status === 404) {
                    setMessage({ isOpen: true, text: ['Sprawdź poprawność linku', 'Błąd przy próbie pobrania informacji'] })
                }
                setMessage({ isOpen: true, text: ['Wystąpił błąd łączności', `Błąd ${status}`, 'spróbuj ponownie'] })
            })

        return () => {

        }
    }, [params.idLine]);

    const handleCloseMessage = () => {
        setMessage({ isOpen: false, text: [] })
    }

    return (
        <div className={classes.root}>
            <DateTimePicker></DateTimePicker>
            <DialogMessage open={message.isOpen} close={handleCloseMessage} messages={message.text} />
            <Grid container>
                <Grid>
                    <Grid container direction='row' >
                        <Grid>
                            <Typography component='h1'>
                                {line.name}
                            </Typography>
                        </Grid>
                        <Grid>
                            <PrimaryButton value='Zmień nazwę' size='small' className={classes.changeButton} />
                        </Grid>
                    </Grid>
                    <Grid>
                        <Typography component='p'>
                            {`Numer linii: ${line.numberLine}`}
                        </Typography>
                    </Grid>
                    <Grid>
                        <Typography component='p' >
                            Produkcja
                        </Typography>
                    </Grid>
                </Grid>
                <Grid>
                    <Grid>
                        {lastStats.last24H.percentage ? < CircleProgress value={lastStats.last24H.percentage} title='24H' /> : ''}
                        < Typography > {lastStats.last24H.totalProduced}</Typography>
                    </Grid>
                    <Grid>
                        {lastStats.last7Days.percentage ? < CircleProgress value={lastStats.last7Days.percentage} title='7 dni' /> : ''}
                        < Typography > {lastStats.last7Days.totalProduced}</Typography>
                    </Grid>
                    <Grid>
                        {lastStats.last30Days.percentage ? < CircleProgress value={lastStats.last30Days.percentage} title='30 dni' /> : ''}
                        < Typography > {lastStats.last30Days.totalProduced}</Typography>
                    </Grid>
                </Grid>
            </Grid>

        </div >
    );
};

// LineDetails.propTypes = {

// };

export default LineDetails;
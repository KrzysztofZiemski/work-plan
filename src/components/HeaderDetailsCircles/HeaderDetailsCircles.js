import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import CircleProgress from '../CircleProgress';
import { getCorrectlyFormatData, subtractionDate } from '../../helpers/dateHelper';
import statisticsService from '../../services/statisticsService';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(({
    root: {
        flexGrow: 1
    },
    circlesContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexGrow: 1,
        padding: 10,
        minHeight: 320,
        width: '100%',
        height: '100%',
        paddingRight: '9%'
    },
    circle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 190,
        fontSize: '20px',
        justifyContent: 'space-between',
        '& p': {
            fontSize: 20,
        },

    },
    productionTitle: {
        alignSelf: 'flex-end',
        fontSize: 20,
        width: 40,
        position: 'relative',
        paddingTop: 15
    },
    productionTitle__border: {
        position: 'absolute',
        width: '100vw',
        height: 2,
        top: 0,
        left: '50%',
        backgroundColor: '#bc493c'
    }
}))


export const HeaderDetailsCircles = ({ title, id, type, setMessage, className }) => {
    let [lastStats, setLastStats] = useState({
        last24H: '',
        last7Days: '',
        last30Days: ''
    });
    const classes = styles();

    const convertNumber = (number) => {
        if (!number && number !== 0) return;

        const arr = Array.from(String(number), Number);
        for (let i = arr.length - 3; i >= 0; i = i - 3) {
            arr.splice(i, 0, ' ');
        };
        return arr;
    };
    const getDataRequest = (start, end, options = { percentage: true, totalProduced: true }) => ({
        start,
        end,
        idItems: [id],
        options,
        type
    });
    useEffect(() => {

        const getLastStats = async () => {
            try {
                const last24Hoptions = getDataRequest(subtractionDate(1), subtractionDate(0));
                const last7Doptions = getDataRequest(subtractionDate(7), subtractionDate(0));
                const last30Doptions = getDataRequest(subtractionDate(30), subtractionDate(0));

                const last24H = await statisticsService.createCircle(last24Hoptions).then(data => data.options);
                const last7Days = await statisticsService.createCircle(last7Doptions).then(data => data.options);
                const last30Days = await await statisticsService.createCircle(last30Doptions).then(data => data.options);

                setLastStats(prevStats => ({
                    ...prevStats, last24H: last24H, last7Days: last7Days, last30Days: last30Days
                }))
                setLastStats(prevStats => ({
                    ...prevStats, last24H: last24H
                }))
            } catch (err) {
                setMessage({ isOpen: true, text: ['Coś ssssssposzło nie tak', 'Błąd przy próbie pobrania informacji', `Błąd ${err}`] })
            }
        }
        getLastStats();

        return () => {

        }
    }, [id]);


    return (
        <Grid className={className ? className : classes.root}>
            <Grid className={classes.circlesContainer}>
                <Grid className={classes.productionTitle}>
                    < Typography > {title ? title : ''}</Typography>
                    <span className={classes.productionTitle__border}></span>
                </Grid>
                <Grid className={classes.circle}>
                    {lastStats.last24H.percentage ? < CircleProgress value={lastStats.last24H.percentage} title='24H' /> : ''}
                    < Typography > {convertNumber(lastStats.last24H.totalProduced)}</Typography>
                </Grid>
                <Grid className={classes.circle}>
                    {lastStats.last7Days.percentage ? < CircleProgress value={lastStats.last7Days.percentage} title='7 dni' /> : ''}
                    < Typography > {convertNumber(lastStats.last7Days.totalProduced)}</Typography>
                </Grid>
                <Grid className={classes.circle}>
                    {lastStats.last30Days.percentage ? < CircleProgress value={lastStats.last30Days.percentage} title='30 dni' /> : ''}
                    < Typography > {convertNumber(lastStats.last30Days.totalProduced)}</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};


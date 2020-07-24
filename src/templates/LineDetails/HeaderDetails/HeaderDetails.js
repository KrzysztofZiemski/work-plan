import React, { useEffect, useState } from 'react';
import { Typography, Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import PrimaryButton from '../../../components/PrimaryButton';
import CircleProgress from '../../../components/CircleProgress';
import statisticsService from '../../../services/statisticsService';

const styles = makeStyles(({
    root: {
        minHeight: '30vh',
        margin: 5,
        display: 'flex'
    },
    about: {
        display: 'flex',
        minWidth: 380,
        borderRadius: 20,
        backgroundColor: 'rgba(60,141,188,.1)',
        margin: '10px 40px 10px 10px',
        boxShadow: 'inset 39px 0px 78px -28px rgba(60,141,188,0.74)'
    },
    about__titles: {
        padding: '0 40px 0 30px',
        position: 'relative',
        overflow: 'hidden',
        '& *': {
            margin: 20
        }
    },
    about__separator: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 2,
        height: '100%',
        backgroundColor: 'rgba(60,141,188,0.74)'
    },
    about__values: {
        padding: '0 40px 0 30px',
        '& *': {
            margin: 20
        },
        height: '100%'
    },
    circlesContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexGrow: 1,
        padding: 10,
        paddingRight: 40,

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
        width: 40
    }
}));

export const HeaderDetails = ({ content, id, setMessage }) => {

    const classes = styles();

    let [lastStats, setLastStats] = useState({
        last24H: '',
        last7Days: '',
        last30Days: ''
    });


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
            id
        ],
        options,
        type
    })
    const convertNumber = (number) => {
        if (!number && number !== 0) return;

        const arr = Array.from(String(number), Number);
        for (let i = arr.length - 3; i >= 0; i = i - 3) {
            arr.splice(i, 0, ' ');
        };
        return arr;
    };

    useEffect(() => {

        const getLastStats = async () => {
            try {
                const last24Hoptions = getDataRequest(getSubtractionDate(100), getSubtractionDate(0));
                const last7Doptions = getDataRequest(getSubtractionDate(50), getSubtractionDate(0));
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

        return () => {

        }
    }, [id, setMessage]);
    const renderDetails = () => {
        const titles = [];
        const values = [];
        content.forEach((element, index) => {
            titles.push(<Typography key={element.name + index} component={'p'}>{element.name}</Typography>)
            values.push(<Typography key={element.value + index} component={element.type ? element.type : 'p'}>{element.value}</Typography>)
        })
        return (
            <>
                <Grid className={classes.about__titles}>
                    {titles}
                    <span className={classes.about__separator}></span>
                </Grid>
                <Grid className={classes.about__values}>
                    {values}
                </Grid>
            </>
        )
    }
    return (
        <Paper container className={classes.root}>
            <Paper className={classes.about}>
                {renderDetails()}
            </Paper>
            <Grid className={classes.circlesContainer}>
                < Typography className={classes.productionTitle}> Produkcja</Typography>
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
        </Paper >
    );
};


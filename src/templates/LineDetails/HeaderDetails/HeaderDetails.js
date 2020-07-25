import React, { useEffect, useState } from 'react';
import { Typography, Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { getCorrectlyFormatData, subtractionDate } from '../../../helpers/dataHelper';
import PrimaryButton from '../../../components/PrimaryButton';
import CircleProgress from '../../../components/CircleProgress';
import statisticsService from '../../../services/statisticsService';

const styles = makeStyles(({
    root: {
        minHeight: '30vh',
        margin: 10,
        display: 'flex',
        backgroundColor: 'rgba(60,141,188,.1)',
        boxShadow: 'inset 39px 0px 78px -28px rgba(60,141,188,0.74)',
        borderRadius: 20,
        overflow: 'hidden'
    },
    about: {
        display: 'flex',
        minWidth: 380,
        borderRadius: 20,
        // backgroundColor: 'rgba(60,141,188,.1)',
        margin: '0px 40px 00px 0px',
        backgroundColor: 'rgba(60,141,188,.1)',
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
        backgroundColor: '#5485a2'
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
}));

export const HeaderDetails = ({ content, id, setMessage }) => {

    const classes = styles();

    let [lastStats, setLastStats] = useState({
        last24H: '',
        last7Days: '',
        last30Days: ''
    });




    const getDataRequest = (start, end, type = 'LINE', options = { percentage: true, totalProduced: true }) => ({
        start: getCorrectlyFormatData(start),
        end: getCorrectlyFormatData(end),
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
                const last24Hoptions = getDataRequest(subtractionDate(100), subtractionDate(0));
                const last7Doptions = getDataRequest(subtractionDate(50), subtractionDate(0));
                const last30Doptions = getDataRequest(subtractionDate(100), subtractionDate(0));

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
                <Grid className={classes.productionTitle}>
                    < Typography > Produkcja</Typography>
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
        </Paper >
    );
};


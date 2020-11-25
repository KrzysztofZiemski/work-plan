
import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import HeaderPage from '../../components/HeaderPage';
import LineView from './LineView';
import LineService from '../../services/LineService';
import statistics from '../../services/statisticsService';

import { subtractionDate } from '../../helpers/dateHelper';

// import hammer from '../../assets/hammer.svg';


const useStyles = makeStyles(({
    root: {
        flexGrow: 1
    },
    header: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '12em',
        fontFamily: '"Roboto Mono", "monospace"',
        textAlign: 'center',
        zIndex: 1,
        textTransform: 'uppercase',
        letterSpacing: '15px',
        color: '#3g3g3g',
        textShadow: '4px 5px 0px white',
    },
    container: {
        position: 'relative',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,.2)'
    },
    img: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        maxWidth: '100%',
    },
    linesContainer: {
        display: 'flex',
        justifyContent: 'center'
    },
    lines: {
        margin: '20px 2%',
    }
}));

export const DashboardPage = ({ ...props }) => {
    const classes = useStyles();
    const [lines, setLines] = useState([])

    useEffect(() => {
        const handleGetStatsLine = async () => {
            try {
                const linesArr = await LineService.getAllLines();
                const linesStatistics = []

                const data = {
                    end: new Date(),
                    id: [1],
                    options: {},
                    start: subtractionDate(111, new Date()),
                    type: "LINE",
                }
                for (let i = 0; i < linesArr.length; i++) {
                    data.id = [linesArr[i].id];
                    const stats = await statistics.create(data);
                    const item = { ...stats, ...linesArr[i] }
                    linesStatistics.push(item);
                }
                setLines(linesStatistics)

            } catch {
                //handle errors
            }
        }
        handleGetStatsLine()
    }, [])

    return (
        <section className={classes.root} {...props}>
            <HeaderPage title='Podgląd ostatnie 24h' />
            <Grid className={classes.linesContainer}>
                {lines.map(({ id, name, dataReport, options }) => <LineView key={id} name={name} reports={dataReport || []} className={classes.lines} data={options}></LineView>)}
            </Grid>
            {/* <div className={classes.container}>
                <h1 className={classes.header}>W budowie ...</h1>
                <div className={classes.img}>
                    <img src={hammer} alt='in building' />
                </div>
            </div> */}

        </section>
    );
};


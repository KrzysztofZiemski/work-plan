import React, { useState, useContext, useEffect, useMemo, useRef } from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';

import ChangeReportForm from './ChangeReportForm';
import Loader from '../../components/Loader';
import DialogMessage from '../../components/DialogMessage';
import ProductionReportService from '../../services/ProductionReportService';

import { UserContext } from '../../Contexts';
import { getCorrectlyFormatData } from '../../helpers/dateHelper';
import HeaderPage from '../../components/HeaderPage';
import { Grid } from '@material-ui/core';

const styles = makeStyles({
    cardHeader: {
        textAlign: 'center'
    },
    card: {
        margin: '0 auto',
        width: '99%'
    }
})

export const ProductionReportDetailsPage = ({ match, className }) => {
    //TODO - czyści formularz po update, a musi aktualizować poprawnymi wartościami
    const isMounted = useRef()
    const { params } = match;
    const [messages, setMessages] = useState([])
    const [openMessage, setOpenMessage] = useState(false);
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [report, setReport] = useState(null);
    const { loggedUser } = useContext(UserContext);

    const classes = styles();

    useEffect(() => {
        isMounted.current = true
        setIsSubmiting(true);
        ProductionReportService.get(params.idReport)
            .then(res => {
                if (!isMounted.current) return;
                setIsSubmiting(false);
                setReport(res);
            })
            .catch(status => {
                if (!isMounted.current) return;
                setIsSubmiting(false);
                handleOpenMessage(['Wystąpił błąd z połączeniem', `status ${status}`]);
            });

        return () => {
            isMounted.current = false;
        }
    }, [params.idReport])

    const dataReport = useMemo(() => {
        if (report) return {
            firstWorkplaceIdEmployee: report.firstWorkplace,
            secondWorkplaceIdEmployee: report.secondWorkplace,
            thirdWorkplaceIdEmployee: report.thirdWorkplace,
            description: report.description,
            productId: report.product.id,
            productionEnd: report.productionEnd,
            productionStart: report.productionStart,
            series: report.series,
            totalQuantityProduced: report.totalQuantityProduced,
            lineId: report.lineId,
            speedMachinePerMinute: report.speedMachinePerCycle,
            productionHours: Math.floor(report.productionTimeToHour),
            productionMinutes: Math.floor(60 * (report.productionTimeToHour - Math.floor(report.productionTimeToHour))),
            percentagePerformance: report.percentagePerformance,
            performancePerHour: report.performancePerHour,
        }
    }, [report])

    const handleCloseMessage = () => {
        setOpenMessage(false);
        setMessages([]);
    };

    const handleOpenMessage = (messageArr) => {
        setOpenMessage(true);
        setMessages(messageArr)
    };

    const handleSubmit = (data) => {
        setIsSubmiting(true);

        data.productionStart = getCorrectlyFormatData(data.productionStart);
        data.productionEnd = getCorrectlyFormatData(data.productionEnd);
        data.speedMachinePerCycle = data.speedMachinePerMinute;
        data.productionTimeToHour = data.productionHours + data.productionMinutes / 60
        delete data.speedMachinePerMinute;
        // powinno   jeszcze iść
        // "percentagePerformance": 0,
        //     "performancePerHour": 0,
        return ProductionReportService.update(params.idReport, data)
            .then(data => {
                setIsSubmiting(false);
                handleOpenMessage(['Zmodyfikowano raport']);
            })
            .catch(err => {
                setIsSubmiting(false);
                handleOpenMessage(['Nie udało się zapisać raportu', 'wystąpił błąd łączności', `status ${err}`]);
            })
    };

    return (
        <Grid component='section' className={className}>
            <Grid item>
                <HeaderPage title='Zmiana dodanego raportu'></HeaderPage>
            </Grid>
            <DialogMessage open={openMessage} close={handleCloseMessage} messages={messages} />
            <Loader open={isSubmiting} />
            {
                report && <Card className={classes.card}>
                    <CardHeader
                        component='h2'
                        title={`Raport z okresu ${report.productionStart ? `${getCorrectlyFormatData(report.productionStart)} - ${getCorrectlyFormatData(report.productionEnd)}` : ''}`}
                        className={classes.cardHeader}
                    />
                    <ChangeReportForm
                        setMessage={handleOpenMessage}
                        isSubmiting={isSubmiting}
                        onSubmit={handleSubmit}
                        initValue={dataReport}
                    />
                </Card>
            }
        </Grid>
    )
};





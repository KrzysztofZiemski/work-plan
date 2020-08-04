import React, { useEffect, useState } from 'react';
import DialogMessage from '../../components/DialogMessage';
import Grid from '@material-ui/core/Grid';
import HeaderDetails from '../../components/HeaderDetails';
import HeaderDetailsCircles from '../../components/HeaderDetailsCircles';
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getEmployee } from '../../services/employeesService'
import EmployeeTable from './EmployeeTable';
const styles = makeStyles(({
    header: {
        display: 'flex',
        flexWrap: 'nowrap'
    }
}))


export const EmployeeDetails = ({ match, className }) => {

    const { params } = match;
    const classes = styles();
    let [message, setMessage] = useState({ isOpen: false, text: [] });
    let [employee, setEmployee] = useState('');
    console.log('employee', employee)
    useEffect(() => {
        getEmployee(params.idEmployee)
            .then(data => setEmployee(data))
            .catch(status => {
                if (status === 404) {
                    setMessage({ isOpen: true, text: ['Sprawdź poprawność linku', 'Błąd przy próbie pobrania informacji'] })
                }
                setMessage({ isOpen: true, text: ['Wystąpił błąd łączności', `Błąd ${status}`, 'spróbuj ponownie'] })
            })

    }, [params.idEmployee]);



    const content = [
        {
            name: 'Imię',
            value: employee.name,
            type: 'h1'
        },
        {
            name: 'Nazwisko',
            value: employee.lastName,
            type: 'p'
        },
        {
            name: 'informacje',
            value: employee.information,
            type: 'p'
        },
    ]


    const handleCloseMessage = () => setMessage({ isOpen: false, text: [] })
    return (
        <Grid container>
            <DialogMessage open={message.isOpen} close={handleCloseMessage} messages={message.text} />
            <Card container component={Grid} className={classes.header}>
                <HeaderDetails content={content} />
                <HeaderDetailsCircles title='Produkcja' id={params.idEmployee} type='EMPLOYEE' setMessage={setMessage} />
            </Card>
            <EmployeeTable id={params.idEmployee} type='EMPLOYEE' />
        </Grid>
    );
};


import React, { useEffect, useState } from 'react';

import Grid from '@material-ui/core/Grid';
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { getEmployee, deleteEmployee, updateEmployee } from '../../services/employeesService'

import EmployeeTable from './EmployeeTable';
import HeaderDetails from '../../components/HeaderDetails';
import HeaderDetailsCircles from '../../components/HeaderDetailsCircles';
import DialogMessage from '../../components/DialogMessage';
import { Redirect } from 'react-router-dom';
import routes from '../../utils/routes';
import { HeaderPage } from '../../components/HeaderPage/HeaderPage';

const styles = makeStyles(({
    header: {
        display: 'flex',
        flexWrap: 'nowrap'
    },
    right: {
        flexGrow: 1
    }
}));

export const EmployeeDetailsPage = ({ match, className }) => {

    const { params } = match;
    const classes = styles();
    let [message, setMessage] = useState({ isOpen: false, text: [] });
    let [employee, setEmployee] = useState('');
    let [isSubmiting, setIsSubmiting] = useState(false);
    const [isExistingProduct, setIsExistingProduct] = useState(true);
    useEffect(() => {
        setIsSubmiting(true);
        getEmployee(params.idEmployee)
            .then(data => {
                setIsSubmiting(false);
                setEmployee(data);
            })
            .catch(err => {
                setIsSubmiting(false);
                if (err.response.status === 404) {
                    setMessage({ isOpen: true, text: ['Sprawdź poprawność linku', 'Błąd przy próbie pobrania informacji'] });
                    setTimeout(() => setIsExistingProduct(false), 2000);
                }
                setMessage({ isOpen: true, text: ['Wystąpił błąd łączności', `Błąd ${err.response.status}`, 'spróbuj ponownie'] })
            });

    }, [params.idEmployee]);

    const handleRemove = async (idArr) => {
        setIsSubmiting(true);
        try {
            deleteEmployee(employee.id);
            setIsSubmiting(false);
            setMessage({
                isOpen: true, text: [
                    'Usunięto pracownika',
                ]
            });
            setTimeout(() => setIsExistingProduct(false), 2000);
        } catch (err) {
            setIsSubmiting(false);
            setMessage({
                isOpen: true, text: [
                    'Wystąpił błąd podczas usuwania pracowników'
                ]
            });
        }

    }

    const handleUpdate = async (data) => {
        setIsSubmiting(true);
        try {
            const response = await updateEmployee(params.idEmployee, data);
            setEmployee(response);
            setIsSubmiting(false);
            setMessage({
                isOpen: true, text: [
                    'Zaktualizowano'
                ]
            });
        } catch (err) {
            setIsSubmiting(false);
            setMessage({
                isOpen: true, text: [
                    'Wystąpił błąd aktualizacji',
                    `status ${err.response.status}`
                ]
            });
        };
    };

    const content = [
        {
            label: 'Imię',
            value: employee.name || '',
            name: 'name',
            edit: true,
            pattern: '.{3,20}',
            errorMessage: 'Imię musi zawierać od 3 do 20 znaków',
        },
        {
            label: 'Nazwisko',
            value: employee.lastName || '',
            name: 'lastName',
            edit: true,
            pattern: '.{3,20}',
            errorMessage: 'Nazwisko musi zawierać od 3 do 20 znaków',
        },
        {
            label: 'informacje',
            value: employee.information || '',
            name: 'information',
            edit: true,
        },
    ];


    const handleCloseMessage = () => setMessage({ isOpen: false, text: [] });

    return (
        isExistingProduct ?
            <Grid container>
                <DialogMessage open={message.isOpen} close={handleCloseMessage} messages={message.text} />
                <Card container component={Grid} className={classes.header}>
                    <HeaderDetails content={content} isSubmiting={isSubmiting} onRemove={handleRemove} onChange={handleUpdate} />
                    <Grid className={classes.right}>
                        <HeaderPage title={`${employee.name + employee.lastName || ''}`} />
                        <HeaderDetailsCircles title='Produkcja' id={params.idEmployee} type='EMPLOYEE' setMessage={setMessage} />
                    </Grid>
                </Card>
                <EmployeeTable id={params.idEmployee} type='EMPLOYEE' />
            </Grid> :
            < Redirect to={routes.employeeManagement} />
    );
};


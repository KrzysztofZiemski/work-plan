import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import TableEmployees from './TableEmployees';
import Loader from '../../components/Loader';
import DialogMessage from '../../components/DialogMessage';
import { getAllEmployee, deleteEmployee } from '../../services/employeesRequest';

const useStyles = makeStyles(theme => ({
    header: {
        backgroundColor: '#222d32',
        color: '#fff',
        padding: 10
    },
}))
export const EmployeeManagement = () => {
    const classes = useStyles();
    let [employees, setEmployees] = useState([]);
    let [isLoaded, setIsLoaded] = useState(true);
    let [alert, setAlert] = useState(false);
    let [alertMessage, setAlertMessage] = useState(null)


    const getEmployees = () => {
        getAllEmployee()
            .then(employeesList => {
                setIsLoaded(false);
                setEmployees(employeesList);
            }
            ).then(err => {
                setIsLoaded(false);
            });
    }

    useEffect(() => {
        getEmployees();
        return () => {
            setEmployees([]);
            setAlert(false);
        };
    }, []);

    const closeAlert = () => {
        setAlert(false);
        setAlertMessage(null);
    }
    //do zmiany pobieranie wszystkich pracownikow od nowa
    const removeEmployees = (idArr) => {
        setIsLoaded(true);
        const promiesList = idArr.map(employee => deleteEmployee(employee.id))
        Promise.all(promiesList)
            .then(results => {
                const messages = ['Usunięto pracowników'];
                results.forEach(empoyee => messages.push(`${empoyee.name} ${empoyee.lastName}`));
                setIsLoaded(false);
                setAlertMessage(messages);
                setAlert(true);
                getEmployees();
            }
            )
            .catch(err => {
                const messages = [
                    'Wystąpił błąd podczas usuwania pracowników'
                ]
                setIsLoaded(false);
                setAlertMessage(messages);
                setAlert(true);
                getEmployees();
            });
    }

    return (
        <Grid container component='section' direction='column'>
            <DialogMessage open={alert} close={closeAlert} messages={alertMessage} />
            <Grid item>
                <Typography component='h2' align='center' variant='button' className={classes.header}>
                    Pracownicy
                </Typography>
            </Grid>
            <Grid item>
                <TableEmployees list={employees} remove={removeEmployees}></TableEmployees>
            </Grid>
            <Loader open={isLoaded} />
        </Grid>
    )
}


import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import TableEmployees from './TableEmployees';
import { getAllEmployee } from '../../services/workersRequest';

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
    let [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {

        getAllEmployee()
            .then(employeesList => {
                setIsLoaded(false);
                setEmployees(employeesList);
            }
            ).then(err => {
                setIsLoaded(false);
            });
        return setEmployees([]);
    }, []);

    return (
        <Grid container component='section' direction='column'>
            <Grid item>
                <Typography component='h2' align='center' variant='button' className={classes.header}>
                    Pracownicy
                </Typography>
            </Grid>
            <Grid item>
                <TableEmployees list={employees} setList={setEmployees}></TableEmployees>
            </Grid>
        </Grid>
    )
}


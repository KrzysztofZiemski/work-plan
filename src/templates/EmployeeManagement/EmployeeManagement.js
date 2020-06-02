import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Sorter from '../../components/Sorter';
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
    const sort = () => {
        console.log('sort')
    }
    const search = () => {
        console.log('search')
    }
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
    }, [])
    return (
        <section>
            <Sorter list={employees} onSort={sort} sortBy={['lastName', 'name']} onSearch={search}></Sorter>
            <Grid item>
                <Typography component='h2' align='center' variant='button' className={classes.header}>
                    Pracownicy
                </Typography>
            </Grid>
        </section>
    )
}


import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import TableEmployees from './TableEmployees/TableEmployees';
import Loader from '../../components/Loader';
import DialogMessage from '../../components/DialogMessage';
import AddFormDialog from './AddFormDialog';
import { getAllEmployee, deleteEmployee, employeeStatus, addWEmployee } from '../../services/employeesRequest';


const useStyles = makeStyles(theme => ({
    header: {
        backgroundColor: '#222d32',
        color: '#fff',
        padding: 10
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 180,
    },
}));

export const EmployeeManagement = () => {
    const classes = useStyles();
    let [employees, setEmployees] = useState([]);
    let [filterEmployees, setFiletrEmployees] = useState(employeeStatus.active)
    let [isLoaded, setIsLoaded] = useState(true);
    let [alert, setAlert] = useState(false);
    let [alertMessage, setAlertMessage] = useState(null)
    //TO DELETE AFTER IMPLEMENT LOGIC ADD/DELETE EMPLOYEE
    console.log(employees)
    const getEmployees = () => {
        getAllEmployee(filterEmployees)
            .then(employeesList => {
                setEmployees(employeesList)
                setIsLoaded(false);
                //zapisanie odpowiednich wartości, nie kasując innych
            }).then(err => {
                setIsLoaded(false);
            });
    }

    useEffect(() => {
        getAllEmployee(filterEmployees)
            .then(employeesList => {
                setEmployees(employeesList)
                setIsLoaded(false);
            }).then(err => {
                setIsLoaded(false);
            });
        return () => {
            setAlert(false);
        };
    }, [filterEmployees]);

    const handleFiltrEmployees = (e) => {
        setFiletrEmployees(e.target.value);
    }
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
                ];
                setIsLoaded(false);
                setAlertMessage(messages);
                setAlert(true);
                getEmployees();
            });
    }
    //todo 
    //reużywalność addformdialog
    //zrobic optymalizacje pobierania pracownikow - nie nadpisywac co chwila nowym requestem
    //reuzywalnosc management?
    //reużywalność table
    //zablokować usunięcie nieaktywnego
    const handleAddWEmployee = (data) => {
        setIsLoaded(true);
        addWEmployee(data).then(data => {
            setIsLoaded(false);
            setAlertMessage(['Dodano pracownika']);
            setAlert(true)
            getEmployees();
        })
    }
    return (
        <Grid container component='section' direction='column'>
            <DialogMessage open={alert} close={closeAlert} messages={alertMessage} />
            <Grid item>
                <Typography component='h2' align='center' variant='button' className={classes.header}>
                    Pracownicy
                </Typography>
            </Grid>
            <Grid container>
                <Grid item>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="activeLabel">Pokaż</InputLabel>
                        <Select
                            labelId="employee-management-select-label"
                            id="employee-management-select"
                            value={filterEmployees}
                            onChange={handleFiltrEmployees}
                        >
                            <MenuItem value={employeeStatus.active}>tylko aktywni</MenuItem>
                            <MenuItem value={employeeStatus.inActive}>tylko nieaktywni</MenuItem>
                            <MenuItem value={employeeStatus.all}>wszyscy</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <AddFormDialog onSubmit={handleAddWEmployee} />
                </Grid>
            </Grid>
            <Grid item>
                <TableEmployees list={employees} remove={removeEmployees}></TableEmployees>
            </Grid>
            <Loader open={isLoaded} />
        </Grid>
    )
}


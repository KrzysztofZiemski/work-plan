import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TableEmployees from './TableEmployees/TableEmployees';
import Loader from '../../components/Loader';
import DialogMessage from '../../components/DialogMessage';
import { getEmployeesByActive, deleteEmployee, addWEmployee } from '../../services/employeesRequest';
import PanelEmployeesList from './PanelEmployeesList';
import AddFormDialog from '../../components/AddFormDialog';

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
const options = {
    active: {
        value: 'active',
        name: 'aktywni'
    },
    inActive: {
        value: 'inActive',
        name: 'nieaktywni'
    },
    all: {
        value: 'all',
        name: 'wszyscy'
    }
}
const fieldsAddEmployee = [
    {
        name: 'name',
        type: 'text',
        label: 'imie',
        pattern: '.{3,20}',
        errorMessage: 'Imię musi zawierać od 3 do 10 znaków'
    },
    {
        name: 'lastName',
        label: 'nazwisko',
        type: 'text',
        pattern: '.{3,20}',
        errorMessage: 'Nazwisko musi zawierać od 3 do 10 znaków'
    },
    {
        name: 'desc',
        label: 'opis',
        type: 'text',
        errorMessage: ''
    },
];

export const EmployeeManagement = () => {
    const classes = useStyles();

    let [employees, setEmployees] = useState({
        active: {
            list: [],
            fetched: false
        },
        inActive: {
            list: [],
            fetched: false
        },
    });

    let [filterEmployees, setFiletrEmployees] = useState(options.active.value);
    let [isLoaded, setIsLoaded] = useState(false);
    let [alert, setAlert] = useState(false);
    let [alertMessage, setAlertMessage] = useState([]);

    useEffect(() => {
        if (employees.active.fetched && employees.inActive.fetched) return;
        if (filterEmployees === options.all.value) {
            const PromisesEmployees = [];
            employees.active.fetched ? PromisesEmployees.push(Promise.resolve(false)) : PromisesEmployees.push(getEmployeesByActive());
            employees.inActive.fetched ? PromisesEmployees.push(Promise.resolve(false)) : PromisesEmployees.push(getEmployeesByActive(false));
            setIsLoaded(true);
            Promise.all(PromisesEmployees).then(responseList => {
                setIsLoaded(false);
                setEmployees(prevState => {
                    const active = responseList[0] ? {
                        active: {
                            list: responseList[0],
                            fetched: true
                        },
                    } : { ...prevState.active };
                    const inActive = responseList[1] ? {
                        inActive: {
                            list: responseList[1],
                            fetched: true
                        },
                    } : { ...prevState.inActive };
                    return {
                        ...prevState,
                        ...active,
                        ...inActive
                    }
                });
            }).catch(err => {
                setAlertMessage(['wystapił błąd podczas pobierania pracowników']);
                setAlert(true);
                setIsLoaded(false);
            })
        } else {
            if (!employees.hasOwnProperty(filterEmployees) || employees[filterEmployees].fetched) return;
            setIsLoaded(true);
            const isGetActive = filterEmployees === options.active.value ? true : false;
            getEmployeesByActive(isGetActive).then(data => {
                setIsLoaded(false);
                setEmployees(prevState => ({
                    ...prevState,
                    [filterEmployees]: {
                        list: data,
                        fetched: true
                    }
                }))
            }).catch(err => {
                setAlertMessage(['wystapił błąd podczas pobierania pracowników']);
                setAlert(true);
                setIsLoaded(false);
            })
        }
        return () => {
            setIsLoaded(false);
        };
    }, [filterEmployees, employees]);

    const updateEmployees = () => {
        if (employees.active.fetched) {
            getEmployeesByActive().then(data => {
                setIsLoaded(false);
                setEmployees(prevState => ({
                    ...prevState,
                    active: {
                        list: data,
                        fetched: true
                    }
                }))
            }).catch(err => {
                setAlertMessage(['wystapił błąd podczas pobierania pracowników']);
                setAlert(true);
                setIsLoaded(false);
            })
        } else if (employees.active.fetched) {
            getEmployeesByActive(false).then(data => {
                setIsLoaded(false);
                setEmployees(prevState => ({
                    ...prevState,
                    inActive: {
                        list: data,
                        fetched: true
                    }
                }))
            }).catch(err => {
                setAlertMessage(['wystapił błąd podczas pobierania pracowników']);
                setAlert(true);
                setIsLoaded(false);
            })
        }
    }

    const closeAlert = () => {
        setAlert(false);
        setAlertMessage(null);
    }

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
                updateEmployees();
            })
            .catch(err => {
                const messages = [
                    'Wystąpił błąd podczas usuwania pracowników'
                ];
                setIsLoaded(false);
                setAlertMessage(messages);
                setAlert(true);
            });
    }

    const handleAddWEmployee = (data) => {
        setIsLoaded(true);
        const dataLowerCase = { ...data, name: data.name.toLowerCase(), lastName: data.lastName.toLowerCase() };
        addWEmployee(dataLowerCase).then(data => {
            setIsLoaded(false);
            updateEmployees();
            setAlertMessage(['Dodano pracownika', `${dataLowerCase.name} ${dataLowerCase.lastName}`]);
            setAlert(true);
        })
    };

    const renderList = () => {
        if (filterEmployees === options.all.value) {
            return [...employees.active.list, ...employees.inActive.list]
        }
        return employees[filterEmployees].list;
    }
    return (
        <>
            <Grid container component='section' direction='column'>
                <DialogMessage open={alert} close={closeAlert} messages={alertMessage} />
                <Grid item>
                    <Typography component='h2' align='center' variant='button' className={classes.header}>
                        Pracownicy
                </Typography>
                </Grid>
                <Grid container>
                    <Grid item>
                        <PanelEmployeesList setFilter={setFiletrEmployees} value={filterEmployees} options={options} />
                    </Grid>
                    <Grid item>
                        <AddFormDialog onSubmit={handleAddWEmployee} fields={fieldsAddEmployee} button='Dodaj pracownika' />
                    </Grid>
                </Grid>
                <Grid item>
                    <TableEmployees list={renderList()} remove={removeEmployees}></TableEmployees>
                </Grid>
                <Loader open={isLoaded} />
            </Grid>
        </>
    );
};


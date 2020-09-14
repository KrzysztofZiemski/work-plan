import React, { useEffect, useState, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TableEmployees from './TableEmployees/TableEmployees';
import Loader from '../../components/Loader';
import DialogMessage from '../../components/DialogMessage';
import { getEmployeesByActive, deleteEmployee, addWEmployee } from '../../services/employeesService';
import PanelEmployeesList from './PanelEmployeesList';
import AddFormDialog from '../../components/AddFormDialog';
import { EmployeesContext } from '../../Contexts';
import useActiveEmployees from '../../hooks/useActiveEmployees';
import useInActiveEmployees from '../../hooks/useInActiveEmployees';

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
        errorMessage: 'Imię musi zawierać od 3 do 20 znaków'
    },
    {
        name: 'lastName',
        label: 'nazwisko',
        type: 'text',
        pattern: '.{3,20}',
        errorMessage: 'Nazwisko musi zawierać od 3 do 20 znaków'
    },
    {
        name: 'desc',
        label: 'opis',
        type: 'text',
        errorMessage: ''
    },
];

export const EmployeeManagementPage = ({ className }) => {
    const classes = useStyles();

    const { employeesList, setEmployeesList, inActiveEmployeesList, setInActiveEmployeesList } = useContext(EmployeesContext);
    const [employeesActive, getEmployeesActive] = useActiveEmployees();
    const [employeesInActive, getEmployeesInActive] = useInActiveEmployees();

    let [filterEmployees, setFiletrEmployees] = useState(options.active.value);
    let [isLoaded, setIsLoaded] = useState(false);
    let [alert, setAlert] = useState(false);
    let [alertMessage, setAlertMessage] = useState([]);

    useEffect(() => {
        try {
            if (filterEmployees !== options.inActive.value) {
                if (!employeesActive.fetched) {
                    getEmployeesActive();
                };

            } else if (filterEmployees !== options.active.value) {
                if (!employeesInActive.fetched) {
                    getEmployeesInActive();
                }

            } else {
                const employeesListRequest = getEmployeesByActive();
                const inActiveEmployeesListRequest = getEmployeesByActive(false);
                Promise.all([employeesListRequest, inActiveEmployeesListRequest])
                    .then(reqArr => {
                        setEmployeesList(reqArr[0]);
                        setInActiveEmployeesList(reqArr[1])
                    })
            }
        } catch (err) {
            const message = [`Błąd połączenia ${err.status}`, 'spróbuj ponownie'];
            setAlertMessage(message);
            setAlert(true);

        }
        return () => {
            setIsLoaded(false);
        };
    }, [employeesList, setEmployeesList, inActiveEmployeesList, setInActiveEmployeesList, filterEmployees, employeesActive.fetched, getEmployeesActive, employeesInActive.fetched, getEmployeesInActive]);

    const refreshEmployees = () => {
        try {
            if (filterEmployees !== options.inActive.value) getEmployeesActive();
            if (filterEmployees !== options.active.value) getEmployeesInActive();

        } catch (err) {
            setAlertMessage([`wystapił błąd podczas pobierania pracowników ${err.status}`]);
            setAlert(true);
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
                refreshEmployees();
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
            refreshEmployees();
            setAlertMessage(['Dodano pracownika', `${dataLowerCase.name} ${dataLowerCase.lastName}`]);
            setAlert(true);
        })
    };

    const renderList = () => {
        if (filterEmployees === options.all.value) {
            return [...employeesActive.list, ...employeesInActive.list]
        }
        return filterEmployees === options.active.value ? employeesActive.list : employeesInActive.list;
    }
    return (
        <>
            <Grid container component='section' direction='column' className={className}>
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
                        <AddFormDialog onSubmit={handleAddWEmployee} fields={fieldsAddEmployee} button='Dodaj pracownika' title='dodaj pracownika' />
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


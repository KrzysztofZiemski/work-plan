import React, { useEffect, useContext, useState } from 'react';
import { UsersContext, RoleContext } from '../../App';
import DialogMessage from '../../components/DialogMessage';
import Loader from '../../components/Loader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TableUsers from './TableUsers';
import AddFormDialog from '../../components/AddFormDialog';
import { UserService } from '../../services/UserService';
import RoleService from '../../services/RoleService';


const useStyles = makeStyles(theme => ({
    header: {
        backgroundColor: '#222d32',
        color: '#fff',
        padding: 10
    },
    formControl: {
        minWidth: 180,
    },
}));
const renderFields = (roleList) => ([
    {
        name: 'name',
        type: 'text',
        label: 'imię',
        pattern: '.{3,30}',
        errorMessage: 'Imie musi zawierać od 1 do 30 znaków'
    },
    {
        name: 'surname',
        type: 'text',
        label: 'nazwisko',
        pattern: '.{3,30}',
        errorMessage: 'Nazwisko linii musi zawierać od 1 do 30 znaków'
    },
    {
        name: 'login',
        type: 'text',
        label: 'login',
        pattern: '.{3,30}',
        errorMessage: 'Login linii musi zawierać od 1 do 30 znaków'
    },
    {
        name: 'email',
        type: 'email',
        label: 'e-mail',
        pattern: '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}',
        errorMessage: 'muszi podać poprawny e-mail'
    },
    {
        name: 'password',
        type: 'password',
        label: 'hasło',
        pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
        errorMessage: 'Hasło musi się składać z przynajmniej 8 znaków - minimum 1 duża i mała litera, 1 cyfra oraz 1 znak specjalny'
    },
    {
        name: 'confirmPassword',
        type: 'password',
        label: 'powtórz hasło',
        errorMessage: 'Podane hasła nie są jednakowe',
        same: 'password'
    },
    {
        name: 'role',
        label: 'rola',
        type: 'select',
        pattern: '^([1-5])$',
        errorMessage: 'musisz wybrać rolę',
        options: roleList.map(role => ({
            value: role.id,
            label: role.description
        }))
    },
])
export const UserManagement = () => {
    const classes = useStyles();
    const { roleList, setRoleList } = useContext(RoleContext);
    const { usersList, setUsersList } = useContext(UsersContext);
    let [openMessage, setOpenMessage] = useState(false);
    let [message, setMessage] = useState([]);
    let [fetching, setFetching] = useState(false);
    const fields = renderFields(roleList)
    useEffect(() => {
        if (usersList.length < 1) {
            UserService.getAll().then(data => {
                if (data.length > 0) setUsersList(data);
            })
                .catch(err => {
                    setMessage(['Nie udało się połączyc z serwerem', `status ${err}`])
                    setOpenMessage(true);
                })
        }
        if (usersList.length < 1) {
            RoleService.getAll().then(data => {
                if (data.length > 0) setRoleList(data);
            })
                .catch(err => {
                    setMessage(['Nie udało się połączyc z serwerem', `status ${err}`])
                    setOpenMessage(true);
                })
        }
    }, [setRoleList, setUsersList, usersList])
    const refresh = () => {
        UserService.getAll().then(data => setUsersList(data))
            .catch(err => {
                setMessage(['Nie udało się połączyc z serwerem', `status ${err}`])
                setOpenMessage(true);
            })
    }

    const handleRemove = (lines) => {
        setFetching(true);
        const deletedLinesMessage = [];
        const errors = [];
        const requests = lines.map(line => {
            return UserService.remove(line.id)
                .then(resData => deletedLinesMessage.push(`nazwa: ${resData.name}, numer: ${resData.numberLine}`))
                .catch(status => errors.push(status));
        })
        Promise.all(requests)
            .then(() => {
                setFetching(false);
                setMessage(['Wystąpił błąd podczas usuwania elementów', 'usunięci użytkownicy:', ...deletedLinesMessage]);
                setOpenMessage(true);
                refresh();
            }).catch(err => {
                setFetching(false);
                setMessage(['Wystąpił błąd podczas usuwania elementów', 'usunięci użytkownicy:', ...deletedLinesMessage, 'status błędów:', ...errors])
                setOpenMessage(true);
                refresh();
            })
    }
    const handleAdd = (data) => {
        const { confirmPassword, ...dataToSend } = data
        setFetching(true);
        UserService.add(dataToSend).then(resData => {
            setFetching(false);
            setMessage(['Dodano użytkownika', `${resData.name} ${resData.surname}`]);
            setOpenMessage(true);
            refresh();
        })
            .catch(status => {
                setFetching(false);
                const message = status === 409 ? 'istnieje już taki użytkownik' : 'nie udało się dodać użytkownika';
                setMessage([message, `błąd ${status}`]);
                setOpenMessage(true);
                refresh();
            })
    }
    const handleCloseMessage = () => {
        setOpenMessage(false);
    }
    return (
        <Grid container component='section' direction='column'>
            <DialogMessage open={openMessage} close={handleCloseMessage} messages={message} />
            <Grid item>
                <Typography component='h2' align='center' variant='button' className={classes.header}>
                    Użytkownicy
                </Typography>
            </Grid>
            <Grid container>
                <Grid item>
                    <AddFormDialog onSubmit={handleAdd} fields={fields} button='Dodaj użytkownika' title='dodaj użytkownika' />
                </Grid>
            </Grid>
            <Grid item>
                <TableUsers list={usersList} remove={handleRemove} roles={roleList} />
            </Grid>
            <Loader open={fetching} />
        </Grid>
    )
}
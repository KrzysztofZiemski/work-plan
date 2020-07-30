import React, { useContext } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from "react-router-dom";
import Alert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import ButtonLoader from '../../components/ButtonLoader';
import { UserContext } from '../../App';
import { AuthService } from '../../services/AuthService';

import routes from '../../utils/routes';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        minHeight: 40
    },
}));

export const LoginPage = ({ className }) => {
    const classes = useStyles();
    const { loggedUser, setLoggedUser } = useContext(UserContext);
    const usernameMsg = 'Musisz uzupełnić pole login';
    const passwordMsg = 'Musisz podać hasło';

    if (loggedUser) return <Redirect to={routes.root} />

    return (
        <section className={className}>
            <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}
                onSubmit={async ({ username, password }, { setStatus, setSubmitting }) => {

                    try {
                        await AuthService.authentication(username, password);
                        const loggedUser = await AuthService.getAuthUser();
                        setLoggedUser(loggedUser)
                        setSubmitting(false);
                        setStatus(false);
                    }
                    catch (err) {
                        console.log('rrr', err)
                        setSubmitting(false);
                        if (loggedUser !== false) setLoggedUser(false)
                        const status = err.response.status;

                        const msg = status === 401 ? 'Niepoprawny login lub hasło' : 'Spróbuj ponownie. Jeżeli problem będzie nadal wystepować, skontaktuj się z administratorem';
                        setStatus(msg);
                    };
                }}
                onChange={({ username, password }, { setStatus, setSubmitting }) => {
                    // console.log(username, password)
                }}
                validate={(values) => {
                    let errors = {};
                    if (values.username < 3) {
                        errors.username = usernameMsg;
                    }
                    if (!values.password) {
                        errors.password = passwordMsg;
                    }
                    return errors;
                }}
                render={({ errors, status, touched, isSubmitting, values }) => (

                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Logowanie
                            </Typography>
                            <Form className={classes.form} noValidate>
                                <Grid container spacing={2}>

                                    <Grid item xs={12}>
                                        <Field as={TextField}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            label="login"
                                            name="username"
                                            type="text"
                                            value={values.username}
                                            autoFocus
                                        />
                                        <ErrorMessage name="username" component="div" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field as={TextField}
                                            value={values.password}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="password"
                                            label="hasło"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                        />
                                        <ErrorMessage name="password" component="div" />
                                    </Grid>
                                </Grid>
                                <ButtonLoader isSubmitting={isSubmitting} className={classes.submit} value='Zaloguj' />
                            </Form>
                            {status ? <Alert severity="error">{status}</Alert> : null}
                        </div>
                    </Container>
                )}
            />
        </section>

    )
}

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
import Container from '@material-ui/core/Container';
import { UserContext } from '../../App';
import { AuthService } from '../../services/AuthService';
import { Redirect } from "react-router-dom";

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

export const LoginPage = () => {
    const classes = useStyles();
    const { loggedUser, setLoggedUser } = useContext(UserContext);
    const usernameMsg = 'Musisz uzupełnić pole login';
    const passwordMsg = 'Musisz podać hasło';

    if (loggedUser) return <Redirect to='/' />

    return (
        <section>
            <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}
                onSubmit={async ({ username, password }, { setStatus, setSubmitting }) => {
                    // setStatus();
                    try {
                        await AuthService.authentication(username, password);
                        const loggedUser = await AuthService.getAuthUser();
                        setLoggedUser(loggedUser)
                        setSubmitting(false);
                    }
                    catch (err) {
                        setSubmitting(false);
                        if (loggedUser !== false) setLoggedUser(false)
                        if (err.msg) return setStatus(err.msg);
                        setStatus('Spróbuj ponownie. Jeżeli problem będzie nadal wystepować, skontaktuj się z administratorem');
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
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    disabled={isSubmitting}
                                >
                                    {!isSubmitting && 'Zaloguj'}
                                    {isSubmitting &&
                                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" alt='loader' />
                                    }
                                </Button>

                            </Form>
                        </div>
                    </Container>
                )}
            />
        </section>

    )
}

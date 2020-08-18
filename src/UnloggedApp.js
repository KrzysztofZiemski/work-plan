import React, { lazy } from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { default as routes } from './utils/routes';
import WelcomePage from './templates/WelcomePage';
import NavBarTop from './components/NavBarTop';

const LoginPage = lazy(() => import('./templates/LoginPage'));

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
    }
}));

const UnloggedApp = () => {

    const classes = useStyles();

    return (
        <Grid className={classes.root}>
            <NavBarTop />
            <Switch>
                <Route path={routes.root} exact={true}>
                    <WelcomePage />
                </Route>
                <Route path={routes.login} exact={true}>
                    <LoginPage className='page' />
                </Route>
            </Switch>
        </Grid>
    );
};

export default UnloggedApp;
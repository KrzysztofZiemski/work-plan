import React, { useState, createContext, lazy, Suspense } from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import NavBarTop from './components/NavBarTop';
import NavBarLeft from './components/NavBarLeft';
import Loader from './components/Loader';
import { default as routes } from './utils/routes';
import Logout from './components/Logout';

const GraphicPage = lazy(() => import('./templates/EditGraphicPage/GraphicPage'));
const ViewGraphicPage = lazy(() => import('./templates/ViewGraphicPage'));
const DashboardPage = lazy(() => import('./templates/DashboardPage'));
const ProductionReportPage = lazy(() => import('./templates/ProductionReportPage'));
const EmployeeManagement = lazy(() => import('./templates/EmployeeManagement'));
const ReportsList = lazy(() => import('./templates/ProductionReportPage/ReportsList'));
const ProductManagement = lazy(() => import('./templates/ProductManagement'));
const LoginPage = lazy(() => import('./templates/LoginPage'));
const ProductDetails = lazy(() => import('./templates/ProductDetails'));
const LineManagement = lazy(() => import('./templates/LineManagement'));
const UserManagement = lazy(() => import('./templates/UserManagement'));
const LineDetails = lazy(() => import('./templates/LineDetails'));
const EmployeeDetails = lazy(() => import('./templates/EmployeeDetails'));
const RankingPage = lazy(() => import('./templates/RankingPage'));

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1
    },
    root: {
        minHeight: '100vh',
        flexWrap: 'nowrap'
    }
}));

const LoggedApp = ({ loggedUser, setLoggedUser }) => {

    const classes = useStyles();

    return (
        <Grid component='section' container className={classes.root}>
            <Grid item>
                <NavBarLeft />
            </Grid>
            <Grid item className={classes.grow}>
                <NavBarTop className={classes.grow} />
                <Suspense fallback={<Loader open={true} size={200} backdor={false} />}>
                    <Switch>
                        <Route path={routes.root} exact={true}>
                            <DashboardPage className='page' />
                        </Route>
                        <Route path={routes.login} exact={true}>
                            <LoginPage className='page' />
                        </Route>
                        <Route path={routes.logout} exact={true}>
                            <Logout className='page' />
                        </Route>
                        <Route path={routes.workPlanEdit} exact render={(props) => <GraphicPage className='page' {...props} />} />
                        <Route path={routes.workPlan} exact render={(props) => <ViewGraphicPage className='page' {...props} />} />
                        <Route path={routes.employeeManagement} exact render={(props) => <EmployeeManagement className='page' {...props} />} />
                        <Route path={routes.productionReportList} exact render={(props) => <ReportsList className='page' {...props} />} />
                        <Route path={routes.productionReport} exact render={(props) => <ProductionReportPage className='page' {...props} />} />
                        <Route path={routes.productManagement} exact render={(props) => <ProductManagement className='page' {...props} />} />
                        <Route path={routes.lineManagement} exact render={(props) => <LineManagement className='page' {...props} />} />
                        <Route path={routes.userManagement} exact render={(props) => <UserManagement className='page' {...props} />} />
                        <Route path={`${routes.lineDetails}/:idLine`} render={(props) => <LineDetails className='page' {...props} />} />
                        <Route path={`${routes.productDetails}/:idProduct`} render={(props) => <ProductDetails className='page' {...props} />} />
                        <Route path={`${routes.employeeDetails}/:idEmployee`} render={(props) => <EmployeeDetails className='page' {...props} />} />
                        <Route path={`${routes.ranking}`} render={(props) => <RankingPage className='page' {...props} />} />
                    </Switch>
                </Suspense>
            </Grid>
        </Grid>
    )
}

export default LoggedApp;
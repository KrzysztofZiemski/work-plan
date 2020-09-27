import React, { lazy, Suspense } from 'react';
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
const ProductionAddReportPage = lazy(() => import('./templates/ProductionAddReportPage'));
const EmployeeManagementPage = lazy(() => import('./templates/EmployeeManagementPage'));
const ProductionReportListPage = lazy(() => import('./templates/ProductionReportListPage'));
const ProductManagement = lazy(() => import('./templates/ProductManagement'));
const LoginPage = lazy(() => import('./templates/LoginPage'));
const ProductDetailsPage = lazy(() => import('./templates/ProductDetailsPage'));
const LineManagement = lazy(() => import('./templates/LineManagement'));
const UserManagement = lazy(() => import('./templates/UserManagement'));
const LineDetailsPage = lazy(() => import('./templates/LineDetailsPage'));
const EmployeeDetailsPage = lazy(() => import('./templates/EmployeeDetailsPage'));
const RankingPage = lazy(() => import('./templates/RankingPage'));
const ProductionReportDetailsPage = lazy(() => import('./templates/ProductionReportDetailsPage'));

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1
    },
    root: {
        minHeight: '100vh',
        flexWrap: 'nowrap'
    },
    pages: {
        padding: 20
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
                        <Route path={routes.workPlanEdit} exact render={(props) => <GraphicPage className={classes.pages} {...props} />} />
                        <Route path={routes.workPlan} exact render={(props) => <ViewGraphicPage className={classes.pages} {...props} />} />
                        <Route path={routes.employeeManagement} exact render={(props) => <EmployeeManagementPage className={classes.pages} {...props} />} />
                        <Route path={routes.productionReportList} exact render={(props) => <ProductionReportListPage className={classes.pages} {...props} />} />
                        <Route path={routes.productionReport} exact render={(props) => <ProductionAddReportPage className={classes.pages} {...props} />} />
                        <Route path={routes.productManagement} exact render={(props) => <ProductManagement className={classes.pages} {...props} />} />
                        <Route path={routes.lineManagement} exact render={(props) => <LineManagement className={classes.pages} {...props} />} />
                        <Route path={routes.userManagement} exact render={(props) => <UserManagement className={classes.pages} {...props} />} />
                        <Route path={`${routes.lineDetails}/:idLine`} render={(props) => <LineDetailsPage className={classes.pages} {...props} />} />
                        <Route path={`${routes.productDetails}/:idProduct`} render={(props) => <ProductDetailsPage className={classes.pages} {...props} />} />
                        <Route path={`${routes.employeeDetails}/:idEmployee`} render={(props) => <EmployeeDetailsPage className={classes.pages} {...props} />} />
                        <Route path={`${routes.productionReportDetail}/:idReport`} render={(props) => <ProductionReportDetailsPage className={classes.pages} {...props} />} />
                        <Route path={`${routes.ranking}`} render={(props) => <RankingPage className={classes.pages} {...props} />} />
                    </Switch>
                </Suspense>
            </Grid>
        </Grid>
    )
}

export default LoggedApp;
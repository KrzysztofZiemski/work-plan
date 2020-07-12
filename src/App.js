import React, { useState, createContext, useEffect, lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import NavBarTop from './components/NavBarTop';
import NavBarLeft from './components/NavBarLeft';
import Loader from './components/Loader';
import { AuthService } from './services/AuthService';
import { default as routes } from './utils/routes';
const GraphicPage = lazy(() => import('./templates/GraphicPage/GraphicPage'));
const HomePage = lazy(() => import('./templates/HomePage/HomePage'));
const ProductionReportPage = lazy(() => import('./templates/ProductionReportPage'));
const EmployeeManagement = lazy(() => import('./templates/EmployeeManagement'));
const ReportsList = lazy(() => import('./templates/ProductionReportPage/ReportsList'));
const ProductManagement = lazy(() => import('./templates/ProductManagement'));
const LoginPage = lazy(() => import('./templates/LoginPage'));

export const UserContext = createContext({
  loggedUser: null,
  setLoggedUser: null
})
export const EmployeesContext = createContext({
  employeesList: [],
  setEmployeesList: '',
  inActiveEmployeesList: [],
  setInActiveEmployeesList: ''
})
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  },
  root: {
    minHeight: '100vh',
    flexWrap: 'nowrap'
  }
}));


const App = () => {
  let [activeLeftMenu, setActiveLeftMenu] = useState(false);
  //true for test, shuld be null
  let [loggedUser, setLoggedUser] = useState(null);
  let [employeesList, setEmployeesList] = useState([]);
  let [inActiveEmployeesList, setInActiveEmployeesList] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    if (!loggedUser) setActiveLeftMenu(false);
    if (loggedUser === null) {
      AuthService.getAuthUser()
        .then(user => setLoggedUser(user))
        .catch(err => setLoggedUser(false));
    }
  }, [loggedUser]);


  return (
    <Router basename='#'>
      <div className="App" >

        <UserContext.Provider value={{ loggedUser, setLoggedUser, activeLeftMenu, setActiveLeftMenu }}>
          <EmployeesContext.Provider value={{ employeesList, setEmployeesList, inActiveEmployeesList, setInActiveEmployeesList }}>
            <Grid container className={classes.root}>
              <Grid item>
                <NavBarLeft />
              </Grid>
              <Grid item className={classes.grow}>
                <NavBarTop className={classes.grow} />
                <Suspense fallback={<Loader open={true} size={200} backdor={false} />}>
                  <Switch>
                    <Route path={routes.root} exact={true}>
                      <HomePage className='page' />
                    </Route>
                    <Route path={routes.login} exact={true}>
                      <LoginPage className='page' />
                    </Route>
                    {/* todo redirect after tests*/}
                    {
                      !loggedUser ? null : (
                        <>
                          <Route path={routes.workPlan} exact render={(props) => <GraphicPage className='page' {...props} />} />
                          <Route path={routes.employeeManagement} exact render={(props) => <EmployeeManagement className='page' {...props} />} />
                          <Route path={routes.productionReportList} exact render={(props) => <ReportsList className='page' {...props} />} />
                          <Route path={routes.productionReport} exact render={(props) => <ProductionReportPage className='page' {...props} />} />
                          <Route path={routes.productManagement} exact render={(props) => <ProductManagement className='page' {...props} />} />
                        </>
                      )
                    }
                  </Switch>
                </Suspense>
              </Grid>
            </Grid>
          </EmployeesContext.Provider>
        </UserContext.Provider>
      </div >
    </Router >

  );

};

export default App;

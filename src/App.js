import React, { useState, createContext, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GraphicPage from './templates/GraphicPage/GraphicPage';
import HomePage from './templates/HomePage/HomePage';
import LoginPage from './templates/LoginPage';
import ProductionReportPage from './templates/ProductionReportPage';
import EmployeeManagement from './templates/EmployeeManagement';
import ReportsList from './templates/ProductionReportPage/ReportsList';
import ProductManagement from './templates/ProductManagement'
import NavBarTop from './components/NavBarTop';
import NavBarLeft from './components/NavBarLeft';
import { AuthService } from './services/AuthService';
import { default as routes } from './utils/routes';

export const UserContext = createContext({
  loggedUser: null,
  setLoggedUser: null
})
export const EmployeesContext = createContext({
  employeesList: [],
  setEmployeesList: ''
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
          <EmployeesContext.Provider value={{ employeesList, setEmployeesList }}>
            <Grid container className={classes.root}>
              <Grid item>
                <NavBarLeft />
              </Grid>
              <Grid item className={classes.grow}>
                <NavBarTop className={classes.grow} />
                <Switch>
                  <Route path={routes.root} exact={true}>
                    <HomePage className='page' />
                  </Route>
                  <Route path={routes.login} exact={true}>
                    <LoginPage className='page' />
                  </Route>
                  {/* todo redirect after tests*/}
                  {loggedUser ? <Route path={routes.workPlan} exact render={(props) => <GraphicPage className='page' {...props} />} /> : null}
                  {loggedUser ? <Route path={routes.employeeManagement} exact render={(props) => <EmployeeManagement className='page' {...props} />} /> : null}
                  {loggedUser ? <Route path={routes.productionReportList} exact render={(props) => <ReportsList className='page' {...props} />} /> : null}
                  {loggedUser ? <Route path={routes.productionReport} exact render={(props) => <ProductionReportPage className='page' {...props} />} /> : null}
                  {loggedUser ? <Route path={routes.productManagement} exact render={(props) => <ProductManagement className='page' {...props} />} /> : null}
                </Switch>
              </Grid>
            </Grid>
          </EmployeesContext.Provider>
        </UserContext.Provider>
      </div >
    </Router >

  );

};

export default App;

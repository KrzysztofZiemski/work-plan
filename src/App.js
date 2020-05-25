import React, { useState, createContext, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import GraphicPage from './templates/GraphicPage/GraphicPage';
import HomePage from './templates/HomePage/HomePage';
import LoginPage from './templates/LoginPage';
import NavBarTop from './components/NavBarTop';
import NavBarLeft from './components/NavBarLeft';
import { default as routes } from './routes';
import './App.scss';

export const UserContext = createContext({
  loggedUser: null,
  setLoggedUser: null
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

function App() {

  let [activeLeftMenu, setActiveLeftMenu] = useState(true);
  let [loggedUser, setLoggedUser] = useState(null);

  const classes = useStyles();

  const toggleLeftMenu = () => {
    if (activeLeftMenu) return setActiveLeftMenu(false);
    setActiveLeftMenu(true);
  }

  return (

    <Router>
      <div className="App" >
        <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
          <Grid container className={classes.root}>
            <Grid item>
              <NavBarLeft isActive={activeLeftMenu} />
            </Grid>
            <Grid item className={classes.grow}>
              <NavBarTop className={classes.grow} onClick={toggleLeftMenu} />
              <Switch>
                <Route path={routes.root} exact={true}>
                  <HomePage className='page' />
                </Route>
                <Route path={routes.login} exact={true}>
                  <LoginPage className='page' />
                </Route>
                <Route >
                  <Route path={routes.workPlan} render={(props) => <GraphicPage className='page' {...props} />} />
                </Route>
              </Switch>
            </Grid>
          </Grid>
        </UserContext.Provider>
      </div>
    </Router >

  );
}

export default App;

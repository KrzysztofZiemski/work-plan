import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

import GraphicPage from './templates/GraphicPage/GraphicPage';
import HomePage from './templates/HomePage/HomePage';
import NavBarTop from './components/NavBarTop';
import NavBarLeft from './components/NavBarLeft';
import { default as routes } from './routes';
import './App.scss';

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
  const classes = useStyles();

  const toggleLeftMenu = () => {
    if (activeLeftMenu) return setActiveLeftMenu(false);
    setActiveLeftMenu(true);
  }

  return (

    <Router>
      <div className="App" >
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
              <DndProvider backend={Backend}>
                <Route >
                  <Route path={routes.workPlan} render={(props) => <GraphicPage className='page' {...props} />} />
                </Route>
              </DndProvider>
            </Switch>
          </Grid>
        </Grid>
      </div>
    </Router >

  );
}

export default App;

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
import './App.scss';

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1
  },
  hiddenMenu: {
    width: 0,
    transition: '.5s'
  },
  activeMenu: {
    width: '200px',
    transition: '.5s'
  }
}))
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
        <Grid container>
          <Grid item>
            <NavBarLeft isActive={activeLeftMenu} />
          </Grid>
          <Grid item className={classes.container}>
            <NavBarTop className='mainNavbar' onClick={toggleLeftMenu} />

            <Switch>
              <DndProvider backend={Backend}>
                <Route path="/" exact={true}>
                  <HomePage className='page' />
                </Route>
                <Route path="/graphic">
                  <GraphicPage className='page' />
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

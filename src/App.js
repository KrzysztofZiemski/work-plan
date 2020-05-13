import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

import GraphicPage from './templates/GraphicPage/GraphicPage';
import HomePage from './templates/HomePage/HomePage';
import MainNav from './components/MainNav';

import './App.scss';

function App() {

  let [leftMenu, setLeftMenu] = useState(false);

  const toggleLeftMenu = () => {
    if (leftMenu) return setLeftMenu(false);
    setLeftMenu(true);
  }

  return (

    <Router>
      <div className="App" >
        <MainNav className='mainNavbar' onClick={toggleLeftMenu} />
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
      </div>
    </Router >

  );
}

export default App;

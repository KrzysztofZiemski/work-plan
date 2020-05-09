import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

import { Container, Row, Col } from 'react-bootstrap';

import GraphicPage from './templates/GraphicPage/GraphicPage';
import HomePage from './templates/HomePage/HomePage';
import MainNav from './components/MainNav/MainNav';

import './App.scss';

function App() {
  return (

    <Router>
      <div className="App">

        <MainNav className='mainNavbar' />
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

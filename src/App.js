import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import DashboardPage from './templates/DashboardPage/DashboardPage';
import HomePage from './templates/HomePage/HomePage';
import MainNav from './components/MainNav/MainNav';

import './App.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <MainNav />
        <Switch>
          <Route path="/" exact={true}>
            <HomePage className='page' />
          </Route>
          <Route path="/dashboard">
            <DashboardPage className='page' />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

import React, { useState, useContext, useEffect, lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { UserContext } from './Contexts';
import { AuthService } from './services/AuthService';
import Loader from './components/Loader';

import UnloggedApp from './UnloggedApp';
const LoggedApp = lazy(() => import('./LoggedApp'));


const App = () => {

  const { loggedUser, setLoggedUser } = useContext(UserContext);

  useEffect(() => {
    if (loggedUser === null) {
      AuthService.getAuthUser()
        .then(user => setLoggedUser(user))
        .catch(err => setLoggedUser(false));
    }
  }, [loggedUser]);


  return (
    <Router basename='#'>
      <div className="App" >
        <Suspense fallback={<Loader open={true} size={200} backdor={false} />}>
          {
            loggedUser && <LoggedApp loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
          }
          {
            !loggedUser && <UnloggedApp loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
          }
        </Suspense>
      </div >
    </Router >

  );

};

export default App;

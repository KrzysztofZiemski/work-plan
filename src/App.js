import React, { useState, createContext, useEffect, lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { AuthService } from './services/AuthService';
import Loader from './components/Loader';

import UnloggedApp from './UnloggedApp';
const LoggedApp = lazy(() => import('./LoggedApp'));

export const UserContext = createContext({
  loggedUser: null,
  setLoggedUser: null
});
export const RoleContext = createContext({
  roleList: null,
  setRoleList: null
});
export const UsersContext = createContext({
  usersList: null,
  setUsersList: null
});
export const EmployeesContext = createContext({
  employeesList: [],
  setEmployeesList: '',
  inActiveEmployeesList: [],
  setInActiveEmployeesList: ''
});
export const LinesContext = createContext({
  linesList: [],
  setLinesList: '',
});



const App = () => {
  let [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    if (loggedUser === null) {
      AuthService.getAuthUser()
        .then(user => setLoggedUser(user))
        .catch(err => setLoggedUser(false));
    }
  }, [loggedUser]);


  return (
    <Router basename='/hextl/#'>
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

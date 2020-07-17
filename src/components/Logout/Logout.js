import React, { useContext, useEffect } from 'react';
import { AuthService } from '../../services/AuthService';
import { UserContext } from '../../App';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";
import routes from '../../utils/routes';

export const Logout = () => {
    const { setLoggedUser, loggedUser } = useContext(UserContext);
    useEffect(() => {

        if (loggedUser) AuthService.logout()
            .then(res => {
                setLoggedUser(null);
            })
            .catch(err => {
                if (err === 401) setLoggedUser(null);
            })
    }, [loggedUser, setLoggedUser])
    return (
        <span>
            {loggedUser ? null : <Redirect to={routes.root} />}
        </span>
    )
}



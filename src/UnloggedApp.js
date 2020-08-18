import React from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';
import { default as routes } from './utils/routes';
import HomePage from './templates/HomePage';

const UnloggedApp = ({ className }) => {
    return (
        <section className={className}>
            <Route path={routes.root} exact={true}>
                <HomePage className='page' />
            </Route>
        </section>
    );
};

export default UnloggedApp;
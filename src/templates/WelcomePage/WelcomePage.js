import React from 'react';

import { Header } from './Header/Header';
import AboutCrm from './AboutCrm';
import WhyCrm from './WhyCrm';

export const WelcomePage = () => {

    return (
        <section className='welcome-page'>
            <Header />
            <AboutCrm />
            <WhyCrm />
        </section >

    );
}
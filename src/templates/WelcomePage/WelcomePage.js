import React from 'react';

import { Header } from './Header/Header';
import AboutErp from './AboutErp';
import WhyErp from './WhyErp';

export const WelcomePage = () => {

    return (
        <section className='welcome-page'>
            <Header />
            <AboutErp />
            <WhyErp />
        </section >

    );
}
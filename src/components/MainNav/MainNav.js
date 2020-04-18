import React from 'react';
import './MainNav.scss';
import { Link } from 'react-router-dom';

const MainNav = () => {

            return (
                        <nav>
                                    <ul>
                                                <li>
                                                            <Link to="/dashboard">DashboardPage</Link>
                                                            <Link to="/" >home</Link>
                                                </li>
                                    </ul>
                        </nav>
            )
}

export default MainNav;
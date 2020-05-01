import React from 'react';
import './MainNav.scss';
import { Link } from 'react-router-dom';

const MainNav = () => {

            return (
                        <nav className='manNav'>
                                    <ul>
                                                <li>
                                                            <Link to="/" >Home</Link>
                                                </li>
                                                <li>
                                                            <Link to="/graphic">Grafik</Link>
                                                </li>
                                    </ul>
                        </nav>
            )
}

export default MainNav;
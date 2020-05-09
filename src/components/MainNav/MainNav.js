import React from 'react';
import './MainNav.scss';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
const MainNav = ({ className }) => {

    return (
        <>
            <nav className={className}>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/graphic'>Grafik</Link>
                    </li>
                </ul>

            </nav>
        </>
    )
}

export default MainNav;
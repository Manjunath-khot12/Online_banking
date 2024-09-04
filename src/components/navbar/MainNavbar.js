import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Register from '../../pages/Registration';
import Home from '../../pages/Home';
import Login from '../../pages/login';
import ForgotPassword from '../../pages/ForgotPassword';
import '../../pages/Home.css';

const MainNavbar = () => {
    return (
        <>
            <nav className='navbar nav-position '>
                <ul className='nav-links'>
                    <img src='../../images/bank-icon-logo.jpg' alt='logo' id='logo'></img>
                    <li><Link className='link' to="/pages/Home">Home</Link></li>
                    <li><Link  className='link' to="/pages/login">Login</Link></li>
                    <li><Link className='link' to="/pages/Registration">Register</Link></li>
                    <li><Link className='link' to="/pages/ForgotPassword"></Link></li>
                </ul>
            </nav>
            <Outlet />
        </>
    );
};

export default MainNavbar;

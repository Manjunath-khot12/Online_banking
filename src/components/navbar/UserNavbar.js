import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import UserHome from '../../pages/user/UserHome';
import Home from '../../pages/Home';
import CreateAccount from '../../pages/user/CreateAccount';

const UserNavbar = () => {
    return (
        <>
            <nav className='navbar'>
                <ul className='nav-links'>
                    <img src='../../images/bank-icon-logo.jpg' alt='logo' id='logo'></img>
                    <li><Link className='link' to="/pages/user/UserHome">User Home</Link></li>
                    <li><Link  className='link' to="/pages/user/CreateAccount">Create Account</Link></li>
                    <li><Link  className='link' to="/">Bill Payments</Link></li>
                    <li><Link  className='link' to="/">Bank Statement</Link></li>
                    <li><Link  className='link' to="/">Transaction History</Link></li>
                    <li><Link className='link' to="/">Account details</Link></li>
                </ul>
            </nav>
            <Outlet />
        </>
    );
};

export default UserNavbar;
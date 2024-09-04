import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import UserHome from '../../pages/user/UserHome';
import Home from '../../pages/Home';
import CreateAccount from '../../pages/user/CreateAccount';
import AccountDetails from '../../pages/user/AccountDetials';

const UserNavbar = () => {
    return (
        <>
            <nav className='navbar'>
                <ul className='nav-links'>
                    <img src='../../images/bank-icon-logo.jpg' alt='logo' id='logo'></img>
                    <li><Link className='link' to="/pages/user/UserHome"></Link></li>
                    <li><Link  className='link' to="/pages/user/CreateAccount">Create-Acc</Link></li>
                    <li><Link className='link' to="/pages/user/AccountDetials">Acc-details</Link></li>
                    <li><Link  className='link' to="/">Transfer-Amt</Link></li>
                    <li><Link  className='link' to="/">Trans-History</Link></li>
                    <li><Link  className='link' to="/">Pay-Bill</Link></li>
                    <li><Link  className='link' to="/">Bank-Stat</Link></li>    
                </ul>
            </nav>
            <Outlet />
        </>
    );
};

export default UserNavbar;
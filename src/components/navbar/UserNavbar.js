import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import '../../pages/Home.css';
import Transaction from '../../pages/user/Transaction';
import Deposit from '../../pages/user/Deposit';

const UserNavbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <>
            <nav className='navbar'>
                <ul className='nav-links'>
                    <img src='../../images/bank-icon-logo.jpg' alt='logo' id='logo'></img>
                    <li><Link className='link' to="/pages/user/CreateAccount">Create-Acc</Link></li>
                    <li><Link className='link' to="/pages/user/AccountDetials">Acc-details</Link></li>
                    <li className='dropdown'>
                        <button className='dropbtn link' onClick={toggleDropdown}>Transfer-Amt</button>
                        {showDropdown && (
                            <div className='dropdown-content'>
                                <Link className='link' onClick={toggleDropdown} to="/pages/user/Deposit">Deposit</Link>
                                <Link className='link' onClick={toggleDropdown}  to="/pages/user/Withdraw">Withdraw</Link>
                                <Link className='link' onClick={toggleDropdown} to="/pages/user/Transaction">Transfer</Link>
                            </div>
                        )}
                    </li>
                    <li><Link className='link' to="/">Trans-History</Link></li>
                    <li><Link className='link' to="/">Pay-Bill</Link></li>
                    <li><Link className='link' to="/">Bank-Stat</Link></li>    
                </ul>
            </nav>
            <Outlet />
        </>
    );
};

export default UserNavbar;

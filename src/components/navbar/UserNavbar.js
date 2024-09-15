import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import '../../pages/Home.css';
import Transaction from '../../pages/user/Transaction';
import Deposit from '../../pages/user/Deposit';


const UserNavbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDropdownb, setShowDropdownb] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };
    const toggleDropdownb = () => {
        setShowDropdownb(!showDropdownb);
    };

    return (
        <>
            <nav className='navbar nav-position d-flex justify-content-center'>
                <ul className='nav-links'>
                    <img src='../../images/bank-icon-logo.jpg' alt='logo' id='logo'></img>
                    <li><Link className='link' to="/pages/user/CreateAccount">Create-Acc</Link></li>
                    <li><Link className='link' to="/pages/user/AccountDetials">Acc-details</Link></li>
                    <li className='dropdown'>
                        <Link to="/pages/user/Transaction"> <button className='dropbtn link'  onClick={toggleDropdown}>Transfer-Amt</button></Link>
                        {showDropdown && (
                            <div className='dropdown-content'>
                                <Link className='link' onClick={toggleDropdown} to="/pages/user/Deposit">Deposit</Link>
                                <Link className='link' onClick={toggleDropdown}  to="/pages/user/Withdraw">Withdraw</Link>
                                <Link className='link' onClick={toggleDropdown} to="/pages/user/Transaction">Transfer</Link>
                            </div>
                        )}
                    </li>
                
                    <li className='dropdown'>
                    <Link to="/pages/user/ViewBills"><button className='dropbtn link'   onClick={toggleDropdownb}>Pay-Bills</button></Link>
                        {showDropdownb && (
                            <div className='dropdown-content'>
                                <Link className='link' onClick={toggleDropdownb} to="/pages/user/AddBiller">Add Bills</Link>
                                <Link className='link' onClick={toggleDropdownb}  to="/pages/user/ViewBills">view Bills</Link>
                            </div>
                        )}
                    </li>
                    <li><Link className='link' to="/pages/user/TransactionHistory">Trans-History</Link></li>
                    <li><Link className='link' to="/pages/user/BillStatement">Bank-Stat</Link></li> 
                    <li><Link className='link' to="/pages/user/UserProfile">User Profile</Link></li> 
                    <li><Link className='link' to="/pages/user/UpdateUser"></Link></li>     
                    <li><Link className='link' to="/pages/user/PayBill"></Link></li>    
                </ul>
            </nav>
            <Outlet />
        </>
    );
};

export default UserNavbar;

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
                    <li><Link className='link' to="/pages/user/CreateAccount">Account</Link></li>
                    <li><Link className='link' to="/pages/user/PayBill"></Link></li>
                    <li><Link className='link' to="/pages/user/AccountDetials">Details</Link></li>
                    <li><Link className='link' to="/pages/user/AccountInformation"></Link></li>
                    <li className='dropdown'>
                        <Link to="/pages/user/Transaction"> <button className='dropbtn link'  onClick={toggleDropdown}>Transfer</button></Link>
                        {showDropdown && (
                            <div className='dropdown-content'>
                                <Link className='link' onClick={toggleDropdown} to="/pages/user/Deposit">Deposit</Link>
                                <Link className='link' onClick={toggleDropdown}  to="/pages/user/Withdraw">Withdraw</Link>
                                <Link className='link' onClick={toggleDropdown} to="/pages/user/Transaction">Transfer</Link>
                            </div>
                        )}
                    </li>          
                    <li><Link className='link' to="/pages/user/BillView"></Link></li>  
                    <li className='dropdown'>
                    <Link to="/pages/user/AddBiller"><button className='dropbtn link'   onClick={toggleDropdownb}>Bills</button></Link>
                        {showDropdownb && (
                            <div className='dropdown-content'>
                                <Link className='link' onClick={toggleDropdownb} to="/pages/user/AddBiller">Add Bills</Link>
                                <Link className='link' onClick={toggleDropdownb}  to="/pages/user/BillView">view Bills</Link>
                            </div>
                        )}
                    </li>
                    <li><Link className='link' to="/pages/user/BankStatementView"></Link></li>  
                    <li><Link className='link' to="/pages/user/TransactionHistory">History</Link></li>
                    <li><Link className='link' to="/pages/user/TransactionInformation"></Link></li>
                    <li><Link className='link' to="/pages/user/BillStatement">Statement</Link></li> 
                    <li><Link className='link' to="/pages/user/UserProfile">Profile</Link></li> 
                    <li><Link className='link' to="/pages/user/UserInformation"></Link></li> 
                    <li><Link className='link' to="/pages/user/UpdateUser"></Link></li>     
                      
                </ul>
            </nav>
            <Outlet />
        </>
    );
};

export default UserNavbar;

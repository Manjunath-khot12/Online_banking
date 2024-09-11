import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth, AuthProvider } from "./context/AuthContext";
import Home from './pages/Home';
import Login from './pages/login';
import Register from './pages/Registration';
import ForgotPassword from './pages/ForgotPassword';
import UserHome from './pages/user/UserHome';
import MainNavbar from './components/navbar/MainNavbar';
import UserNavbar from './components/navbar/UserNavbar';
import CreateAccount from './pages/user/CreateAccount';
import AccountDetails from './pages/user/AccountDetials';
import Transaction from './pages/user/Transaction';
import Deposit from './pages/user/Deposit';
import Withdraw from './pages/user/Withdraw';
import TransactionHistory from './pages/user/TransactionHistory';
import BillStatement from './pages/user/BillStatement';

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? <UserNavbar /> : <MainNavbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/pages/Home" element={<Home />} />
        <Route path="/pages/login" element={<Login />} />
        <Route path="/pages/Registration" element={<Register />} />
        <Route path="/pages/ForgotPassword" element={<ForgotPassword />} />
        
        {/* User Routes */}
        {isAuthenticated && (
          <>
            <Route path="/pages/user/UserHome" element={<UserHome />} />
            <Route path="/pages/user/CreateAccount" element={<CreateAccount />} />
            <Route path="/pages/user/AccountDetials" element={<AccountDetails />} />
            <Route path="/pages/user/Transaction" element={<Transaction />} />
            <Route path="/pages/user/Deposit" element={<Deposit />} />
            <Route path="/pages/user/Withdraw" element={<Withdraw />} />
            <Route path="/pages/user/TransactionHistory" element={<TransactionHistory />} />
            <Route path="/pages/user/BillStatement" element={<BillStatement />} />
          </>
        )}
  
        {/* Redirect to Home or Login based on authentication */}
        <Route path="/" element={<Navigate to={isAuthenticated ? "/pages/user/UserHome" : "/pages/Home"} />} />
      </Routes>
    </>
  );
  
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;

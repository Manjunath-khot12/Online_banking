import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth, AuthProvider } from "./context/AuthContext";
import Home from './pages/Home';
import Login from './pages/login';
import Register from './pages/Registration';
import UserHome from './pages/user/UserHome';
import MainNavbar from './components/navbar/MainNavbar';
import UserNavbar from './components/navbar/UserNavbar';
import CreateAccount from './pages/user/CreateAccount';

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
        
        {/* User Routes */}
        {isAuthenticated && (
          <>
            <Route path="/pages/user/UserHome" element={<UserHome />} />
            <Route path="/pages/user/CreateAccount" element={<CreateAccount />} />
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

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../styles.css';

import Home from './Home';
import Settings from './Settings';
import Login from './Login';
import CreateAccount from './CreateAccount';
import SignOfTheDay from './SignOfTheDay';
import Error from './Error';
import App from './App';


const AppRouter = () => {
  return (
    <Router>
        <nav>
            <Link to="/"> Sign Of The Day </Link>
            <Link to="/translation-page"> Translation Page </Link>
            <Link to="/settings"> Settings </Link>
            <Link to="/login"> Login </Link>
            <Link to="/create-account"> Create Account </Link>


        </nav>
        <Routes>
            <Route path="/" element={<SignOfTheDay />} />
            <Route path="/translation-page" element={<App />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="*" element={<Error />} />
        </Routes>
    </Router>
  );
}

export default AppRouter;
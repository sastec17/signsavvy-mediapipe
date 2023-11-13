import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './styles.css';

import Home from './home';
import Settings from './settings';
import Login from './login';
import CreateAccount from './createaccount';
import SignOfTheDay from './signOfTheDay';
import Error from './error';
import App from './App';
import { StylingProvider } from './StylingContext';

const AppRouter = () => {
  // Retrieve the login status from localStorage on component mount
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    return storedLoginStatus ? JSON.parse(storedLoginStatus) : false;
  });

  const updateLoginStatus = (status) => {
    // Update the login status in both state and localStorage
    setIsLoggedIn(status);
    localStorage.setItem('isLoggedIn', JSON.stringify(status));
  };

  useEffect(() => {
    // Example of additional logic to perform on login status change
    console.log(`Login status changed: ${isLoggedIn}`);
  }, [isLoggedIn]);

  return (
    <StylingProvider>
    <Router>
      <nav>
        <div className="navbar">
          <h1 className="title">SignSavvy</h1>
          {isLoggedIn && <Link to="/">Sign Of The Day</Link>}
          {isLoggedIn && <Link to="/translation-page">Translation Page</Link>}
          {isLoggedIn && <Link to="/settings">Settings</Link>}
        </div>
      </nav>
      <Routes>
        {isLoggedIn && <Route path="/" element={<SignOfTheDay />} />}
        {!isLoggedIn && (
          <Route
            path="/"
            element={<Login updateLoginStatus={updateLoginStatus} />}
          />
        )}
        <Route path="/translation-page" element={<App />} />
        <Route
          path="/settings"
          element={<Settings updateLoginStatus={updateLoginStatus} />}
        />
        <Route
          path="/login"
          element={<Login updateLoginStatus={updateLoginStatus} />}
        />
        <Route
          path="/create-account"
          element={<CreateAccount updateLoginStatus={updateLoginStatus} />}
        />
        <Route path="*" element={<Error />} />
      </Routes>

      {/* Links for Login and Create Account outside the navigation bar */}
      {!isLoggedIn && <Link to="/login">Login</Link>}
      {!isLoggedIn && <Link to="/create-account">Create Account</Link>}
    </Router>
    </StylingProvider>
  );
};

export default AppRouter;

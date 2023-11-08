import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './styles.css';

import Home from './home';
import Settings from './settings';
import Login from './login';
import CreateAccount from './createaccount';
import SignOfTheDay from './signOfTheDay';
import Error from './error';
import App from './App';
import { FaceStylizer } from '@mediapipe/tasks-vision';

const isLoggedIn = true; // Currently is always set to true, need to implement user authentification logic 

const AppRouter = () => {
  return (
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
        {!isLoggedIn && <Route path="/" element={<Login />} />}
        <Route path="/translation-page" element={<App />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

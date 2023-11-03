import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './home';
import Settings from './settings';
import Login from './login';
import CreateAccount from './createaccount';
import SignOfTheDay from './signOfTheDay';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div>
        {/* Global Navigation Bar */}
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/settings">Settings</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/create-account">Create Account</Link></li>
            <li><Link to="/SignIfTheDay">Sign Of The Day</Link></li>
          </ul>
        </nav>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/settings" component={Settings} />
          <Route path="/login" component={Login} />
          <Route path="/create-account" component={CreateAccount} />
          <Route path="/signOfTheDay" component={SignOfTheDay} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
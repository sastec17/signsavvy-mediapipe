import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./styles.css";
import Settings from "./settings.js";
import Login from "./login.js";
import CreateAccount from "./createaccount.js";
import SignOfTheDay from "./signOfTheDay.js";
import Error from "./error.js";
import App from "./App.js";
import { StylingProvider } from "./StylingContext.js";
import Cookies from "js-cookie";

const AppRouter = () => {
  // Retrieve the login status from localStorage on component mount
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    return storedLoginStatus ? JSON.parse(storedLoginStatus) : false;
  });

  const updateLoginStatus = (status) => {
    // Update the login status in both state and localStorage
    setIsLoggedIn(status);
    localStorage.setItem("isLoggedIn", JSON.stringify(status));
  };
  function logout() {
    setIsLoggedIn(false); // Update login status
    //navigate("/login");
    Cookies.remove("login", { path: "" });
  }

  useEffect(() => {
    // Example of additional logic to perform on login status change
    console.log(`Login status changed: ${isLoggedIn}`);
  }, [isLoggedIn]);

  return (
    <StylingProvider>
      <div className="background">
        <Router>
          <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
            <span style={{ display: "flex", alignItems: "center" }}>
              <h1 className="text-lg font-bold">SignSavvy</h1>
              <img
                src="SignSavvy.png"
                alt="SignSavvyLogo"
                className="ml-2"
                style={{ width: "30px", height: "30px" }}
              />
            </span>
            <div className="flex justify-center space-x-4">
              {isLoggedIn && <Link to="/">Sign of the Day</Link>}
              {isLoggedIn && <Link to="/translation-page">Translation</Link>}
              {isLoggedIn && (
                <Link
                  to="/settings"
                  className="nav-link"
                  style={{ paddingRight: "65px" }} // Padding to fix centering after adding signsavvy icon
                >
                  Settings
                </Link>
              )}
            </div>
            {/* Nav buttons when logged in */}
            {!isLoggedIn && (
              <div className="flex space-x-4">
                <Link to="/login">Log In</Link>
                <Link to="/create-account">Create Account</Link>
              </div>
            )}
            {isLoggedIn && (
              <div onClick={logout} className="flex space-x-4">
                <Link to="/login">Sign Out</Link>
              </div>
            )}
          </header>
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
        </Router>
      </div>
    </StylingProvider>
  );
};

export default AppRouter;

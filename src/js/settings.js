import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import Cookies from "js-cookie";
import { useStyling } from "./StylingContext";

const Settings = ({ updateLoginStatus }) => {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [selectedTab, setSelectedTab] = useState("your-account");
  const navigate = useNavigate();
  const {
    fontSize,
    setFontSize,
    fontColor,
    setFontColor,
    fontBackgroundColor,
    setFontBackgroundColor,
  } = useStyling();

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    try {
      const value = Cookies.get("login");
      setName(value);
      setUsername(value);
      const storedData = Cookies.get("login");
      const storedData2 = Cookies.get(storedData);
      const json = JSON.parse(storedData2);
      setFontSize(json.fontsize);
      setFontColor(json.fontcolor);
      setFontBackgroundColor(json.backgroundColor);
    } catch (error) {
      console.log(error);
    }
  };

  const onPressSave = () => {
    if (newPassword === "" && confirmPassword === "") {
      alert("No changes have been made.");
    } else if (newPassword !== confirmPassword) {
      alert(
        "Passwords do not match. Please make sure you have entered the same password in both fields."
      );
    } else {
      alert("Your new password has been saved.");
      setNewPassword(newPassword);
      setConfirmPassword(confirmPassword);
      const value = Cookies.get(username);
      const json = JSON.parse(value);
      json.password = newPassword;
      json.fontsize = fontSize;
      json.fontcolor = fontColor;
      json.backgroundColor = fontBackgroundColor;
      Cookies.set(username, JSON.stringify(json));
    }
  };

  const onPressSave2 = () => {
    alert("User Preferences have been saved.");
    const value = Cookies.get(username);
    const json = JSON.parse(value);
    json.fontsize = fontSize;
    json.fontcolor = fontColor;
    json.backgroundColor = fontBackgroundColor;
    Cookies.set(username, JSON.stringify(json));
  };

  const logout = () => {
    updateLoginStatus(false); // Update login status
    navigate("/login");
    Cookies.remove("login", { path: "" });
  };

  return (
    <div className="container">
      <h1 className="header">Settings</h1>
      <ul className="tab-menu">
        <li
          className={selectedTab === "your-account" ? "active" : ""}
          onClick={() => setSelectedTab("your-account")}
        >
          Your Account
        </li>
        <li
          className={selectedTab === "subtitle-styles" ? "active" : ""}
          onClick={() => setSelectedTab("subtitle-styles")}
        >
          User Preferences
        </li>
      </ul>
      <div className="tab-content">
        {selectedTab === "your-account" && (
          <div>
            <h2>Your Account</h2>
            <label>Username</label>
            <input
              className="input"
              type="text"
              value={name}
              placeholder={name}
              readOnly
              disabled
            />
            <label>New Password</label>
            <input
              className="input"
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              placeholder="New Password"
            />
            <label>Confirm Password</label>
            <input
              className="input"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              placeholder="Confirm Password"
            />
            <button onClick={onPressSave} className="saveButton">
              SAVE CHANGES
            </button>
            <button onClick={logout} className="logoutButton">
              LOGOUT
            </button>
          </div>
        )}
        {selectedTab === "subtitle-styles" && (
          <div>
            <h2>User Preferences</h2>
            <label className="tooltip">
              Font Size
              <img
                src="question_mark_tooltip.png"
                className="info-icon tooltip-icon"
              />
              <span className="tooltip-text">
                This will adjust the translation text font size on the
                Translation Page.
              </span>
            </label>
            <select
              className="input"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
            >
              <option value="14px">14px</option>
              <option value="16px">16px</option>
              <option value="18px">18px</option>
              <option value="20px">20px</option>
              <option value="22px">22px</option>
              <option value="24px">24px</option>
            </select>
            <label className="tooltip">
              Translation Font Color
              <img
                src="question_mark_tooltip.png"
                className="info-icon tooltip-icon"
              />
              <span className="tooltip-text">
                This will adjust the translation text color on the Translation
                Page.
              </span>
            </label>
            <input
              className="input"
              type="color" // Use type="color" for color picker
              value={fontColor}
              onChange={(e) => setFontColor(e.target.value)}
            />
            <label className="tooltip">
              Translation Font Background Color
              <img
                src="question_mark_tooltip.png"
                className="info-icon tooltip-icon"
              />
              <span className="tooltip-text">
                This will adjust the translation text background color on the
                Translation Page.
              </span>
            </label>
            <input
              className="input"
              type="color" // Use type="color" for color picker
              value={fontBackgroundColor}
              onChange={(e) => setFontBackgroundColor(e.target.value)}
            />
            <button onClick={onPressSave2} className="saveButton">
              SAVE CHANGES
            </button>
            <button onClick={logout} className="logoutButton">
              LOGOUT
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;

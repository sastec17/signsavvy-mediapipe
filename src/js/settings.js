import React, { useState, useEffect } from 'react';
import './styles.css';

const Settings = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [selectedTab, setSelectedTab] = useState('your-account');
  const [fontSize, setFontSize] = useState("16px"); // Default font size
  const [fontColor, setFontColor] = useState("#000000"); // Default font color
  const [fontBackgroundColor, setFontBackgroundColor] = useState("#FFFFFF"); // Default font background color

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    try {
      const value = "signsavvyuser@gmail.com"; // TODO: Replace this with database retrieval logic
      setName(value);
    } catch (error) {
      console.log(error);
    }
  };

  const onPressSave = () => {
    if (newPassword === "" && confirmPassword === "") {
      alert("No changes have been made.");
    } else if (newPassword !== confirmPassword) {
      alert("Passwords do not match. Please make sure you have entered the same password in both fields.");
    } else {
      alert("Your new password has been saved.");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  const logout = async () => {
    try {
      // TODO:
      // Add logout logic
      // Navigate back to the login page -> navigation.navigate("Log in");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1 className="header">Settings</h1>
      <ul className="tab-menu">
        <li
          className={selectedTab === 'your-account' ? 'active' : ''}
          onClick={() => setSelectedTab('your-account')}
        >
          Your Account
        </li>
        <li
          className={selectedTab === 'subtitle-styles' ? 'active' : ''}
          onClick={() => setSelectedTab('subtitle-styles')}
        >
          User Preferences
        </li>
      </ul>
      <div className="tab-content">
        {selectedTab === 'your-account' && (
          <div>
            <h2>Your Account</h2>
            <label>Username</label>
            <input
              className="input"
              type="text"
              value={"signsavvyuser@gmail.com"}
              placeholder="Current Username"
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
        {selectedTab === 'subtitle-styles' && (
          <div>
            <h2>User Preferences</h2>
            <label className="tooltip">
              Font Size
              <img src="public/question_mark_tooltip.png" className="info-icon" />
              <span className="tooltip-text">Enter a font size within 14px to 24px</span>
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
            <label>Translation Font Color</label>
            <input
              className="input"
              type="color" // Use type="color" for color picker
              value={fontColor}
              onChange={(e) => setFontColor(e.target.value)}
            />
            <label>Translation Font Background Color</label>
            <input
              className="input"
              type="color" // Use type="color" for color picker
              value={fontBackgroundColor}
              onChange={(e) => setFontBackgroundColor(e.target.value)}
            />
            <button onClick={onPressSave} className="saveButton">
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
}

export default Settings;

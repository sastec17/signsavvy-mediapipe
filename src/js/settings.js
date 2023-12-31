import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import Cookies from "js-cookie";
import { useStyling } from "./StylingContext.js";

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

    const handleKeyDown = (e, tabName) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent the default Enter key behavior
            setSelectedTab(tabName);
        }
    };

    return (
        <>
            <header className="bg-white shadow flex items-center">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Settings
                    </h1>
                </div>
            </header>
            <div className="container">
                <ul className="tab-menu">
                    <li
                        className={selectedTab === "your-account" ? "active" : ""}
                        onClick={() => setSelectedTab("your-account")}
                        onKeyDown={(e) => handleKeyDown(e, "your-account")}
                        tabIndex={0}
                    >
                        Your Account
                    </li>
                    <li
                        className={selectedTab === "subtitle-styles" ? "active" : ""}
                        onClick={() => setSelectedTab("subtitle-styles")}
                        onKeyDown={(e) => handleKeyDown(e, "subtitle-styles")}
                        tabIndex={0}
                    >
                        User Preferences
                    </li>
                </ul>
                <div className="tab-content">
                    {selectedTab === "your-account" && (
                        <div>
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
                            {/* Sample Translation Text Section */}
                            <div
                                className="sample-translation"
                                style={{
                                    fontSize,
                                    color: fontColor,
                                    backgroundColor: fontBackgroundColor,
                                }}
                            >
                                <h3>Sample Translation Text</h3>
                            </div>

                            {/* Font Size Selector */}
                            <label className="tooltip">
                                Font Size
                                <img
                                    src="question_mark_tooltip.png"
                                    className="info-icon tooltip-icon"
                                    alt="Tool tip icon"
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
                                <option value="12px">12px</option>
                                <option value="18px">18px</option>
                                <option value="24px">24px</option>
                                <option value="30px">30px</option>
                                <option value="36px">36px</option>
                                <option value="48px">48px</option>
                            </select>

                            {/* Font Color Selector */}
                            <label className="tooltip">
                                Translation Font Color
                                <img
                                    src="question_mark_tooltip.png"
                                    className="info-icon tooltip-icon"
                                    alt="Tool tip icon"
                                />
                                <span className="tooltip-text">
                                    This will adjust the translation text color on the Translation Page.
                                </span>
                            </label>

                            <div className="color-picker-container">

                                <div className="color-picker-wrapper">
                                    <button onClick={() => document.getElementById('fontColorPicker').click()} className="color-picker-button">
                                        Click to Select Color
                                    </button>
                                    <input
                                        id="fontColorPicker"
                                        className="color-picker"
                                        type="color"
                                        style={{ display: 'none' }} // hide the color picker
                                        value={fontColor}
                                        onChange={(e) => setFontColor(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Font Background Color Selector */}

                            <label className="tooltip">
                                Translation Font Background Color
                                <img
                                    src="question_mark_tooltip.png"
                                    className="info-icon tooltip-icon"
                                    alt="Tool tip icon"
                                />
                                <span className="tooltip-text">
                                    This will adjust the translation text background color on the Translation Page.
                                </span>
                            </label>
                            <div className="color-picker-container">
                                <div className="color-picker-wrapper">
                                    <button onClick={() => document.getElementById('bgColorPicker').click()} className="color-picker-button">
                                        Click to Select Color
                                    </button>
                                    <input
                                        id="bgColorPicker"
                                        className="color-picker"
                                        type="color"
                                        style={{ display: 'none' }} // hide the color picker
                                        value={fontBackgroundColor}
                                        onChange={(e) => setFontBackgroundColor(e.target.value)}
                                    />
                                </div>
                            </div>

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
        </>
    );
};

export default Settings;

import React from "react";
import ReactSwitch from 'react-switch';

const ToggleSwitch = ({ label, checked, setChecked }) => {
    const handleChange = () => {
        setChecked(!checked); // Toggle the checked state
    };

    return (
        <div className="container">
            {label}{" "}
            <ReactSwitch
                checked={checked}
                onChange={handleChange}
            />
        </div>
    );
};

export default ToggleSwitch;
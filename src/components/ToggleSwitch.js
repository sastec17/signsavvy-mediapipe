import React from "react";
import ReactSwitch from 'react-switch';

const ToggleSwitch = ({ label, checked, setChecked }) => {
    const handleChange = () => {
        setChecked(!checked); // Toggle the checked state
    };

    return (
        <div className="flex justify-center m-2">
            <p className="m-1">{label}{" "}</p>
            <ReactSwitch
                checked={checked}
                onChange={handleChange}
            />
        </div>
    );
};

export default ToggleSwitch;
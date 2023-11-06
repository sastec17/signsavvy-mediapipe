import React, {useState} from "react";
import ReactSwitch from 'react-switch';

const ToggleSwitch = ({label}) => {
    const [checked, setChecked] = useState(false);

    const handleChange = val => { setChecked(val)}
    return (
        <div className="container">
            {label}{" "}
            <ReactSwitch
                checked={checked}
                onChange={handleChange}
            ></ReactSwitch>
        </div>
    )
}

export default ToggleSwitch;
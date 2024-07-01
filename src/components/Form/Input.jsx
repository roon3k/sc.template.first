import React from "react";

const Input = ({ label, name, min, required, type, placeholder, value, onChange}) => {
    return (
        <div className={"input-container"}>
            {label ? <label>{label}</label> : ""}
            <input
                name={name}
                required={required}
                className={"input"}
                type={type}
                min={min}
                placeholder={placeholder}
                value={value}
                onChange={(e)=>onChange(e.target.value)}
            />
        </div>
    );
};

export default Input;
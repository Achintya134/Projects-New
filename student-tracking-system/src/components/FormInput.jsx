import React from "react";

function FormInput({ type, name, value, handleChange, labelText, placeholder, min, max, step }) {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>

      <input
        type={type}
        value={value}
        name={name}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        className="form-input"
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormInput;

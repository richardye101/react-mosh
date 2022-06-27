import React from "react";

// ...rest just imports the rest of the props, pretty cool
const Input = ({ label, name, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {/* autoFocus focuses the user on a field on load */}
      <input
        id={name}
        name={name}
        {...rest} // equivalent to the below
        // type={type}
        // value={value}
        // onChange={onChange}
        className="form-control"
      />
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;

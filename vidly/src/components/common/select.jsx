import React from "react";

// ...rest just imports the rest of the props, pretty cool
const Select = ({ label, name, error, options, ...rest }) => {
  // console.log(options);
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {/* autoFocus focuses the user on a field on load */}
      <select
        id={name}
        name={name}
        {...rest} // equivalent to the below
        // value={value}
        // onChange={onChange}
        className="form-select form-control"
      >
        <option value=""></option>
        {options.map((o) => (
          <option value={o._id} key={o._id}>
            {o.name}
          </option>
        ))}
      </select>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default Select;

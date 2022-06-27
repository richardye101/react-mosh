import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <>
      <input
        type="search"
        id="search-box"
        className="form-control my-3"
        placeholder="Search..."
        aria-label="Search"
        onChange={(e) => onChange(e.currentTarget.value)}
        value={value}
      />
    </>
  );
};

export default SearchBox;

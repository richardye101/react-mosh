import React, { Component } from "react";

// no state of its own, so can become a stateless functional component
// also object destructure the default input, props to take only the parts we need
const NavBar = ({ totalCounters }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <a href="#" className="navbar-brand">
        NavBar
        <span className="badge bg-pill bg-secondary">{totalCounters}</span>
      </a>
    </nav>
  );
};

export default NavBar;

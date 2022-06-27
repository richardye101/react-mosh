import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  // useEffect(() => {
  //   setIsNavCollapsed(true);
  // });
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Vidly
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded={!isNavCollapsed ? true : false}
        aria-label="Toggle navigation"
        onClick={handleNavCollapse}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
        id="navbarNav"
      >
        <div className="navbar-nav mr-auto">
          <NavLink
            className="nav-item nav-link"
            to="/movies"
            onClick={() => handleNavCollapse()}
          >
            Movies
          </NavLink>
          <NavLink
            className="nav-item nav-link"
            to="/customers"
            onClick={() => handleNavCollapse()}
          >
            Customers
          </NavLink>
          <NavLink
            className="nav-item nav-link"
            to="/rentals"
            onClick={() => handleNavCollapse()}
          >
            Rentals
          </NavLink>
          {user ? (
            <>
              <NavLink
                className="nav-item nav-link"
                to="/profile"
                onClick={() => handleNavCollapse()}
              >
                {user.name}
              </NavLink>
              <NavLink
                className="nav-item nav-link"
                to="/logout"
                onClick={() => handleNavCollapse()}
              >
                Logout
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                className="nav-item nav-link"
                to="/login"
                onClick={() => handleNavCollapse()}
              >
                Login
              </NavLink>
              <NavLink
                className="nav-item nav-link"
                to="/register"
                onClick={() => handleNavCollapse()}
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

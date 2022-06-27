import React from "react";
import { useEffect } from "react";
import auth from "../services/authService";

const Logout = () => {
  useEffect(() => {
    auth.logout();
    window.location = "/";
  }, []);
};

export default Logout;

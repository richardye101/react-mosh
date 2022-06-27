import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import auth from "../../services/authService";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  //   In react v6, I cannot pass user as a prop to a functional component so i need to get it again here.
  // Wasted so much of my time smh.
  const user = auth.getCurrentUser();

  useEffect(() => {
    if (!user) {
      console.log("Directing to login page");
      navigate("/login", { state: { from: location.pathname } });
    }
  }, []);

  return props.children;
  //   <Navigate
  //     to={
  //       pathname: "/login"
  //     } state: { from: location.pathname }
  //   />
};

export default ProtectedRoute;

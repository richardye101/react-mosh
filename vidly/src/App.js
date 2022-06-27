import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
import NavBar from "./components/navBar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("Got user");
    const user = auth.getCurrentUser();
    // console.log(user);
    setUser(user);
  }, []);

  return (
    <>
      <ToastContainer />
      <NavBar user={user} />
      <div className="container">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<RegisterForm />} />
          {/* <Route path="/movies/new" element={<MovieForm newMovie={true} />} /> */}
          {/* protecting this route, so unauthed users can't access the route */}
          {/* <Route
            path="/movies/:id"
            element={user ? <MovieForm /> : <Navigate to="/login" />}
          /> */}
          <Route
            path="/movies/:id"
            element={
              <ProtectedRoute>
                <MovieForm />
              </ProtectedRoute>
            }
          />
          <Route path="/movies" element={<Movies user={user} />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/" element={<Navigate to="/movies" />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

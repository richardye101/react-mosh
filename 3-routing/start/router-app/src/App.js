import React, { Component } from "react";
import NavBar from "./components/navbar";
import Products from "./components/products";
import Posts from "./components/posts";
import Home from "./components/home";
import Dashboard from "./components/admin/dashboard";
import ProductDetails from "./components/productDetails";
import NotFound from "./components/notFound";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="content">
          <Routes>
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/products" element={<Products sortBy="newest" />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:year" element={<Posts />} />
            <Route path="/posts/:year/:month" element={<Posts />} />
            <Route path="/admin/*" element={<Dashboard />} />
            <Route path="/" element={<Home />} />
            {/* new way to do not found */}
            <Route path="/not-found" element={<NotFound />} />
            {/* wildcard means some weird path we haven't seen before */}
            <Route path="*" element={<Navigate to="/not-found" />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;

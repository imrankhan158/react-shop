import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <div className="overflow-hidden">
      <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/product/:id" element={<ProductDetails />}></Route>
        </Routes>
        <Sidebar />
      </Router>
      <Footer />
    </div>
  );
};

export default App;

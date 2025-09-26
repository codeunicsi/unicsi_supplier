import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react"
import {Home} from "./pages/Home"
import ManageProducts from "./pages/manage-products"
import "./App.css";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manage-products" element={<ManageProducts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

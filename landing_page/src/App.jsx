import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react"
import {Home} from "./pages/Home"
import ManageProducts from "./pages/manage-products"
import ManageOrders from "./pages/manage-orders"
import Analytics from "./pages/analytics"
import ProductRequirement from "./pages/product-requirement"

import "./App.css";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<ManageOrders />} />
        <Route path="/rto-returns/overview" element={<Analytics />} />
        <Route path="/listings/new" element={<ProductRequirement />} />
        <Route path="/manage-products" element={<ManageProducts />} />
          <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;

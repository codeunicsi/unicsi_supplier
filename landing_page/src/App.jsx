import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { Home } from "./pages/Home";
import ManageProducts from "./pages/manage-products";
import ManageOrders from "./pages/manage-orders";
import Analytics from "./pages/analytics";
import ProductRequirement from "./pages/product-requirement";
import NotFound from "./pages/NotFound";
import Login from "./pages/login";
import Signup from "./pages/signup";
import SellerDashboard from "./pages/SellerDashboard";
import VendorDashboard from "./pages/VendorDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Seller-Specific Protected Routes */}
        <Route
          path="/order"
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <ManageOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rto-returns/overview"
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <Analytics />
            </ProtectedRoute>
          }
        />

        {/* Vendor-Specific Protected Routes */}
        <Route
          path="/manage-products"
          element={
            <ProtectedRoute allowedRoles={["vendor"]}>
              <ManageProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/listings/new"
          element={
            <ProtectedRoute allowedRoles={["vendor"]}>
              <ProductRequirement />
            </ProtectedRoute>
          }
        />

        {/* Dashboards */}
        <Route
          path="/seller"
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <SellerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor"
          element={
            <ProtectedRoute allowedRoles={["vendor"]}>
              <VendorDashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

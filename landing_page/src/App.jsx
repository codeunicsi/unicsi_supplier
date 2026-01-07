import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import { Home } from "./pages/Home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import NotFound from "./pages/NotFound";

import ManageProducts from "./products/ManageProducts";
import ManageOrders from "./products/ManageOrder";
import Analytics from "./products/AnalyticsPage";
import ProductRequirement from "./products/ProductRequirementPage";
// import SellerDashboard from "./pages/SellerDashboard";
// import VendorDashboard from "./pages/VendorDashboard";
import ProfilePage from "./pages/profile";

import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/layout/MainLayout";
import { AuthProvider } from "./auth/Authcontext";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* SUPPLIER PANEL (with layout) */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["SUPPLIER"]}>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* <Route path="/seller" element={<SellerDashboard />} />
          <Route path="/vendor" element={<VendorDashboard />} /> */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/order" element={<ManageOrders />} />
          <Route path="/manage-products" element={<ManageProducts />} />
          <Route path="/product-requirement" element={<ProductRequirement />} />
          <Route path="/source-product" element={<ProductRequirement />} />
          <Route path="/rto-returns/overview" element={<Analytics />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

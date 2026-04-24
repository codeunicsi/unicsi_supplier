import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import Login from "./pages/login";
import Signup from "./pages/signup";
import NotFound from "./pages/NotFound";

import ManageProducts from "./products/ManageProducts";
import ManageOrders from "./products/ManageOrder";
import Analytics from "./products/AnalyticsPage";
import RtoReturnsPage from "./products/RtoReturnsPage";
import ProductRequirement from "./products/ProductRequirementPage";
import ProfilePage from "./pages/profile";

import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/layout/MainLayout";
import { AuthProvider } from "./auth/AuthContext";
import AddProductForm from "./pages/add-product-form";
import ProductsList from "./pages/products-list";
import Settings from "./pages/settings";
import { Navigate } from "react-router-dom";

import "./App.css";
import ReportsTable from "./pages/ReportsTable";
import SubmitTicket from "./pages/SubmitTicket";
import PaymentsPage from "./pages/Payment";
import Faq from "./pages/Faqs";
import Penalties from "./pages/Penalties";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

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
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/order" element={<ManageOrders />} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="/products/add" element={<AddProductForm />} />
            <Route
              path="/edit-product/:product_id"
              element={<AddProductForm />}
            />
            <Route
              path="/products/:product_id/clone"
              element={<AddProductForm />}
            />
            <Route path="/manage-products" element={<ManageProducts />} />
            <Route
              path="/product-requirement"
              element={<ProductRequirement />}
            />
            <Route path="/source-product" element={<ProductRequirement />} />
            <Route path="/reports" element={<ReportsTable />} />
            <Route path="/rto-returns" element={<RtoReturnsPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/supports" element={<SubmitTicket />} />
            <Route path="/payments" element={<PaymentsPage />} />
            <Route path="/faqs" element={<Faq />} />
            <Route path="/penalties" element={<Penalties />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

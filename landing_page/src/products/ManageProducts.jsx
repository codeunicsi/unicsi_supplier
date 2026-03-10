// components/products/ManageProductsPage.jsx
import { useEffect, useState } from "react";
import FiltersBar from "./FiltersBar";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/product/product.service";
import { CircularProgress } from "@mui/material";

export default function ProductRequirementPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#f4fbfc", padding: "24px" }}>
      {/* Page Header */}
      <div style={{ marginBottom: "20px" }}>
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: 800,
            color: "#000",
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          Product Requirement
        </h1>
        <p style={{ color: "#555", margin: "4px 0 0", fontSize: "0.9rem" }}>
          Manage all your product requirements from here.
        </p>
      </div>

      <FiltersBar type="manage-product-requirements" />

      {/* Loading */}
      {loading && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "260px",
            gap: "12px",
          }}
        >
          <CircularProgress sx={{ color: "#0097b2" }} />
          <span
            style={{ color: "#0097b2", fontSize: "0.9rem", fontWeight: 500 }}
          >
            Loading products…
          </span>
        </div>
      )}

      {/* Empty state */}
      {!loading && (!products?.products || products.products.length === 0) && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "260px",
            gap: "12px",
            border: "2px dashed #b8e8f0",
            borderRadius: "16px",
            background: "#f8fdfe",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "14px",
              background: "linear-gradient(135deg, #0097b2 0%, #7ed957 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
          </div>
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontWeight: 700,
                color: "#000",
                margin: "0 0 4px",
                fontSize: "1rem",
              }}
            >
              No products found
            </p>
            <p style={{ color: "#777", margin: 0, fontSize: "0.875rem" }}>
              Products will appear here once added.
            </p>
          </div>
        </div>
      )}

      {/* Product Grid */}
      {!loading && products?.products?.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "18px",
          }}
        >
          {products.products.map((product) => (
            <ProductCard key={product?.product_id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

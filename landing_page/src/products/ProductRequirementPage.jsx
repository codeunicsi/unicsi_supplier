"use client";

import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import FiltersBar from "./FiltersBar";
import { fetchHandsAProducts } from "../services/hands-a-product/hands-a-product";

export default function ManageProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);

        const res = await fetchHandsAProducts();
        console.log(res);

        // 🔴 IMPORTANT: adjust based on your API response structure
        // assuming: res.data = array
        const formattedProducts = res?.data?.data?.requests?.map((item) => ({
          product_id: item._id || item.requestId,
          title: item.productName,
          price: Number(item.expectedPrice) || 0,
          orders: 0, // API doesn't provide → keep fallback
          images: item.productImageUrl
            ? [item.productImageUrl]
            : ["https://via.placeholder.com/400x300?text=No+Image"],
        }));

        setProducts(formattedProducts || []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Product Requirement</h1>
      <p className="text-gray-600 mb-4">
        Manage all your product requirements from here.
      </p>

      <FiltersBar type="manage-product-requirements" />

      {/* ✅ STATES HANDLING */}
      {loading && <p>Loading products...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.product_id} product={product} />
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      )}
    </div>
  );
}

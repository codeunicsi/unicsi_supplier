// components/products/ManageProductsPage.jsx
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import FiltersBar from "./FiltersBar";
import { getRequestProducts } from "../services/prodile/profile.service"; // adjust import path as needed

export default function ManageProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getRequestProducts();
        console.log(data);
        const mapped = data?.data?.data?.requests?.map((item) => ({
          product_id: item.requestId,
          title: item.productName,
          price: parseFloat(item.expectedPrice),
          orders: 0, // not in API response
          images: [item.productImageUrl],
          category: item.productCategory,
          status: item.status,
          submittedAt: item.submittedAt,
        }));
        setProducts(mapped);
      } catch (err) {
        setError("Failed to load products.", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="">
      <h1 className="text-xl font-bold mb-2">Product Requirement</h1>
      <p className="text-gray-600 mb-4">
        Manage all your product requirements from here.
      </p>
      <FiltersBar type="manage-product-requirements" />
      <div>
        {loading ? (
          <p className="text-gray-500">Loading products...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
            {products.map((product) => (
              <ProductCard key={product.product_id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

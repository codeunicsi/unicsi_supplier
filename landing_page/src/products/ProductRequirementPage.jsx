// Product requirement listing (supplier) — /product-requirement
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import FiltersBar from "./FiltersBar";
import { getRequestProducts } from "../services/prodile/profile.service";

export default function ProductRequirementPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getRequestProducts();
        const mapped = data?.data?.data?.requests?.map((item) => ({
          product_id: item.requestId,
          title: item.productName,
          price: parseFloat(item.expectedPrice),
          orders: 0,
          images: [item.productImageUrl],
          category: item.productCategory,
          status: item.status,
          submittedAt: item.submittedAt,
        }));
        setProducts(mapped ?? []);
      } catch (err) {
        setError(
          err?.message
            ? `Failed to load products: ${err.message}`
            : "Failed to load products.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="box-border w-full min-w-0 max-w-full pb-6">
      <header className="mb-4 min-w-0 sm:mb-5">
        <h1 className="mb-2 break-words text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
          Product Requirement
        </h1>
        <p className="max-w-3xl break-words text-sm leading-relaxed text-gray-600 sm:text-base">
          Manage all your product requirements from here.
        </p>
      </header>

      <FiltersBar type="manage-product-requirements" />

      <div className="mt-1 min-w-0 w-full max-w-full">
        {loading ? (
          <div
            className="flex min-h-[160px] w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#b8e8f0] bg-[#f8fdfe] px-4 py-10 text-center text-gray-600"
            role="status"
            aria-live="polite"
          >
            <span className="inline-block h-9 w-9 animate-spin rounded-full border-2 border-[#0097b2] border-t-transparent" />
            <p className="text-sm font-medium">Loading products…</p>
          </div>
        ) : error ? (
          <div
            className="rounded-xl border border-red-200 bg-red-50/90 px-4 py-4 text-sm text-red-800 sm:text-base"
            role="alert"
          >
            {error}
          </div>
        ) : products.length === 0 ? (
          <p className="rounded-xl border border-[#e0f4f7] bg-white px-4 py-8 text-center text-sm text-gray-600 sm:text-base">
            No product requirements yet.
          </p>
        ) : (
          <div
            className="grid w-full min-w-0 auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4"
            style={{ boxSizing: "border-box" }}
          >
            {products.map((product) => (
              <ProductCard key={product.product_id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

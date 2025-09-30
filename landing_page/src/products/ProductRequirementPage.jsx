// components/products/ManageProductsPage.tsx
import Tabs from "./Tabs"
import FiltersBar from "./FiltersBar"
import ProductTable from "./ProductTable"
import Pagination from "../ui/Pagination"
import ProductCard from "../components/ProductCard";

export default function ManageProductsPage() {
  return (
    <div className="">
      <h1 className="text-xl font-bold mb-2">Manage Products</h1>
      <p className="text-gray-600 mb-4">
        Manage all your products and inventory from here.
      </p>
      <FiltersBar type="manage-product-requirements" />
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </div>
  )
}
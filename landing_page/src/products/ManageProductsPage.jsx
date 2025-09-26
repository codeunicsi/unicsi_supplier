// components/products/ManageProductsPage.tsx
import Tabs from "./Tabs"
import FiltersBar from "./FiltersBar"
import ProductTable from "./ProductTable"
import Pagination from "../ui/Pagination"

export default function ManageProductsPage() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Manage Products</h1>
      <p className="text-gray-600 mb-4">
        Manage all your products and inventory from here.
      </p>

      <Tabs />
      <FiltersBar />
      <ProductTable />
      <Pagination />
    </div>
  )
}

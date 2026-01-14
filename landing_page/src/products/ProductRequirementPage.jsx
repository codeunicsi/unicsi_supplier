// components/products/ManageProductsPage.tsx
import { useEffect, useState } from "react";
import Tabs from "./Tabs"
import FiltersBar from "./FiltersBar"
import ProductTable from "./ProductTable"
import Pagination from "../ui/Pagination"
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/product/product.service";

export default function ProductRequirementPage() {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts();
                console.log(response.data);
                setProducts(response.data);
            } catch (error) {
                console.log(error);
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
          {products?.products?.map((product) => (
            console.log(product),
            <ProductCard key={product?.product_id} product={product} />
          ))}
          {/* <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard /> */}
        </div>
      </div>
    </div>
  )
}
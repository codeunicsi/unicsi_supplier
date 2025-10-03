// components/products/ProductTable.tsx
import ProductRow from "./ProductRow";
import React, { useState } from "react";

const dummyData = [
  {
    id: 1,
    name: "Product 1",
    description: "Description for Product 1",
    price: "$10.00",
    status: "In Stock",
  },
  {
    id: 2,
    name: "Product 2",
    description: "Description for Product 2",
    price: "$20.00",
    status: "Out of Stock",
  },
  {
    id: 3,
    name: "Product 3",
    description: "Description for Product 3",
    price: "$15.00",
    status: "In Stock",
  },
  {
    id: 4,
    name: "Product 4",
    description: "Description for Product 4",
    price: "$25.00",
    status: "In Stock",
  },    

];

export default function ProductTable({TableHeader}) {
const [products, setProducts] = useState(dummyData);
console.log(TableHeader);
const tableHeaderLength = TableHeader.length;
  return (
    <div className="border rounded-lg bg-white shadow-sm mt-4">
    <h4 className="p-3 text-sm font-semibold">All orders with at least one failed delivery attempt will be shown here.</h4>

      <div className={`grid grid-cols-7 py-3 border-b text-sm font-semibold bg-[#FFF4EE]`}>
        {TableHeader.map((header) => (
          <span key={header} className="text-center">{header}</span>
        ))}
      </div>
      {products.map((product) => (
        <ProductRow key={product.id} product={product} />
      ))}
    </div>
  );
}

// components/products/ProductTable.tsx
import ProductRow from "./ProductRow";
import React, { useState } from "react";

const dummyData = [

];

export default function ProductTable({TableHeader}) {
const [products, setProducts] = useState(dummyData);
const tablehHeaderLength = TableHeader.length;
  return (
    <div className="border rounded-lg bg-white shadow-sm mt-4">
    <h4 className="p-3 text-sm font-semibold">All orders with at least one failed delivery attempt will be shown here.</h4>

      <div className={`grid grid-cols-${tablehHeaderLength} grid-flow-row-dense py-3 border-b text-sm font-semibold bg-[#FFF4EE]`}>
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

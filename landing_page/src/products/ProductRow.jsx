// components/products/ProductRow.tsx
import { useState } from "react"
import ProductDetailsCard from "./ProductDetailsCard"

export default function ProductRow({ product }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div>
      <div className="grid grid-cols-5 gap-4 p-3 border-b text-sm">
        <span>{product.name}</span>
        <span>12-09-2025</span>
        <span>{product.code}</span>
        <span>{product.price}</span>
        <button
          className="text-blue-600 underline"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Hide" : "More"}
        </button>
      </div>
      {expanded && <ProductDetailsCard product={product} />}
    </div>
  )
}

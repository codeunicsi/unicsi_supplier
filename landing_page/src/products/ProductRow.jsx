// components/products/ProductRow.tsx
import { useState } from "react"
import ProductDetailsCard from "./ProductDetailsCard";
import ExpandIcon from "../assets/svg/ExpandIcon";

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
          {expanded ? <ExpandIcon className="inline-block w-4 h-4 ml-1 rotate-180 transition-transform duration-300" /> : <ExpandIcon className="inline-block w-4 h-4 ml-1 transition-transform duration-300" />}
        </button>
      </div>
      <div
        style={{
          maxHeight: expanded ? 500 : 0,
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {expanded && <ProductDetailsCard product={product} />}
      </div>
    </div>
  )
}

// components/products/ProductTable.tsx
import ProductRow from "./ProductRow";

const dummyData = [
  { id: 1, name: "Product A", code: "C123", price: "₹1200" },
  { id: 2, name: "Product B", code: "C456", price: "₹800" },
  { id: 3, name: "Product C", code: "C789", price: "₹1500" },
  { id: 4, name: "Product D", code: "C101", price: "₹600" },
];

export default function ProductTable() {
  return (
    <div className="border rounded-lg bg-white shadow-sm mt-4">
      <div className="grid grid-cols-5 gap-8 p-3 border-b text-sm font-semibold">
        <span>Product Details</span>
        <span>Pushed Date & Time</span>
        <span>C-Code</span>
        <span>Clout Price</span>
        <span>more details</span>
      </div>
      {dummyData.map((product) => (
        <ProductRow key={product.id} product={product} />
      ))}
    </div>
  );
}

export default function ProductDetailsCard() {
  return (
    <div className="flex items-center border-2 border-blue-400 rounded-xl p-4 bg-white shadow-lg h-[163px]">
      {/* Left Section: Image + Title */}
      <div className="flex items-center gap-3 w-1/3 pb-2">
        <div className="w-12 h-12 rounded-full bg-yellow-300 flex items-center justify-center" style={{border :"2px solid green"}}>
          {/* Placeholder for product image */}
          <span className="text-white font-bold">Img</span>
        </div>
        <div>
          <p className="font-medium text-gray-800">Wind Belt For Home</p>
          <p className="text-gray-500 text-sm">Wind Belt For Home</p>
        </div>
      </div>

      {/* Middle Section: Selling Price */}
      <div className="w-1/3 px-6 border-l border-r">
        <p className="text-xs text-gray-500 font-semibold mb-2">SELLING PRICE</p>
        <div className="text-sm text-gray-800">
          <p>
            <span className="text-gray-500">C-code:</span>{" "}
            <span className="font-medium">(201) 555-0124</span>
          </p>
          <p>
            <span className="text-gray-500">Supplier Re-Routing:</span>{" "}
            <span className="font-medium">Not Available</span>
          </p>
        </div>
      </div>

      {/* Right Section: Inventory */}
      <div className="w-1/3 pl-6">
        <p className="text-xs text-gray-500 font-semibold mb-2">INVENTORY</p>
        <p className="text-xl font-bold underline">147</p>
      </div>
    </div>
  );
}

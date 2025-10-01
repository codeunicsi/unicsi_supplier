export default function ProductCard() {
  return (
    <div className="w-[525px] rounded-lg shadow-sm bg-white border border-gray-200 p-8 absolute right-2">
      {/* Title + Subtitle */}
      <div className="text-center mb-6">
        <h2 className="text-[28px] font-bold text-gray-900">
          Your Search Ends Here!
        </h2>
        <p className="text-gray-600 text-sm mt-2">
          When you don’t find your desired product, let us know, we will try our best to source it.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-5">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            type="text"
            placeholder="enter product name"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#943A09] focus:outline-none"
          />
        </div>

        {/* Product Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Category
          </label>
          <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#943A09] focus:outline-none">
            <option value="">select</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="grocery">Grocery</option>
          </select>
        </div>

        {/* Product Image + Product URL */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Image
            </label>
            <input
              type="file"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#943A09] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product URL
            </label>
            <input
              type="url"
              placeholder="https://example.com"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#943A09] focus:outline-none"
            />
          </div>
        </div>

        {/* Expected Clout Price + Select */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expected Clout Price
            </label>
            <input
              type="number"
              placeholder="Enter price"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#943A09] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select
            </label>
            <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#943A09] focus:outline-none">
              <option value="">Select</option>
              <option value="option-1">Option 1</option>
              <option value="option-2">Option 2</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-md font-medium text-white"
          style={{ backgroundColor: "#943A09" }}
        >
          Submit Request
        </button>
      </form>
    </div>
  )
}

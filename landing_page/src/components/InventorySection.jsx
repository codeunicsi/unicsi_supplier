import { useState } from "react"
import { Plus } from "lucide-react"
import inventory1 from "../assets/images/inventory1.svg";
import inventory2 from "../assets/images/inventory1.svg";


const InventorySection = () => {
  const [expandedSections, setExpandedSections] = useState({})

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="bg-gray-50 py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left side - Images */}
          <div className="flex-shrink-0 lg:w-2/5 relative">
            <div className="relative">
              {/* Top image */}
              <div className="overflow-hidden mb-8">
                <img
                  src={inventory1}
                  alt="Warehouse workers managing inventory"
                  className="w-[22rem] h-60 object-cover"
                />
              </div>

              {/* Dotted connector line */}
              <div className="absolute right-8 top-56 w-px h-12 border-r-2 border-dashed border-blue-300"></div>

              {/* Bottom image - positioned with dotted border */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden relative ml-auto w-4/5 border-2 border-dashed border-blue-300">
                <img
                  src={inventory2}
                  alt="Order fulfillment process"
                  className="w-full h-50 object-cover"
                />
                {/* Dimensions label */}
                <div className="absolute bottom-4 left-4">
                  <div className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium">463.65 × 290.46</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="flex-1 lg:w-3/5 space-y-8">
            {/* Main heading */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Top India-Based
                <br />
                Inventory
              </h1>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <p className="text-gray-600 text-lg leading-relaxed">
                90% of products are stocked in U.S. warehouses, and our suppliers include top 500 U.S. brands for fast,
                reliable fulfillment. 90% of products are stocked in U.S. warehouses, and our suppliers include top 500
                U.S. brands for fast, reliable fulfillment.
              </p>
            </div>

            {/* Expandable sections */}
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <button
                  onClick={() => toggleSection("selection")}
                  className="flex items-center justify-between w-full text-left group"
                >
                  <span className="text-xl font-semibold text-gray-900">Expert Product Selection</span>
                  <Plus
                    className={`w-6 h-6 text-gray-600 transition-transform duration-200 ${
                      expandedSections.selection ? "rotate-45" : ""
                    }`}
                  />
                </button>
                {expandedSections.selection && (
                  <div className="mt-4 text-gray-600 leading-relaxed">
                    Our expert team carefully curates products from trusted suppliers, ensuring quality and reliability
                    for your business needs.
                  </div>
                )}
              </div>

              <div className="border-b border-gray-200 pb-4">
                <button
                  onClick={() => toggleSection("automation")}
                  className="flex items-center justify-between w-full text-left group"
                >
                  <span className="text-xl font-semibold text-gray-900">Full Automation</span>
                  <Plus
                    className={`w-6 h-6 text-gray-600 transition-transform duration-200 ${
                      expandedSections.automation ? "rotate-45" : ""
                    }`}
                  />
                </button>
                {expandedSections.automation && (
                  <div className="mt-4 text-gray-600 leading-relaxed">
                    Streamline your operations with our fully automated inventory management system, reducing manual
                    work and increasing efficiency.
                  </div>
                )}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button className="bg-amber-800 hover:bg-amber-900 text-white font-semibold px-8 py-3 rounded-full transition-colors duration-200 flex items-center gap-2">
                Learn More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InventorySection



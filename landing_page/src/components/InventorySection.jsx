"use client"

import { useState } from "react"
import inventory1 from "../assets/images/Inventory.png"
import inventory2 from "../assets/images/Inventory-2.png"
import { Plus } from "../assets/svg"

const InventorySection = () => {
  const [expandedSections, setExpandedSections] = useState({})

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="bg-gray-50 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          {/* Left side - Images */}
          <div className="w-full lg:w-2/5 lg:flex-shrink-0 relative">
            <div className="relative">
              {/* Top image */}
              <div className="overflow-hidden mb-4 sm:mb-6 md:mb-8">
                <img
                  src={inventory1 || "/placeholder.svg"}
                  alt="Warehouse workers managing inventory"
                  className="w-full sm:w-72 md:w-80 lg:w-96 h-40 sm:h-48 md:h-56 lg:h-60 object-cover"
                />
              </div>

              {/* Dotted connector line */}
              <div className="hidden md:block absolute right-6 md:right-8 top-48 md:top-56 w-px h-8 md:h-12 border-r-2 border-dashed border-blue-300"></div>

              {/* Bottom image - positioned with dotted border */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden relative w-full sm:w-4/5 md:w-5/6 lg:w-4/5 ml-auto border-2 border-dashed border-blue-300">
                <img
                  src={inventory2 || "/placeholder.svg"}
                  alt="Order fulfillment process"
                  className="w-full h-40 sm:h-48 md:h-56 lg:h-auto object-cover"
                />
                {/* Dimensions label */}
                <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4">
                  <div className="bg-blue-500 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium">
                    463.65 × 290.46
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="w-full lg:w-3/5 space-y-6 sm:space-y-7 md:space-y-8">
            {/* Main heading */}
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Top India-Based
                <br />
                Inventory
              </h1>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                90% of products are stocked in U.S. warehouses, and our suppliers include top 500 U.S. brands for fast,
                reliable fulfillment. 90% of products are stocked in U.S. warehouses, and our suppliers include top 500
                U.S. brands for fast, reliable fulfillment.
              </p>
            </div>

            {/* Expandable sections */}
            <div className="space-y-3 sm:space-y-4">
              <div className="border-b border-gray-200 pb-3 sm:pb-4">
                <button
                  onClick={() => toggleSection("selection")}
                  className="flex items-center justify-between w-full text-left group"
                >
                  <span className="text-lg sm:text-xl font-semibold text-gray-900">Expert Product Selection</span>
                  <Plus
                    className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-600 transition-transform duration-200 flex-shrink-0 ${expandedSections.selection ? "rotate-45" : ""
                      }`}
                  />
                </button>
                {expandedSections.selection && (
                  <div className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
                    Our expert team carefully curates products from trusted suppliers, ensuring quality and reliability
                    for your business needs.
                  </div>
                )}
              </div>

              <div className="border-b border-gray-200 pb-3 sm:pb-4">
                <button
                  onClick={() => toggleSection("automation")}
                  className="flex items-center justify-between w-full text-left group"
                >
                  <span className="text-lg sm:text-xl font-semibold text-gray-900">Full Automation</span>
                  <Plus
                    className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-600 transition-transform duration-200 flex-shrink-0 ${expandedSections.automation ? "rotate-45" : ""
                      }`}
                  />
                </button>
                {expandedSections.automation && (
                  <div className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
                    Streamline your operations with our fully automated inventory management system, reducing manual
                    work and increasing efficiency.
                  </div>
                )}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2 sm:pt-3 md:pt-4">
              <button className="bg-amber-800 hover:bg-amber-900 text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-full transition-colors duration-200 flex items-center gap-2 text-sm sm:text-base">
                Learn More
                <svg className="w-4 h-4" fill="none" stroke="#fff" viewBox="0 0 24 24">
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

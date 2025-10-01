// components/products/Tabs.tsx
import { useState } from "react"

// const tabItems = ["Push to Shopify", "Inventory Request"]

export default function Tabs({ tabItems }) {
  const [active, setActive] = useState(tabItems[0])

  return (
    <div className="flex justify-start gap-4 border-b mb-4">
      {tabItems.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`px-4 py-2 text-sm font-medium transition-all ${
            active === tab
              ? "border-b-2 border-[#943A09] text-[#943A09]"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

// components/layout/Sidebar.jsx
import { useState } from "react"
import { Truck, Package, BarChart2, CreditCard, File } from "lucide-react"
import Home from "../../assets/svg/Home"
import FileText from "../../assets/svg/FileText"
import ShoppingBag from "../../assets/svg/ShoppingBag"
import RightIcon from "../../assets/icons/rightIcon.svg"
import UnicseLogo from "../../assets/svg/UnicseLogo"

const menuItems = [
  { name: "Home", icon: <Home size={18} />, active: false },
  { name: "Manage Orders", icon: <FileText size={18} />, active: false },
  { name: "Manage NDR", icon: <ShoppingBag size={18} />, active: false },
  { name: "Supplier Re-Routing", icon: <Truck size={18} />, active: false },
  { name: "Source a Product", icon: <Package size={18} />, active: false },
  { name: "RTO Intelligence", icon: <BarChart2 size={18} />, active: false },
  { name: "Manage Products", icon: <Package size={18} />, active: true },
  { name: "Reports", icon: <FileText size={18} />, active: false },
  { name: "Payments", icon: <CreditCard size={18} />, active: false },
  { name: "Value Added Services", icon: <File size={18} />, active: false },
  { name: "Clauts", icon: <File size={18} />, active: false },
  { name: "Supports", icon: <File size={18} />, active: false },
  { name: "Help", icon: <File size={18} />, active: false },
  { name: "GST Invoice", icon: <File size={18} />, active: false },
]

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="flex">
      {/* Toggle button */}
      <div
        className="absolute top-[86px] z-50 transition-all duration-300 ease-in-out"
        style={{ left: isOpen ? "348px" : "80px" }} // move button position
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-[#FFFFFF] rounded-[50%] shadow-md transition-all duration-300 ease-in-out"
          style={{ border: "0.5px solid #943A09" }}
        >
          <img src={RightIcon} alt="Toggle Icon" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-screen bg-[#F0E6E6] border-r shadow-lg flex flex-col mt-2 ml-4 transition-all duration-300 ease-in-out
          ${isOpen ? "w-[348px]" : "w-[80px]"}
        `}
        style={{ borderRadius: "28px", border: "0.5px solid #F0E6E6" }}
      >
        <div
          className={`px-4 pb-6 pt-[66px] pl-[110px] text-xl font-bold text-blue-600 transition-opacity duration-300 ease-in-out whitespace-nowrap ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <UnicseLogo className="inline-block mr-2" />
          UNICSI
        </div>
        <nav className="flex-1 px-2 space-y-1">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              className={`flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm font-medium transition ${
                item.active
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              {/* hide/show labels */}
              <span className={`${isOpen ? "inline" : "hidden"}`}>
                {item.name}
              </span>
            </button>
          ))}
        </nav>
      </aside>
    </div>
  )
}

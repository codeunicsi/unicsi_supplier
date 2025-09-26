// components/layout/Sidebar.jsx
import { Home, ShoppingBag, FileText, Truck, Package, BarChart2, CreditCard, File } from "lucide-react"

const menuItems = [
  { name: "Home", icon: <Home size={18} />, active: false },
  { name: "Manage Orders", icon: <ShoppingBag size={18} />, active: false },
  { name: "Manage NDR", icon: <FileText size={18} />, active: false },
  { name: "Supplier Re-Routing", icon: <Truck size={18} />, active: false },
  { name: "Source a Product", icon: <Package size={18} />, active: false },
  { name: "RTO Intelligence", icon: <BarChart2 size={18} />, active: false },
  { name: "Manage Products", icon: <Package size={18} />, active: true }, // active page
  { name: "Reports", icon: <FileText size={18} />, active: false },
  { name: "Payments", icon: <CreditCard size={18} />, active: false },
  { name: "GST Invoice", icon: <File size={18} />, active: false },
]

export default function Sidebar() {
  return (
    <aside className="w-56 h-screen bg-[#F0E6E6] border-r shadow-lg flex flex-col backdrop-blur-3xl drop-shadow-lg mt-2 ml-2" style={{ borderRadius: "28px", border: "0.5px solid #F0E6E6", }}>
      <div className="px-4 py-6 text-xl font-bold text-blue-600">Unicsi</div>
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
            {item.name}
          </button>
        ))}
      </nav>
    </aside>
  )
}

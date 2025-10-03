// components/layout/Sidebar.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Truck, Package, BarChart2, CreditCard, File } from "lucide-react";
import Home from "../../assets/svg/Home";
import FileText from "../../assets/svg/FileText";
import ShoppingBag from "../../assets/svg/ShoppingBag";
import RightIcon from "../../assets/icons/rightIcon.svg";
import UnicseLogo from "../../assets/svg/UnicseLogo";
import Logo from "../../assets/images/Logo.jpeg";
import {
  Profile,
  Faq,
  Human,
  Setting,
  ReportOutline,
  Payment,
  BusinessProductSupplier,
  RecruitmentManagement,
  Service,
  Cube,
  Help,
  Support,
  TrainingClass,
} from "../../assets/svg/index";

// components/layout/Sidebar.jsx
export default function Sidebar({ activePage, setActivePage }) {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { name: "Home", icon: <Home size={18} />, path: "/" },
    { name: "Manage Orders", icon: <Cube size={18} />, path: "/order" },
    { name: "Manage RTO / Returns", icon: <ReportOutline size="1.5rem" />, path: "/rto-returns/overview" },
    { name: "Product Requirement", icon: <RecruitmentManagement size={18} />, path: "/listings/new" },
    { name: "Manage Products", icon: <Package size={18} /> , path: "/manage-products"},
    { name: "Manage NDR", icon: <ShoppingBag size={18} />, path: "/manage-ndr" },
    {
      name: "Supplier Re-Routing",
      icon: <BusinessProductSupplier size="1.5rem" />,
      path: "/supplier-re-routing"
    },
    { name: "Source a Product", icon: <Package size={18} />, path: "/source-product" },
    { name: "RTO Intelligence", icon: <BarChart2 size={18} />, path: "/rto-intelligence" },
    
    
    { name: "Reports", icon: <FileText size={18} />, path: "/reports" },
    { name: "Invoices", icon: <File size={18} />, path: "/invoices" },
    { name: "Payments", icon: <Payment size="1.5rem" />, path: "/payments" },
    { name: "Service Requests", icon: <Service size="1.5rem" />, path: "/service-requests" },
    { name: "Team Management", icon: <Human size="1.5rem" />, path: "/team-management" },
    { name: "User Management", icon: <CreditCard size={18} />, path: "/user-management" },
    { name: "Recruitment Management", icon: <RecruitmentManagement size={18} />, path: "/recruitment-management" },
    { name: "Profile", icon: <Profile size="1.5rem" />, path: "/profile" },
   
    { name: "Clauts", icon: <TrainingClass size={18} />, path: "/clauts" },
    { name: "Supports", icon: <Support size={18} />, path: "/supports" },
    { name: "Setting", icon: <Setting size={18} />, path: "/setting" },
    { name: "Help", icon: <Help size={18} />, path: "/help" },
    { name: "Faq", icon: <Faq className="w-4 h-4" />, path: "/faq" },
  ];

  return (
    <div className="flex">
      {/* Toggle button */}
      <div
        className="absolute top-[86px] z-50 transition-all duration-300 ease-in-out"
        style={{ left: isOpen ? "348px" : "80px" }}
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
        className={`fixed lg:static top-0 left-0  bg-[#F0E6E6] border-r shadow-lg flex flex-col mt-2 ml-4 transition-all duration-300 ease-in-out
          ${isOpen ? "w-[348px]" : "w-[80px]"} h-auto
        `}
        style={{ borderRadius: "28px", border: "0.5px solid #F0E6E6" }}
      >
        <div
          className={`px-4 pb-6 pt-[66px] pl-[110px] text-xl font-bold text-blue-600 transition-opacity duration-300 ease-in-out whitespace-nowrap ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={Logo}
            alt="Unicsi Logo"
            className="w-12 h-auto inline-block mr-2 rounded-full"
          />
          UNICSI
        </div>

        <nav className="flex-1 px-2 space-y-1">
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className={`flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm font-medium transition ${
                location.pathname === item.path
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <button
                key={idx}
                onClick={() => setActivePage(item.name)}
                className={`flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm font-medium transition ${
                  activePage === item.name
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                <span className={`${isOpen ? "inline" : "hidden"}`}>
                  {item.name}
                </span>
              </button>
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  );
}

// components/layout/Sidebar.jsx
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
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
  RetoIntelligence,
  ManageProducts,
  GstIcon,
} from "../../assets/svg/index";

// components/layout/Sidebar.jsx
export default function Sidebar({ activePage, setActivePage }) {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const menuItems = [
    {
      name: "Home",
      icon: <Home size={24} activePage={activePage} />,
      path: "/",
    },
    {
      name: "Manage Orders",
      icon: <FileText size={24} activePage={activePage} />,
      path: "/order",
    },
    {
      name: "Manage NDR",
      icon: <ShoppingBag size={24} activePage={activePage} />,
      path: "/manage-ndr",
    },
    {
      name: "Supplier Re-Routing",
      icon: <BusinessProductSupplier size={24} activePage={activePage} />,
      path: "/supplier-re-routing",
    },
    {
      name: "Source a Product",
      icon: <Cube size={24} activePage={activePage} />,
      path: "/source-product",
    },
    {
      name: "RTO Intelligence",
      icon: <RetoIntelligence size={24} activePage={activePage} />,
      path: "/rto-intelligence",
    },
    {
      name: "Manage Products",
      icon: <ManageProducts size={24} activePage={activePage} />,
      path: "/manage-products",
    },
    {
      name: "Reports",
      icon: <FileText size={24} activePage={activePage} />,
      path: "/reports",
    },
    {
      name: "Payments",
      icon: <Payment size={24} activePage={activePage} />,
      path: "/payments",
    },
    {
      name: "GST Invoice",
      icon: <GstIcon size={24} activePage={activePage} />,
      path: "/invoices",
    },

    {
      name: "Value Added Services",
      icon: <Service size={24} activePage={activePage} />,
      path: "/service-requests",
    },
    {
      name: "Clouts",
      icon: <TrainingClass size={24} activePage={activePage} />,
      path: "/clauts",
    },
    {
      name: "Supports",
      icon: <Support size={24} activePage={activePage} />,
      path: "/supports",
    },

    {
      name: "Help",
      icon: <Help size={24} activePage={activePage} />,
      path: "/help",
    },
    // {
    //   name: "Team Management",
    //   icon: <Human size={24} activePage={activePage} />,
    //   path: "/team-management",
    // },
    // {
    //   name: "User Management",
    //   icon: <CreditCard size={24} activePage={activePage} />,
    //   path: "/user-management",
    // },
    // {
    //   name: "Recruitment Management",
    //   icon: <RecruitmentManagement size={24} activePage={activePage} />,
    //   path: "/recruitment-management",
    // },
    // {
    //   name: "Profile",
    //   icon: <Profile size={24} activePage={activePage} />,
    //   path: "/profile",
    // },
    // {
    //   name: "Manage RTO / Returns",
    //   icon: <ReportOutline size="1.5rem" activePage={activePage} />,
    //   path: "/rto-returns/overview",
    // },
    // {
    //   name: "Product Requirement",
    //   icon: <RecruitmentManagement size={24} activePage={activePage} />,
    //   path: "/listings/new",
    // },
    // {
    //   name: "Source a Product",
    //   icon: <Package size={24} activePage={activePage} />,
    //   path: "/source-product",
    // },
    // {
    //   name: "RTO Intelligence",
    //   icon: <BarChart2 size={24} activePage={activePage} />,
    //   path: "/rto-intelligence",
    // },
    // {
    //   name: "Setting",
    //   icon: <Setting size={24} activePage={activePage} />,
    //   path: "/setting",
    // },
    // {
    //   name: "Faq",
    //   icon: <Faq className="w-4 h-4" activePage={activePage} />,
    //   path: "/faq",
    // },
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const currentItem = menuItems.find((item) => item.path === currentPath);
    if (currentItem) {
      setActivePage(currentItem.name);
    }
  }, [location, setActivePage, menuItems]);

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
        className={`fixed lg:static top-0 left-0 bg-[#F0E6E6] border-r shadow-lg flex flex-col mt-2 ml-4 transition-all duration-300 ease-in-out
          ${
            isOpen ? "w-[348px]" : "w-[80px]"
          } h-auto overflow-y-auto hide-scrollbar backdrop-blur-xs drop-shadow-md rounded-tl-[28px] rounded-tr-[28px]
        `}
      >
        <div
          className={`flex items-center gap-2 px-4 pb-6 pt-[66px] transition-all duration-300 ease-in-out
          }`}
        >
          <img
            src={Logo}
            alt="Unicsi Logo"
            className="w-12 h-12 rounded-full inline-block mr-2"
          />
          <span
            className={`text-xl font-bold text-[#000000] whitespace-nowrap transition-opacity duration-300 ease-in-out ${
              isOpen ? "opacity-100" : "opacity-0 hidden"
            }`}
          >
            UNICSI
          </span>
        </div>

        <nav className="flex-1 px-2 space-y-1">
          {menuItems.map((item, idx) => (
            <NavLink
              key={idx}
              onClick={() => setActivePage(item.name)}
              to={item.path}
              className={`flex items-center gap-2 w-[293px] px-4 py-5 rounded-xl transition
              ${
                activePage === item.name
                  ? "bg-[#943A09] text-white cursor-pointer"
                  : "hover:bg-[#943A09] hover:text-white text-white"
              }`}
            >
              {item.icon}
              <span
                className={`${
                  isOpen ? "inline" : "hidden"
                } text-[16px] font-medium leading-[100%] ${
                  activePage === item.name ? "text-white" : "text-[#000000]"
                }`}
              >
                {item.name}
              </span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </div>
  );
}

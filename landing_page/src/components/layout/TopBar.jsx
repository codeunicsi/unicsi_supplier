// components/layout/TopBar.jsx
import notificationIcon from "../../assets/icons/ic_notifications.svg";
import { Bell, HelpCircle, Search } from "lucide-react";
import CameraIcon from "../../assets/svg/CameraSvg";
import SearchIcon from "../../assets/svg/SearchIcon";
import Button from "../../ui/Button";
// import rightIcon from "../../assets/icons/rightIcon.svg"

export default function TopBar() {
  return (
    <header
      className="flex items-center justify-end bg-white pl-4 pr-8 py-3 my-4 mx-6 shadow-lg relative"
      style={{ borderRadius: "20px" }}
    >
      <div className="absolute inset-0 flex items-center justify-start pointer-events-none left-2">
        <h1 className="text-lg font-bold">Manage Products</h1>
        {/* <img src={rightIcon} alt="Notifications" className="w-5 h-5"/> */}
      </div>

      {/* Search */}
      <div
        className="relative w-1/2 shadow-sm mr-3"
        style={{ borderRadius: "3.62px" }}
      >
        {/* Search Icon */}
        <SearchIcon
          className="absolute left-3 top-2.5 text-gray-400"
          size={18}
        />

        {/* Input */}
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-9 pr-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        {/* Camera + Button Section */}
        <div
          className="absolute top-0 flex items-center justify-end gap-3 px-2"
          style={{ width: "200px", height: "40px", right: "0px" }}
        >
          <CameraIcon className="w-5 h-5 text-gray-400" />
          <button
            className="text-white px-9 py-2 rounded-full font-medium transition-colors font-Montserrat SemiBold text-[14px]"
            style={{
              backgroundColor: "#943A09",
            }}
          >
            Sign up
          </button>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <HelpCircle size={20} className="text-gray-600" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 relative">
          {/* <Bell size={20} className="text-gray-600" /> */}
          <img src={notificationIcon} alt="Notifications" className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/40"
            alt="User"
            className="w-8 h-8 rounded-full border"
          />
          <span className="text-sm font-medium text-gray-700">Muskan</span>
        </div>
      </div>
    </header>
  );
}

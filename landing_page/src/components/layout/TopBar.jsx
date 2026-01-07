// components/layout/TopBar.jsx
import notificationIcon from "../../assets/icons/ic_notifications.svg";
import { Bell, HelpCircle, Search } from "lucide-react";
import { CameraIcon, SearchIcon } from "../../assets/svg/index";
import Button from "../../ui/Button";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
// import rightIcon from "../../assets/icons/rightIcon.svg"

export default function TopBar() {
  return (
    <header
      className="flex items-center justify-end bg-[] pl-4 mr-6 pr-8 py-8 my-4 mb-10 h-[91px] shadow-lg relative"
      style={{ borderRadius: "20px", border: "0.2px solid #00000040" }}
    >


      <div className="absolute inset-0 flex items-center justify-start pointer-events-none left-2 pl-2">
        <div className="flex items-center gap-2 mr-6">
          <h1 className="text-lg font-bold text-[18px] leading-[120%]">Manage Products</h1>
          <svg
            width="13"
            height="12"
            viewBox="0 0 13 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.9375 9.91195L8.15841 6.69104C8.5388 6.31065 8.5388 5.68821 8.15841 5.30783L4.9375 2.08691"
              stroke="#0A0502"
              stroke-width="1.11151"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

      </div>

      {/* Search */}
      <div className="flex items-center w-full max-w-[445px] h-[52px] rounded-full shadow-sm px-4 mr-8 drop-shadow-xl/25">
        {/* Search Icon */}
        <Search className="text-gray-400 w-5 h-5 mr-2" />

        {/* Input Field */}
        <input
          type="text"
          placeholder="Find the product you're looking for"
          className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm"
        />

        {/* Camera Icon */}

        <CameraIcon className="w-5 h-5 opacity-70 mx-3" color="#202020" />


        {/* Search Button */}
        <button className="bg-[#943A09] text-white font-semibold text-sm px-6 py-2 rounded-full">
          Search
        </button>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        <HelpCircle size={20} className="text-gray-600" />

        <button className="p-2 rounded-full hover:bg-gray-100 relative">
          {/* <Bell size={20} className="text-gray-600" /> */}
          <img src={notificationIcon} alt="Notifications" className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        {/* <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/40"
            alt="User"
            className="w-8 h-8 rounded-full border"
          />
          <span className="text-sm font-medium text-gray-700">Muskan</span>
        </div> */}

        {profileDropDown()}
      </div>
    </header>
  );
}


//profile drop down
function profileDropDown() {
  return (
    <Menu as="div" className="relative inline-block" style={{ border: "2px solid #ccc" }}>
      <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring-1 inset-ring-white/5 hover:bg-white/20">

        <img
          src="https://i.pravatar.cc/40"
          alt="User"
          className="w-8 h-8 rounded-full border"
        />
        <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-[8rem] origin-top-right rounded-md bg-[#943A09] outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">

          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-white data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
            >
              Profile
            </a>
          </MenuItem>
          <form action="#" method="POST">
            <MenuItem>
              <button
                type="submit"
                className="block w-full px-4 py-2 text-left text-sm text-white data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
              >
                Sign out
              </button>
            </MenuItem>
          </form>
        </div>
      </MenuItems>
    </Menu>
  )
}

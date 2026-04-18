// components/layout/TopBar.jsx
"use client";

import notificationIcon from "../../assets/icons/ic_notifications.svg";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../../auth/AuthContext";

const menuItems = [
  { name: "Manage Orders", path: "/order" },
  { name: "Manage RTO / Returns", path: "/rto-returns" },
  { name: "Penalties", path: "/penalties" },
  { name: "Add Product", path: "/products" },
  { name: "Product Requirement", path: "/product-requirement" },
  { name: "Manage Products", path: "/manage-products" },
  { name: "Reports", path: "/reports" },
  { name: "Payments", path: "/payments" },
  { name: "Profile", path: "/profile" },
  { name: "Setting", path: "/settings" },
  { name: "FAQs", path: "/faqs" },
  { name: "Supports", path: "/supports" },
];

const GRADIENT = "linear-gradient(135deg, #0097b2 0%, #7ed957 100%)";
const GRADIENT_HOVER = "linear-gradient(135deg, #007a91 0%, #65c040 100%)";

// Stable avatar URL — seeded on the user's identifier so it never changes
const AVATAR_URL =
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

function usePageName() {
  if (typeof window === "undefined") return "Dashboard";
  const pathname = window.location.pathname;
  const match = menuItems.find((item) => item.path === pathname);
  return match ? match.name : "Dashboard";
}

export default function TopBar({ onMobileMenuClick }) {
  const pageName = usePageName();

  return (
    <header
      className="my-2 mb-4 box-border flex min-h-[56px] w-full min-w-0 max-w-full items-center justify-between gap-2 bg-white py-2 pl-3 pr-3 sm:my-4 sm:mb-10 sm:h-[72px] sm:py-0 sm:pl-6 sm:pr-6"
      style={{
        borderRadius: "16px",
        border: "1px solid #e0f4f7",
        boxShadow:
          "0 2px 12px 0 rgba(0,151,178,0.08), 0 1px 3px 0 rgba(0,0,0,0.04)",
      }}
    >
      <div className="flex min-w-0 flex-1 items-center gap-1.5 sm:gap-2">
        {typeof onMobileMenuClick === "function" ? (
          <button
            type="button"
            aria-label="Open menu"
            onClick={onMobileMenuClick}
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-[#0097b2] transition-colors hover:bg-[#f0fafc] max-[899px]:flex"
            style={{ borderColor: "#b8e8f0" }}
          >
            <MenuIcon sx={{ fontSize: 22 }} />
          </button>
        ) : null}

        {/* Breadcrumb — truncates on narrow screens */}
        <div className="flex min-w-0 flex-1 items-center gap-1.5 overflow-hidden sm:gap-2">
          <span
            className="shrink-0 text-[11px] font-medium tracking-wide sm:text-[13px]"
            style={{ color: "#0097b2", letterSpacing: "0.04em" }}
          >
            Dashboard
          </span>
          <svg
            className="shrink-0"
            width="12"
            height="12"
            viewBox="0 0 13 12"
            fill="none"
            aria-hidden
          >
            <path
              d="M4.9375 9.91195L8.15841 6.69104C8.5388 6.31065 8.5388 5.68821 8.15841 5.30783L4.9375 2.08691"
              stroke="#0097b2"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            className="min-w-0 truncate text-[14px] font-semibold sm:text-[16px]"
            style={{ color: "#000000", letterSpacing: "-0.01em" }}
            title={pageName}
          >
            {pageName}
          </span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
        {/* Notification Bell */}
        <button
          type="button"
          className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-150 sm:h-9 sm:w-9"
          style={{
            background: "#f0fafc",
            border: "1px solid #b8e8f0",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = GRADIENT;
            e.currentTarget.style.border = "1px solid transparent";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#f0fafc";
            e.currentTarget.style.border = "1px solid #b8e8f0";
          }}
        >
          <img
            src={notificationIcon}
            alt="Notifications"
            className="w-[18px] h-[18px]"
          />
          <span
            className="absolute top-[7px] right-[7px] w-[7px] h-[7px] rounded-full"
            style={{ background: "#7ed957", border: "1.5px solid #fff" }}
          />
        </button>

        <div
          className="mx-0.5 hidden h-8 w-px shrink-0 sm:mx-1 sm:block"
          style={{ background: "#d0eef3" }}
        />

        <ProfileDropDown />
      </div>
    </header>
  );
}

function ProfileDropDown() {
  const { logout } = useAuth();

  return (
    <Menu as="div" className="relative inline-block shrink-0">
      <MenuButton
        className="flex items-center gap-1 rounded-xl px-1.5 py-1 transition-all duration-200 outline-none sm:gap-2 sm:px-3 sm:py-1.5"
        style={{
          background: GRADIENT,
          border: "1px solid transparent",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = GRADIENT_HOVER;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = GRADIENT;
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="avatarGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0097b2" />
              <stop offset="100%" stopColor="#7ed957" />
            </linearGradient>
          </defs>
          <circle cx="14" cy="14" r="14" fill="url(#avatarGradient)" />
          <path
            d="M14 16c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"
            fill="#ffffff"
            opacity="0.9"
          />
          <path
            d="M6 25c0-4.418 3.582-8 8-8s8 3.582 8 8v1H6v-1z"
            fill="#ffffff"
            opacity="0.9"
          />
        </svg>
        <ChevronDownIcon
          className="hidden h-4 w-4 sm:block"
          style={{ color: "#ffffff" }}
        />
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 z-[1200] mt-2 w-44 max-w-[min(100vw-1.5rem,11rem)] origin-top-right rounded-xl py-1 outline-none transition data-closed:scale-95 data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in sm:max-w-none"
        style={{
          background: "#fff",
          border: "1px solid #d0eef3",
          boxShadow: "0 8px 24px rgba(0,151,178,0.12)",
        }}
      >
        <MenuItem>
          {({ focus }) => (
            <a
              href="/profile"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 16px",
                fontSize: "0.875rem",
                color: focus ? "#fff" : "#000",
                background: focus ? GRADIENT : "transparent",
                fontWeight: focus ? 600 : 400,
                borderRadius: "8px",
                margin: "0 4px",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
              Profile
            </a>
          )}
        </MenuItem>

        <div
          className="mx-3 my-1"
          style={{ height: "1px", background: "#e0f4f7" }}
        />

        <MenuItem>
          {({ focus }) => (
            <button
              onClick={() => logout()}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 16px",
                fontSize: "0.875rem",
                textAlign: "left",
                color: focus ? "#fff" : "#000",
                background: focus ? GRADIENT : "transparent",
                fontWeight: focus ? 600 : 400,
                borderRadius: "8px",
                margin: "0 4px",
                width: "calc(100% - 8px)",
                cursor: "pointer",
                border: "none",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Log out
            </button>
          )}
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}

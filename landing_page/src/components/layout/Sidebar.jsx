"use client";

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import SettingsIcon from "@mui/icons-material/Settings";
import { fetchProfile } from "../../services/prodile/profile.service";
import logo from "../../assets/images/logo.png";

const DRAWER_WIDTH = 280;
const DRAWER_WIDTH_COLLAPSED = 80;
const GRADIENT = "linear-gradient(135deg, #0097b2 0%, #7ed957 100%)";
const GRADIENT_HOVER = "linear-gradient(135deg, #007a91 0%, #65c040 100%)";

const menuItems = [
  { name: "Manage Orders", icon: ReceiptLongIcon, path: "/order" },
  {
    name: "Manage RTO / Returns",
    icon: AssignmentReturnIcon,
    path: "/rto-returns",
  },
  { name: "Add Product", icon: AddShoppingCartIcon, path: "/products" },
  {
    name: "Product Requirement",
    icon: PlaylistAddIcon,
    path: "/product-requirement",
  },
  { name: "Manage Products", icon: InventoryIcon, path: "/manage-products" },
  { name: "Reports", icon: AnalyticsIcon, path: "/reports" },
  { name: "Payments", icon: AccountBalanceWalletIcon, path: "/payments" },
  { name: "Profile", icon: AccountCircleIcon, path: "/profile" },
  { name: "Setting", icon: SettingsIcon, path: "/settings" },
  { name: "FAQs", icon: HelpOutlineIcon, path: "/faqs" },
  { name: "Supports", icon: ContactSupportIcon, path: "/supports" },
];

const pendingMenuItems = [
  { name: "Profile", icon: AccountCircleIcon, path: "/profile" },
  { name: "Setting", icon: SettingsIcon, path: "/settings" },
  { name: "FAQs", icon: HelpOutlineIcon, path: "/faqs" },
  { name: "Supports", icon: ContactSupportIcon, path: "/supports" },
];

function NavItem({ item, isActive, open = true }) {
  const IconComponent = item.icon;

  return (
    <ListItemButton
      href={item.path}
      component="a"
      selected={isActive}
      sx={{
        borderRadius: 2,
        mb: 0.5,
        cursor: "pointer",
        justifyContent: open ? "flex-start" : "center",
        px: open ? 2 : 1,
        py: 1.5,
        transition: "background 0.2s ease",
        minHeight: open ? "auto" : 56,
        borderLeft: "3px solid transparent",

        // ── Default state ──────────────────────────────────────────────
        background: "transparent",
        "& .MuiListItemIcon-root svg": {
          fill: "#1a1a1a !important",
          color: "#1a1a1a !important",
          fontSize: "1.3rem",
          transition: "fill 0.15s ease",
        },
        "& .MuiListItemText-primary": {
          color: "#1a1a1a",
          fontWeight: 500,
          fontSize: "0.95rem",
        },

        // ── Hover state ────────────────────────────────────────────────
        "&:hover": {
          background: GRADIENT_HOVER,
          borderLeft: "3px solid #7ed957",
          "& .MuiListItemIcon-root svg": {
            fill: "#ffffff !important",
            color: "#ffffff !important",
          },
          "& .MuiListItemText-primary": {
            color: "#ffffff",
            fontWeight: 600,
          },
        },

        // ── Selected / Active state (MUI .Mui-selected) ────────────────
        "&.Mui-selected": {
          background: GRADIENT,
          borderLeft: "3px solid #7ed957",
          "& .MuiListItemIcon-root svg": {
            fill: "#ffffff !important",
            color: "#ffffff !important",
          },
          "& .MuiListItemText-primary": {
            color: "#ffffff",
            fontWeight: 700,
          },
        },

        // ── Selected + Hover (keep gradient, don't go transparent) ─────
        "&.Mui-selected:hover": {
          background: GRADIENT_HOVER,
          borderLeft: "3px solid #7ed957",
        },

        "& .MuiTouchRipple-root": { color: "rgba(255,255,255,0.15)" },
      }}
      title={!open ? item.name : ""}
    >
      <ListItemIcon
        sx={{
          minWidth: open ? 40 : "auto",
          justifyContent: "center",
        }}
      >
        <IconComponent />
      </ListItemIcon>

      {open && (
        <ListItemText
          primary={item.name}
          primaryTypographyProps={{
            sx: {
              whiteSpace: "nowrap",
              transition: "color 0.15s ease",
            },
          }}
        />
      )}
    </ListItemButton>
  );
}

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isProfileCompleted, setIsProfileCompleted] = useState(null);
  const { pathname } = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const toggleDrawer = () => {
    if (isMobile) setMobileOpen((v) => !v);
    else setOpen((v) => !v);
  };

  useEffect(() => {
    async function load() {
      const res = await fetchProfile();
      setIsProfileCompleted(res.data?.data?.account_status);
    }
    load();
  }, []);

  const items =
    isProfileCompleted === null
      ? []
      : isProfileCompleted === "active"
        ? menuItems
        : pendingMenuItems;

  const sidebarContent = (showOpen = true) => (
    <Box
      sx={{
        width: showOpen ? (open ? DRAWER_WIDTH : DRAWER_WIDTH_COLLAPSED) : 280,
        transition: "width 0.3s ease-in-out",
        bgcolor: "#ffffff",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        borderRight: "1.5px solid #e0f4f7",
        overflowY: "auto",
        overflowX: "hidden",
        boxShadow: "2px 0 16px rgba(0,151,178,0.07)",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "space-between" : "center",
          borderBottom: "1.5px solid #e0f4f7",
          minHeight: 80,
        }}
      >
        {open && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 2 }}>
            <img
              src={logo}
              alt="Logo"
              style={{ width: "auto", height: 40, objectFit: "contain" }}
            />
          </Box>
        )}
        <IconButton
          onClick={toggleDrawer}
          size="small"
          sx={{
            color: "#0097b2",
            border: "1.5px solid #0097b2",
            borderRadius: "10px",
            transition: "all 0.2s",
            "& path": { fill: "#0097b2 !important" },
            "&:hover": {
              background: GRADIENT,
              color: "#fff",
              borderColor: "transparent",
              "& path": { fill: "#fff !important" },
            },
          }}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      {/* Nav */}
      <List sx={{ flex: 1, px: 1, pt: 1 }}>
        {items.map((item, idx) => (
          <NavItem
            key={idx}
            item={item}
            isActive={
              !!pathname &&
              (pathname === item.path || pathname.startsWith(item.path + "/"))
            }
            open={showOpen ? open : true}
          />
        ))}
      </List>

      <Box sx={{ height: 4, background: GRADIENT, flexShrink: 0 }} />
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={toggleDrawer}
            sx={{ p: 2, color: "#0097b2", "&:hover": { color: "#7ed957" } }}
          >
            <MenuIcon />
          </IconButton>

          <Drawer
            anchor="left"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            sx={{
              "& .MuiDrawer-paper": {
                width: 280,
                bgcolor: "#ffffff",
                border: "none",
              },
            }}
          >
            <Box
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1.5px solid #e0f4f7",
              }}
            >
              <img
                src={logo}
                alt="Logo"
                style={{ width: 40, height: 40, objectFit: "contain" }}
              />
              <IconButton
                onClick={() => setMobileOpen(false)}
                size="small"
                sx={{
                  color: "#0097b2",
                  border: "1.5px solid #0097b2",
                  borderRadius: "10px",
                  "&:hover": {
                    background: GRADIENT,
                    color: "#fff",
                    borderColor: "transparent",
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <List sx={{ px: 1, pt: 1 }}>
              {items.map((item, idx) => (
                <NavItem
                  key={idx}
                  item={item}
                  isActive={
                    !!pathname &&
                    (pathname === item.path ||
                      pathname.startsWith(item.path + "/"))
                  }
                  open={true}
                />
              ))}
            </List>
            <Box sx={{ height: 4, background: GRADIENT }} />
          </Drawer>
        </Box>
      ) : (
        sidebarContent(true)
      )}
    </>
  );
}

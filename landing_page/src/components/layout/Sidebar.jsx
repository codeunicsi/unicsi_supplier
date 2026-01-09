"use client"

import React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import HomeIcon from "@mui/icons-material/Home"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import WarehouseIcon from "@mui/icons-material/Warehouse"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import PaymentIcon from "@mui/icons-material/Payment"
import ReceiptIcon from "@mui/icons-material/Receipt"
import SettingsIcon from "@mui/icons-material/Settings"
import HelpIcon from "@mui/icons-material/Help"
import SupportAgentIcon from "@mui/icons-material/SupportAgent"
import PersonIcon from "@mui/icons-material/Person"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import AddIcon from "@mui/icons-material/Add"



const DRAWER_WIDTH = 280
const DRAWER_WIDTH_COLLAPSED = 80

const menuItems = [
  { name: "Home", icon: <HomeIcon />, path: "/" },
  { name: "Manage Orders", icon: <ShoppingCartIcon />, path: "/order" },
  { name: "Add Product", icon: <AddIcon />, path: "/products" },
  { name: "Manage NDR", icon: <WarehouseIcon />, path: "/manage-ndr" },
  { name: "Supplier Re-Routing", icon: <TrendingUpIcon />, path: "/supplier-re-routing" },
  { name: "Source a Product", icon: <ShoppingCartIcon />, path: "/source-product" },
  { name: "RTO Intelligence", icon: <TrendingUpIcon />, path: "/rto-intelligence" },
  { name: "Manage Products", icon: <WarehouseIcon />, path: "/manage-products" },
  { name: "Reports", icon: <TrendingUpIcon />, path: "/reports" },
  { name: "Payments", icon: <PaymentIcon />, path: "/payments" },
  { name: "GST Invoice", icon: <ReceiptIcon />, path: "/invoices" },
  { name: "Value Added Services", icon: <SettingsIcon />, path: "/service-requests" },
  { name: "Clouts", icon: <WarehouseIcon />, path: "/clauts" },
  { name: "Supports", icon: <SupportAgentIcon />, path: "/supports" },
  { name: "Help", icon: <HelpOutlineIcon />, path: "/help" },
  { name: "Profile", icon: <PersonIcon />, path: "/profile" },
  { name: "FAQs", icon: <HelpIcon />, path: "/faqs" },
]

export default function Sidebar() {
  const [open, setOpen] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const toggleDrawer = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen)
    } else {
      setOpen(!open)
    }
  }

  const desktopSidebar = (
    <Box
      sx={{
        width: open ? DRAWER_WIDTH : DRAWER_WIDTH_COLLAPSED,
        transition: "width 0.3s ease-in-out",
        bgcolor: "#F0E6E6",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #e0e0e0",
        overflowY: "auto",
      }}
    >
      {/* Header with logo and toggle */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "space-between" : "center",
          borderBottom: "1px solid #e0e0e0",
          minHeight: 80,
        }}
      >
        {open && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar src="/logo.jpeg" alt="Logo" sx={{ width: 40, height: 40 }} />
            <span style={{ fontWeight: "bold", color: "#000", whiteSpace: "nowrap" }}>UNICSI</span>
          </Box>
        )}
        <IconButton
          onClick={toggleDrawer}
          size="small"
          sx={{
            color: "#943A09",
            border: "1px solid #943A09",
          }}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      {/* Navigation menu */}
      <List sx={{ flex: 1, px: 1 }}>
        {menuItems.map((item, idx) => {
          const isActive = pathname === item.path
          return (
            <ListItemButton
              key={idx}
              href={item.path}
              component="a"
              sx={{
                borderRadius: 2,
                mb: 0.5,
                bgcolor: isActive ? "#943A09" : "transparent",
                color: isActive ? "#fff" : "#000",
                "&:hover": {
                  bgcolor: "#943A09",
                  color: "#fff",
                },
                justifyContent: open ? "flex-start" : "center",
                px: open ? 2 : 1,
                py: 1.5,
                transition: "all 0.2s ease",
                minHeight: open ? "auto" : 56,
              }}
              title={!open ? item.name : ""}
            >
              <ListItemIcon
                sx={{
                  color: "inherit",
                  minWidth: open ? 40 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{
                    sx: {
                      fontWeight: isActive ? 600 : 500,
                      fontSize: "0.95rem",
                      whiteSpace: "nowrap",
                    },
                  }}
                />
              )}
            </ListItemButton>
          )
        })}
      </List>
    </Box>
  )

  const mobileSidebar = (
    <Drawer
      anchor="left"
      open={mobileOpen}
      onClose={() => setMobileOpen(false)}
      sx={{
        "& .MuiDrawer-paper": {
          width: 280,
          bgcolor: "#F0E6E6",
        },
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar src="/logo.jpeg" alt="Logo" sx={{ width: 40, height: 40 }} />
          <span style={{ fontWeight: "bold", color: "#000" }}>UNICSI</span>
        </Box>
        <IconButton onClick={() => setMobileOpen(false)} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      <List sx={{ px: 1 }}>
        {menuItems.map((item, idx) => {
          const isActive = pathname === item.path
          return (
            <ListItemButton
              key={idx}
              href={item.path}
              component="a"
              sx={{
                borderRadius: 2,
                mb: 0.5,
                bgcolor: isActive ? "#943A09" : "transparent",
                color: isActive ? "#fff" : "#000",
                "&:hover": {
                  bgcolor: "#943A09",
                  color: "#fff",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: "inherit",
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  sx: {
                    fontWeight: isActive ? 600 : 500,
                    fontSize: "0.95rem",
                  },
                }}
              />
            </ListItemButton>
          )
        })}
      </List>
    </Drawer>
  )

  return (
    <>
      {isMobile ? (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={toggleDrawer}
            sx={{
              p: 2,
              color: "#943A09",
            }}
          >
            <MenuIcon />
          </IconButton>
          {mobileSidebar}
        </Box>
      ) : (
        desktopSidebar
      )}
    </>
  )
}

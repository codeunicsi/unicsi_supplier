"use client";

import { useState } from "react";
import { Box, Paper } from "@mui/material";
import PersonalDetails from "./personal/personalDetails";
import BankDetails from "./bank/BankDetails";
import GstDetails from "./gst/GstDetails";

const GRADIENT = "linear-gradient(135deg, #0097b2 0%, #7ed957 100%)";
const GRADIENT_HOVER = "linear-gradient(135deg, #007a91 0%, #65c040 100%)";

const TABS = [
  {
    label: "Personal Details",
    icon: (
      <svg
        width="16"
        height="16"
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
    ),
  },
  {
    label: "Bank Details",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="10" width="18" height="11" rx="2" />
        <path d="M3 10l9-7 9 7" />
        <line x1="12" y1="10" x2="12" y2="21" />
        <line x1="7" y1="14" x2="7" y2="17" />
        <line x1="17" y1="14" x2="17" y2="17" />
      </svg>
    ),
  },
  {
    label: "GST Details",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="15" y2="17" />
      </svg>
    ),
  },
];

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ProfileTabs() {
  const [value, setValue] = useState(0);

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "18px",
        border: "1.5px solid #e0f4f7",
        overflow: "hidden",
        boxShadow: "0 2px 20px rgba(0,151,178,0.08)",
      }}
    >
      {/* ── Custom Tab Bar ── */}
      <Box
        sx={{
          display: "flex",
          borderBottom: "1.5px solid #e0f4f7",
          bgcolor: "#f8fdfe",
          overflowX: "auto",
        }}
      >
        {TABS.map((tab, idx) => {
          const isActive = value === idx;
          return (
            <button
              key={tab.label}
              onClick={() => setValue(idx)}
              style={{
                flex: 1,
                minWidth: 140,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "16px 20px",
                fontSize: "0.9rem",
                fontWeight: isActive ? 700 : 500,
                color: isActive ? "#0097b2" : "#666",
                background: "transparent",
                border: "none",
                borderBottom: isActive
                  ? "3px solid #0097b2"
                  : "3px solid transparent",
                cursor: "pointer",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.color = "#0097b2";
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.color = "#666";
              }}
            >
              {/* Icon with gradient when active */}
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: isActive ? "#0097b2" : "#999",
                  transition: "color 0.2s",
                }}
              >
                {tab.icon}
              </span>

              {tab.label}

              {/* Active gradient underline dot */}
              {isActive && (
                <span
                  style={{
                    position: "absolute",
                    bottom: -2,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: GRADIENT,
                  }}
                />
              )}
            </button>
          );
        })}
      </Box>

      {/* ── Tab Panels ── */}
      <TabPanel value={value} index={0}>
        <PersonalDetails />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BankDetails />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <GstDetails />
      </TabPanel>
    </Paper>
  );
}

"use client";

import { useState } from "react";
import { Box, Paper } from "@mui/material";
import PersonalDetails from "./personal/personalDetails";
import BankDetails from "./bank/BankDetails";
import GstDetails from "./gst/GstDetails";

const GRADIENT = "linear-gradient(135deg, #0097b2 0%, #7ed957 100%)";

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
      {value === index && (
        <Box
          sx={{
            pt: { xs: 2, sm: 2.5, md: 3 },
            px: { xs: 1.5, sm: 2, md: 2.5 },
            pb: { xs: 2, sm: 2.5 },
            minWidth: 0,
            maxWidth: "100%",
            boxSizing: "border-box",
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

export default function ProfileTabs() {
  const [value, setValue] = useState(0);

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,
        borderRadius: "18px",
        border: "1.5px solid #e0f4f7",
        overflow: "hidden",
        boxShadow: "0 2px 20px rgba(0,151,178,0.08)",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          borderBottom: "1.5px solid #e0f4f7",
          bgcolor: "#f8fdfe",
          minWidth: 0,
          width: "100%",
        }}
      >
        {TABS.map((tab, idx) => {
          const isActive = value === idx;
          return (
            <Box
              key={tab.label}
              component="button"
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setValue(idx)}
              sx={{
                flex: { xs: "none", sm: "1 1 0" },
                width: { xs: "100%", sm: "auto" },
                minWidth: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "flex-start", sm: "center" },
                gap: 1,
                py: { xs: 1.5, sm: 2 },
                px: { xs: 2, sm: 1.5, md: 2 },
                fontSize: { xs: "0.85rem", sm: "0.875rem" },
                fontWeight: isActive ? 700 : 500,
                fontFamily: "inherit",
                color: isActive ? "#0097b2" : "#666",
                bgcolor: {
                  xs: isActive ? "rgba(0,151,178,0.08)" : "transparent",
                  sm: "transparent",
                },
                border: "none",
                borderBottom: {
                  xs: "1px solid #e8f6f9",
                  sm: isActive
                    ? "3px solid #0097b2"
                    : "3px solid transparent",
                },
                borderLeft: {
                  xs: isActive ? "3px solid #0097b2" : "3px solid transparent",
                  sm: "none",
                },
                cursor: "pointer",
                transition: "color 0.2s, background 0.2s, border-color 0.2s",
                textAlign: "left",
                position: "relative",
                flexWrap: "nowrap",
                boxSizing: "border-box",
                "&:hover": { color: "#0097b2", bgcolor: "rgba(0,151,178,0.04)" },
              }}
            >
              <Box
                component="span"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: isActive ? "#0097b2" : "#999",
                  flexShrink: 0,
                }}
              >
                {tab.icon}
              </Box>
              <Box
                component="span"
                sx={{
                  minWidth: 0,
                  textAlign: { xs: "left", sm: "center" },
                  wordBreak: "break-word",
                  lineHeight: 1.3,
                }}
              >
                {tab.label}
              </Box>
              {isActive && (
                <Box
                  component="span"
                  sx={{
                    display: { xs: "none", sm: "block" },
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
            </Box>
          );
        })}
      </Box>

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

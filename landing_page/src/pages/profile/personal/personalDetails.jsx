"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  Card,
  CardContent,
  Divider,
  Stack,
} from "@mui/material";
import {
  updatePersonalDetails,
  fetchProfile,
} from "../../../services/prodile/profile.service";
import { toast } from "react-toastify";

const GRADIENT = "linear-gradient(135deg, #0097b2 0%, #7ed957 100%)";
const GRADIENT_HOVER = "linear-gradient(135deg, #007a91 0%, #65c040 100%)";

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    background: "#fff",
    "&:hover fieldset": { borderColor: "#0097b2" },
    "&.Mui-focused fieldset": {
      borderColor: "#0097b2",
      boxShadow: "0 0 0 3px rgba(0,151,178,0.1)",
    },
    "&.Mui-disabled": {
      background: "#f4fbfc",
      "& fieldset": { borderColor: "#e0f4f7" },
    },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#0097b2" },
  "& .MuiInputBase-input": { color: "#000" },
  "& .MuiInputBase-input.Mui-disabled": {
    color: "#555",
    WebkitTextFillColor: "#555",
  },
};

function GradientButton({
  children,
  onClick,
  secondary = false,
  type = "button",
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "9px 22px",
        borderRadius: "10px",
        fontSize: "0.875rem",
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.2s ease",
        border: secondary ? "1.5px solid #0097b2" : "none",
        background: secondary
          ? hovered
            ? GRADIENT
            : "transparent"
          : hovered
            ? GRADIENT_HOVER
            : GRADIENT,
        color: secondary ? (hovered ? "#fff" : "#0097b2") : "#fff",
        boxShadow: secondary
          ? "none"
          : hovered
            ? "0 4px 14px rgba(0,151,178,0.3)"
            : "0 2px 8px rgba(0,151,178,0.18)",
      }}
    >
      {children}
    </button>
  );
}

export default function PersonalDetails() {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    supplierId: "",
    phoneNumber: "",
    storeName: "",
    storeEmail: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await updatePersonalDetails(formData);
      toast.success("Personal details updated successfully");
      setEditMode(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update personal details");
    }
  };

  useEffect(() => {
    const loadProfile = async () => {
      const res = await fetchProfile();
      const data = res.data.data;
      const lastPart = data?.supplier_id
        .substring(data?.supplier_id.lastIndexOf("-") + 1)
        .slice(0, 3); // ← only take first 2 characters
      setFormData({
        supplierId: "SUP-" + lastPart || "SUP-XXXX",
        phoneNumber: data.number || "",
        storeName: data.name || "",
        storeEmail: data.email || "",
      });
    };
    loadProfile();
  }, []);

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "16px",
        border: "1.5px solid #e0f4f7",
        boxShadow: "0 2px 16px rgba(0,151,178,0.07)",
        overflow: "hidden",
      }}
    >
      {/* ── Card Header ── */}
      <Box
        sx={{
          px: 3,
          py: 2.5,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          background:
            "linear-gradient(135deg, rgba(0,151,178,0.06) 0%, rgba(126,217,87,0.06) 100%)",
          borderBottom: "1.5px solid #e0f4f7",
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: "10px",
            background: GRADIENT,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 2px 8px rgba(0,151,178,0.2)",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
        </Box>
        <Box>
          <Box
            sx={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "#000",
              lineHeight: 1.3,
            }}
          >
            Personal Details
          </Box>
          <Box sx={{ fontSize: "0.8rem", color: "#666", mt: 0.2 }}>
            Manage your store information
          </Box>
        </Box>

        {/* Edit mode indicator badge */}
        {editMode && (
          <Box
            sx={{
              ml: "auto",
              background: "rgba(0,151,178,0.1)",
              border: "1px solid rgba(0,151,178,0.3)",
              color: "#0097b2",
              borderRadius: "20px",
              px: 1.5,
              py: 0.3,
              fontSize: "0.72rem",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#0097b2",
                display: "inline-block",
              }}
            />
            Editing
          </Box>
        )}
      </Box>

      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={2.5}>
          {/* Supplier ID — always disabled */}
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#0097b2",
                mb: 0.7,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              Supplier ID
            </Box>
            <TextField
              name="supplierId"
              fullWidth
              value={formData.supplierId}
              size="small"
              disabled
              sx={fieldSx}
            />
          </Grid>

          {/* Phone Number */}
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#0097b2",
                mb: 0.7,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              Phone Number
            </Box>
            <TextField
              name="phoneNumber"
              fullWidth
              value={formData.phoneNumber}
              onChange={handleChange}
              size="small"
              disabled={!editMode}
              sx={fieldSx}
            />
          </Grid>

          {/* Store Name */}
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#0097b2",
                mb: 0.7,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              Store Name (As per GST)
            </Box>
            <TextField
              name="storeName"
              fullWidth
              value={formData.storeName}
              onChange={handleChange}
              size="small"
              disabled={!editMode}
              sx={fieldSx}
            />
          </Grid>

          {/* Store Email */}
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#0097b2",
                mb: 0.7,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              Store Email
            </Box>
            <TextField
              name="storeEmail"
              fullWidth
              value={formData.storeEmail}
              onChange={handleChange}
              size="small"
              disabled
              sx={fieldSx}
            />
          </Grid>

          {/* Email verified badge */}
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{ display: "flex", alignItems: "flex-end" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                background: "rgba(126,217,87,0.12)",
                border: "1.5px solid rgba(126,217,87,0.4)",
                borderRadius: "10px",
                px: 2,
                py: 1.2,
                width: "100%",
              }}
            >
              {/* Check icon */}
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #7ed957, #4caf50)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </Box>
              <Box>
                <Box
                  sx={{
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: "#2e7d1e",
                  }}
                >
                  Email Verified
                </Box>
                <Box sx={{ fontSize: "0.7rem", color: "#4a8a3a" }}>
                  Your email is confirmed
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* ── Action Buttons ── */}
        <Stack direction="row" spacing={1.5} justifyContent="flex-end" mt={4}>
          {!editMode ? (
            <GradientButton secondary onClick={() => setEditMode(true)}>
              Edit Details
            </GradientButton>
          ) : (
            <>
              <GradientButton secondary onClick={() => setEditMode(false)}>
                Cancel
              </GradientButton>
              <GradientButton onClick={handleSubmit}>
                Save Changes
              </GradientButton>
            </>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

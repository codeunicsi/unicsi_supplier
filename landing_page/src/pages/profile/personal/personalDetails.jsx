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
  width: "100%",
  maxWidth: "100%",
  minWidth: 0,
  boxSizing: "border-box",
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    background: "#fff",
    maxWidth: "100%",
    minWidth: 0,
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
  "& .MuiInputBase-root": { maxWidth: "100%" },
  "& .MuiInputBase-input": {
    color: "#000",
    minWidth: 0,
    boxSizing: "border-box",
  },
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
  fullWidth = false,
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={
        fullWidth ? "w-full min-w-0 max-w-full sm:w-auto sm:max-w-none" : ""
      }
      style={{
        ...(fullWidth
          ? { whiteSpace: "normal", lineHeight: 1.35, textAlign: "center" }
          : { whiteSpace: "nowrap" }),
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
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,
        borderRadius: "16px",
        border: "1.5px solid #e0f4f7",
        boxShadow: "0 2px 16px rgba(0,151,178,0.07)",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* ── Card Header ── */}
      <Box
        sx={{
          px: { xs: 2, sm: 3 },
          py: { xs: 2, sm: 2.5 },
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 1.5,
          minWidth: 0,
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
        <Box sx={{ flex: "1 1 160px", minWidth: 0 }}>
          <Box
            sx={{
              fontSize: { xs: "0.95rem", sm: "1rem" },
              fontWeight: 700,
              color: "#000",
              lineHeight: 1.3,
              wordBreak: "break-word",
            }}
          >
            Personal Details
          </Box>
          <Box
            sx={{
              fontSize: "0.8rem",
              color: "#666",
              mt: 0.2,
              wordBreak: "break-word",
            }}
          >
            Manage your store information
          </Box>
        </Box>

        {/* Edit mode indicator badge */}
        {editMode && (
          <Box
            sx={{
              ml: { xs: 0, sm: "auto" },
              width: { xs: "100%", sm: "auto" },
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
              justifyContent: "center",
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

      <CardContent
        sx={{
          p: { xs: 2, sm: 2.5, md: 3 },
          minWidth: 0,
          "&:last-child": { pb: { xs: 2, sm: 3 } },
        }}
      >
        <Grid
          container
          spacing={2.5}
          sx={{
            minWidth: 0,
            width: "100%",
          }}
        >
          {/* Supplier ID — always disabled */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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
            size={{ xs: 12, sm: 6, md: 4 }}
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
                minWidth: 0,
                boxSizing: "border-box",
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
              <Box sx={{ minWidth: 0 }}>
                <Box
                  sx={{
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: "#2e7d1e",
                    wordBreak: "break-word",
                  }}
                >
                  Email Verified
                </Box>
                <Box
                  sx={{
                    fontSize: "0.7rem",
                    color: "#4a8a3a",
                    wordBreak: "break-word",
                  }}
                >
                  Your email is confirmed
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* ── Action Buttons ── */}
        <Stack
          direction={{ xs: "column-reverse", sm: "row" }}
          sx={{
            mt: 4,
            gap: 1.5,
            alignItems: { xs: "stretch", sm: "center" },
            justifyContent: { xs: "stretch", sm: "flex-end" },
            flexWrap: "wrap",
          }}
        >
          {!editMode ? (
            <GradientButton fullWidth secondary onClick={() => setEditMode(true)}>
              Edit Details
            </GradientButton>
          ) : (
            <>
              <GradientButton
                fullWidth
                secondary
                onClick={() => setEditMode(false)}
              >
                Cancel
              </GradientButton>
              <GradientButton fullWidth onClick={handleSubmit}>
                Save Changes
              </GradientButton>
            </>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

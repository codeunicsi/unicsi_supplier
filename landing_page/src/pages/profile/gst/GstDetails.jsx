"use client";

import { useState, useEffect } from "react";
import { Box, Grid, TextField, Divider } from "@mui/material";
import {
  AddGstDetails,
  getGstDetails,
} from "../../../services/prodile/profile.service";
import { toast } from "react-toastify";
import axios from "axios";

const GRADIENT = "linear-gradient(135deg, #0097b2 0%, #7ed957 100%)";
const GRADIENT_HOVER = "linear-gradient(135deg, #007a91 0%, #65c040 100%)";

// ── Shared field sx ───────────────────────────────────────────────────────────
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

// ── Gradient button ───────────────────────────────────────────────────────────
function GradientButton({
  children,
  onClick,
  secondary = false,
  disabled = false,
  fullWidth = false,
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={
        fullWidth ? "w-full min-w-0 max-w-full sm:w-auto sm:max-w-none" : ""
      }
      style={{
        ...(fullWidth
          ? { whiteSpace: "normal", lineHeight: 1.35, textAlign: "center" }
          : { whiteSpace: "nowrap" }),
        padding: "10px 28px",
        borderRadius: "10px",
        fontSize: "0.875rem",
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "all 0.2s ease",
        ...(secondary
          ? {
              background: hovered && !disabled ? GRADIENT : "transparent",
              color: hovered && !disabled ? "#fff" : "#0097b2",
              border: "1.5px solid #0097b2",
              boxShadow: "none",
            }
          : {
              background: disabled
                ? "#ccc"
                : hovered
                  ? GRADIENT_HOVER
                  : GRADIENT,
              color: "#fff",
              border: "none",
              boxShadow: disabled
                ? "none"
                : hovered
                  ? "0 4px 14px rgba(0,151,178,0.3)"
                  : "0 2px 8px rgba(0,151,178,0.18)",
            }),
      }}
    >
      {children}
    </button>
  );
}

// ── Section label ─────────────────────────────────────────────────────────────
function SectionLabel({ icon, children }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        gap: 1,
        mb: 1.5,
        minWidth: 0,
      }}
    >
      <Box
        sx={{
          width: 24,
          height: 24,
          borderRadius: "6px",
          background: GRADIENT,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      <Box
        sx={{
          fontSize: "0.8rem",
          fontWeight: 700,
          color: "#000",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          minWidth: 0,
          flex: "1 1 200px",
          wordBreak: "break-word",
          lineHeight: 1.35,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

// ── File upload input ─────────────────────────────────────────────────────────
function FileInput({ name, label, file, onChange, disabled, error }) {
  const isUrl = typeof file === "string" && file.length > 0;
  const fileName = file?.name || (isUrl ? "Uploaded file" : null);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box
        sx={{
          fontSize: "0.75rem",
          fontWeight: 600,
          color: "#0097b2",
          mb: 0.7,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
        }}
      >
        {label || "Upload Document"}
      </Box>
      <label
        htmlFor={`file-${name}`}
        style={{
          display: "block",
          cursor: disabled ? "not-allowed" : "pointer",
          flex: 1,
        }}
      >
        <Box
          sx={{
            border: "2px dashed",
            borderColor: error
              ? "#d32f2f"
              : disabled
                ? "#e0f4f7"
                : "#b8e8f0",
            borderRadius: "10px",
            background: error ? "#fff5f5" : disabled ? "#f4fbfc" : "#f8fdfe",
            px: 2,
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            transition: "all 0.2s",
            opacity: disabled ? 0.6 : 1,
            "&:hover": disabled
              ? {}
              : { borderColor: "#0097b2", background: "#edf8fb" },
          }}
        >
          {!fileName ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke={disabled ? "#aaa" : "#0097b2"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0 }}
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <Box
                sx={{
                  fontSize: "0.78rem",
                  fontWeight: 500,
                  color: "#777",
                  whiteSpace: "nowrap",
                }}
              >
                Click to upload{" "}
                <span style={{ color: "#aaa", fontSize: "0.72rem" }}>
                  JPG, PNG · Max 200kb
                </span>
              </Box>
            </Box>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2e7d1e"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0 }}
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <Box
                sx={{
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "#2e7d1e",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  minWidth: 0,
                  maxWidth: "100%",
                }}
              >
                {fileName}
              </Box>
            </Box>
          )}
        </Box>
      </label>
      <input
        id={`file-${name}`}
        type="file"
        name={name}
        hidden
        accept="image/png, image/jpeg"
        onChange={onChange}
        disabled={disabled}
      />
      {error ? (
        <Box sx={{ mt: 0.6, fontSize: "0.75rem", color: "#d32f2f" }}>
          {error}
        </Box>
      ) : null}
    </Box>
  );
}

// ── Thin teal divider ─────────────────────────────────────────────────────────
function TealDivider() {
  return <Divider sx={{ borderColor: "#e0f4f7", my: 3 }} />;
}

// ── Field label above TextField ───────────────────────────────────────────────
function FieldLabel({ children }) {
  return (
    <Box
      sx={{
        fontSize: "0.75rem",
        fontWeight: 600,
        color: "#0097b2",
        mb: 0.7,
        textTransform: "uppercase",
        letterSpacing: "0.04em",
        wordBreak: "break-word",
      }}
    >
      {children}
    </Box>
  );
}

export default function GstDetails() {
  const [formData, setFormData] = useState({
    gstName: "DemoShop",
    gstNumber: "",
    panCardNumber: "",
    adharCardNumber: "",
    gstCertificate: "",
    // PAN — split into front + back
    panCardFrontImage: "",
    panCardBackImage: "",
    // Aadhaar — split into front + back
    adharCardFrontImage: "",
    adharCardBackImage: "",
    gstStatus: false,
  });
  const [errors, setErrors] = useState({});

  const GST_REGEX =
    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][A-Z0-9]Z[A-Z0-9]$/;
  const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
  const AADHAAR_REGEX = /^[0-9]{12}$/;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const nextValue = files
      ? files[0]
      : name === "gstNumber" || name === "panCardNumber"
        ? value.toUpperCase()
        : name === "adharCardNumber"
          ? value.replace(/\D/g, "").slice(0, 12)
          : value;

    setFormData((prev) => ({ ...prev, [name]: nextValue }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const nextErrors = {};
    const gstName = formData.gstName.trim();
    const gstNumber = formData.gstNumber.trim().toUpperCase();
    const panCardNumber = formData.panCardNumber.trim().toUpperCase();
    const adharCardNumber = formData.adharCardNumber.replace(/\D/g, "");

    if (!gstName) {
      nextErrors.gstName = "GST name is required";
    }
    if (!gstNumber) {
      nextErrors.gstNumber = "GST number is required";
    } else if (!GST_REGEX.test(gstNumber)) {
      nextErrors.gstNumber = "Enter a valid 15-character GST number";
    }
    if (!panCardNumber) {
      nextErrors.panCardNumber = "PAN card number is required";
    } else if (!PAN_REGEX.test(panCardNumber)) {
      nextErrors.panCardNumber = "Enter a valid PAN card number";
    }
    if (!adharCardNumber) {
      nextErrors.adharCardNumber = "Aadhaar card number is required";
    } else if (!AADHAAR_REGEX.test(adharCardNumber)) {
      nextErrors.adharCardNumber = "Aadhaar number must be 12 digits";
    }

    if (!formData.gstCertificate) {
      nextErrors.gstCertificate = "GST certificate is required";
    }
    if (!formData.panCardFrontImage) {
      nextErrors.panCardFrontImage = "PAN front image is required";
    }
    if (!formData.panCardBackImage) {
      nextErrors.panCardBackImage = "PAN back image is required";
    }
    if (!formData.adharCardFrontImage) {
      nextErrors.adharCardFrontImage = "Aadhaar front image is required";
    }
    if (!formData.adharCardBackImage) {
      nextErrors.adharCardBackImage = "Aadhaar back image is required";
    }

    setErrors(nextErrors);
    return nextErrors;
  };

  const handleSubmit = () => {
    const submitGstDetails = async () => {
      try {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
          toast.error(
            Object.values(validationErrors)[0] || "Please correct the form errors",
          );
          return;
        }

        const payload = new FormData();
        payload.append("gstName", formData.gstName.trim());
        payload.append("gstNumber", formData.gstNumber.trim().toUpperCase());
        payload.append(
          "panCardNumber",
          formData.panCardNumber.trim().toUpperCase(),
        );
        payload.append(
          "adharCardNumber",
          formData.adharCardNumber.replace(/\D/g, ""),
        );
        payload.append("gstCertificate", formData.gstCertificate);
        payload.append("panCardFrontImage", formData.panCardFrontImage);
        payload.append("panCardBackImage", formData.panCardBackImage);
        payload.append("adharCardFrontImage", formData.adharCardFrontImage);
        payload.append("adharCardBackImage", formData.adharCardBackImage);

        const token = "Bearer " + localStorage.getItem("token");
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/suppliers/stores/gstDetails`,
          payload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              authorization: token,
            },
          },
        );
        if (res.status === 200) {
          toast.success("GST Details Updated Successfully");
          setErrors({});
          setFormData((prev) => ({ ...prev, gstStatus: true }));
        }
      } catch (err) {
        console.log(err);
        toast.error(
          err?.response?.data?.message || "Failed to update GST details",
        );
      }
    };
    submitGstDetails();
  };

  useEffect(() => {
    getGstDetails()
      .then((res) => {
        setFormData({
          gstName: res.data?.data?.gst_name,
          gstNumber: res.data?.data?.gst_number,
          panCardNumber: res.data?.data?.pan_number,
          adharCardNumber: res.data?.data?.andhar_number,
          gstCertificate: res.data?.data?.gst_image,
          // Update these keys to match your actual API response
          panCardFrontImage: res.data?.data?.pan_front_image,
          panCardBackImage: res.data?.data?.pan_back_image,
          adharCardFrontImage: res.data?.data?.andhar_front_image,
          adharCardBackImage: res.data?.data?.andhar_back_image,
          gstStatus: res.data?.data?.gst_status,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const isVerified = formData.gstStatus;

  return (
    <Box sx={{ width: "100%", minWidth: 0, maxWidth: "100%", boxSizing: "border-box" }}>
      {/* ── Card shell ── */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
          minWidth: 0,
          borderRadius: "16px",
          border: "1.5px solid #e0f4f7",
          overflow: "hidden",
          boxShadow: "0 2px 16px rgba(0,151,178,0.07)",
          background: "#fff",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
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
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="9" y1="13" x2="15" y2="13" />
              <line x1="9" y1="17" x2="15" y2="17" />
            </svg>
          </Box>
          <Box sx={{ flex: "1 1 200px", minWidth: 0 }}>
            <Box
              sx={{
                fontSize: { xs: "0.95rem", sm: "1rem" },
                fontWeight: 700,
                color: "#000",
                lineHeight: 1.3,
                wordBreak: "break-word",
              }}
            >
              GST Details
            </Box>
            <Box
              sx={{
                fontSize: "0.8rem",
                color: "#666",
                mt: 0.2,
                wordBreak: "break-word",
              }}
            >
              Tax registration and identity documents
            </Box>
          </Box>

          {/* Status badge */}
          {isVerified ? (
            <Box
              sx={{
                ml: { xs: 0, sm: "auto" },
                width: { xs: "100%", sm: "auto" },
                justifyContent: { xs: "center", sm: "flex-start" },
                background: "rgba(126,217,87,0.12)",
                border: "1px solid rgba(126,217,87,0.4)",
                color: "#2e7d1e",
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
                  background: "#7ed957",
                  display: "inline-block",
                }}
              />
              Verified
            </Box>
          ) : (
            <Box
              sx={{
                ml: { xs: 0, sm: "auto" },
                width: { xs: "100%", sm: "auto" },
                justifyContent: { xs: "center", sm: "flex-start" },
                background: "rgba(255,160,0,0.1)",
                border: "1px solid rgba(255,160,0,0.35)",
                color: "#e65100",
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
                  background: "#ffa000",
                  display: "inline-block",
                }}
              />
              Pending
            </Box>
          )}
        </Box>

        {/* Body */}
        <Box sx={{ p: { xs: 2, sm: 2.5, md: 3 }, minWidth: 0 }}>
          {/* ── GST Name ── */}
          <SectionLabel
            icon={
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            }
          >
            Name (As per GST Certificate)
          </SectionLabel>

          <Grid
            container
            spacing={2.5}
            sx={{
              mb: 0,
              minWidth: 0,
              "& > .MuiGrid-item": { minWidth: 0, maxWidth: "100%" },
            }}
          >
            <Grid item xs={12} sm={8}>
              <FieldLabel>GST Name</FieldLabel>
              <TextField
                name="gstName"
                fullWidth
                value={formData.gstName}
                onChange={handleChange}
                size="small"
                disabled={isVerified}
                error={Boolean(errors.gstName)}
                helperText={errors.gstName}
                sx={fieldSx}
              />
            </Grid>
          </Grid>

          <TealDivider />

          {/* ── GST Information ── */}
          <SectionLabel
            icon={
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            }
          >
            GST Information
          </SectionLabel>

          <Grid
            container
            spacing={2.5}
            alignItems="flex-end"
            sx={{
              minWidth: 0,
              "& > .MuiGrid-item": { minWidth: 0, maxWidth: "100%" },
            }}
          >
            <Grid item xs={12} sm={6}>
              <FieldLabel>GST ID</FieldLabel>
              <TextField
                name="gstNumber"
                fullWidth
                value={formData.gstNumber}
                onChange={handleChange}
                size="small"
                disabled={isVerified}
                error={Boolean(errors.gstNumber)}
                helperText={errors.gstNumber}
                sx={fieldSx}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FileInput
                name="gstCertificate"
                label="GST Certificate"
                file={formData.gstCertificate}
                onChange={handleChange}
                disabled={isVerified}
                error={errors.gstCertificate}
              />
            </Grid>
          </Grid>

          <TealDivider />

          {/* ── PAN Card ── */}
          <SectionLabel
            icon={
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
            }
          >
            PAN Card Information
          </SectionLabel>

          <Grid
            container
            spacing={2.5}
            sx={{
              minWidth: 0,
              "& > .MuiGrid-item": { minWidth: 0, maxWidth: "100%" },
            }}
          >
            <Grid item xs={12} sm={6}>
              <FieldLabel>PAN Card Number</FieldLabel>
              <TextField
                name="panCardNumber"
                fullWidth
                value={formData.panCardNumber}
                onChange={handleChange}
                size="small"
                disabled={isVerified}
                error={Boolean(errors.panCardNumber)}
                helperText={errors.panCardNumber}
                sx={fieldSx}
              />
            </Grid>
            {/* ── PAN front + back ── */}
            <Grid
              item
              xs={12}
              sm={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <FileInput
                name="panCardFrontImage"
                label="Front Page"
                file={formData.panCardFrontImage}
                onChange={handleChange}
                disabled={isVerified}
                error={errors.panCardFrontImage}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <FileInput
                name="panCardBackImage"
                label="Back Page"
                file={formData.panCardBackImage}
                onChange={handleChange}
                disabled={isVerified}
                error={errors.panCardBackImage}
              />
            </Grid>
          </Grid>

          <TealDivider />

          {/* ── Aadhaar Card ── */}
          <SectionLabel
            icon={
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="3" width="20" height="18" rx="2" />
                <circle cx="9" cy="10" r="2" />
                <path d="M5 18c0-2 2-3 4-3s4 1 4 3" />
                <line x1="14" y1="9" x2="19" y2="9" />
                <line x1="14" y1="13" x2="19" y2="13" />
              </svg>
            }
          >
            Aadhaar Card Information
          </SectionLabel>

          <Grid
            container
            spacing={2.5}
            sx={{
              minWidth: 0,
              "& > .MuiGrid-item": { minWidth: 0, maxWidth: "100%" },
            }}
          >
            <Grid item xs={12} sm={6}>
              <FieldLabel>Aadhaar Card Number</FieldLabel>
              <TextField
                name="adharCardNumber"
                fullWidth
                value={formData.adharCardNumber}
                onChange={handleChange}
                size="small"
                disabled={isVerified}
                error={Boolean(errors.adharCardNumber)}
                helperText={errors.adharCardNumber}
                sx={fieldSx}
              />
            </Grid>
            {/* ── Aadhaar front + back ── */}
            <Grid
              item
              xs={12}
              sm={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <FileInput
                name="adharCardFrontImage"
                label="Front Page"
                file={formData.adharCardFrontImage}
                onChange={handleChange}
                disabled={isVerified}
                error={errors.adharCardFrontImage}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <FileInput
                name="adharCardBackImage"
                label="Back Page"
                file={formData.adharCardBackImage}
                onChange={handleChange}
                disabled={isVerified}
                error={errors.adharCardBackImage}
              />
            </Grid>
          </Grid>

          {/* ── Submit ── */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: { xs: "stretch", sm: "flex-end" },
              alignItems: { xs: "stretch", sm: "center" },
              gap: 2,
              mt: 4,
              minWidth: 0,
            }}
          >
            {isVerified ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  background: "rgba(126,217,87,0.1)",
                  border: "1.5px solid rgba(126,217,87,0.35)",
                  borderRadius: "10px",
                  px: 2.5,
                  py: 1.2,
                  minWidth: 0,
                  wordBreak: "break-word",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2e7d1e"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <Box
                  sx={{
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    color: "#2e7d1e",
                  }}
                >
                  GST Details Verified — No changes allowed
                </Box>
              </Box>
            ) : (
              <GradientButton fullWidth onClick={handleSubmit}>
                Submit GST Details
              </GradientButton>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

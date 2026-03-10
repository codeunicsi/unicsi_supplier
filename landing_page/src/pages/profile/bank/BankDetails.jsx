"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Paper,
  Stack,
  Divider,
} from "@mui/material";
import {
  AddBankDetails,
  updateBankDetails,
  fetchBankDetails,
} from "../../../services/prodile/profile.service";

const GRADIENT = "linear-gradient(135deg, #0097b2 0%, #7ed957 100%)";
const GRADIENT_HOVER = "linear-gradient(135deg, #007a91 0%, #65c040 100%)";

const MODES = { EMPTY: "EMPTY", EDIT: "EDIT", VIEW: "VIEW" };

// ── Shared field sx ───────────────────────────────────────────────────────────
const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    background: "#fff",
    "&:hover fieldset": { borderColor: "#0097b2" },
    "&.Mui-focused fieldset": {
      borderColor: "#0097b2",
      boxShadow: "0 0 0 3px rgba(0,151,178,0.1)",
    },
    "&.Mui-error fieldset": { borderColor: "#e53935" },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#0097b2" },
  "& .MuiInputBase-input": { color: "#000" },
};

// ── Shared button ─────────────────────────────────────────────────────────────
function GradientButton({
  children,
  onClick,
  secondary = false,
  fullWidth = false,
  disabled = false,
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: fullWidth ? "100%" : "auto",
        padding: "10px 22px",
        borderRadius: "10px",
        fontSize: "0.875rem",
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.2s ease",
        opacity: disabled ? 0.5 : 1,
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

// ── Card shell shared across modes ────────────────────────────────────────────
function CardShell({ icon, title, subtitle, badge, children }) {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "16px",
        border: "1.5px solid #e0f4f7",
        overflow: "hidden",
        boxShadow: "0 2px 16px rgba(0,151,178,0.07)",
      }}
    >
      {/* Header strip */}
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
          {icon}
        </Box>
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "#000",
              lineHeight: 1.3,
            }}
          >
            {title}
          </Box>
          <Box sx={{ fontSize: "0.8rem", color: "#666", mt: 0.2 }}>
            {subtitle}
          </Box>
        </Box>
        {badge}
      </Box>

      <Box sx={{ p: 3 }}>{children}</Box>
    </Paper>
  );
}

// ── Reusable detail row ───────────────────────────────────────────────────────
function DetailField({ label, value }) {
  return (
    <Box mb={2.5}>
      <Box
        sx={{
          fontSize: "0.72rem",
          fontWeight: 600,
          color: "#0097b2",
          mb: 0.5,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
        }}
      >
        {label}
      </Box>
      <Box sx={{ fontSize: "0.95rem", fontWeight: 600, color: "#000" }}>
        {value || "—"}
      </Box>
    </Box>
  );
}

export default function BankDetails() {
  const [mode, setMode] = useState(MODES.EMPTY);
  const [bankData, setBankData] = useState({
    holderName: "",
    accountNumber: "",
    reAccountNumber: "",
    ifsc: "",
    bank_details_status: false,
    proof: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setBankData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleIFSCChange = (e) =>
    setBankData((prev) => ({ ...prev, ifsc: e.target.value.toUpperCase() }));

  useEffect(() => {
    const loadBankDetails = async () => {
      const res = await fetchBankDetails();
      if (!res.data.success) {
        setMode(MODES.EMPTY);
        return;
      }
      setBankData({
        holderName: res.data?.data?.account_holder_name,
        accountNumber: res.data?.data?.account_number,
        reAccountNumber: res.data?.data?.account_number,
        ifsc: res.data?.data?.ifsc_code,
        bank_details_status: res.data?.data?.bank_details_status,
      });
      setMode(MODES.VIEW);
    };
    loadBankDetails();
  }, []);

  const handleAddBankDetails = () => {
    if (bankData.accountNumber !== bankData.reAccountNumber) return;
    AddBankDetails(bankData);
    setMode(MODES.VIEW);
  };

  const handleUpdateBankDetails = () => {
    if (bankData.accountNumber !== bankData.reAccountNumber) return;
    updateBankDetails(bankData);
    setMode(MODES.VIEW);
  };

  const maskedAccountNumber = bankData.accountNumber
    ? `**** **** ${bankData.accountNumber.slice(-4)}`
    : "—";

  const bankIcon = (
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
      <rect x="3" y="10" width="18" height="11" rx="2" />
      <path d="M3 10l9-7 9 7" />
      <line x1="12" y1="10" x2="12" y2="21" />
      <line x1="7" y1="14" x2="7" y2="17" />
      <line x1="17" y1="14" x2="17" y2="17" />
    </svg>
  );

  /* ── EMPTY ── */
  if (mode === MODES.EMPTY) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 5,
          borderRadius: "16px",
          border: "2px dashed #b8e8f0",
          background: "#f8fdfe",
          textAlign: "center",
          maxWidth: 460,
        }}
      >
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: "14px",
            background: GRADIENT,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 2,
            boxShadow: "0 4px 16px rgba(0,151,178,0.2)",
          }}
        >
          {bankIcon}
        </Box>
        <Box
          sx={{ fontSize: "1.05rem", fontWeight: 700, color: "#000", mb: 0.5 }}
        >
          No Bank Details Added
        </Box>
        <Box
          sx={{ fontSize: "0.875rem", color: "#666", mb: 3, lineHeight: 1.6 }}
        >
          Add your bank account to receive margins, refunds and settlements.
        </Box>
        <GradientButton onClick={() => setMode(MODES.EDIT)}>
          + Add Bank Details
        </GradientButton>
      </Paper>
    );
  }

  /* ── VIEW ── */
  if (mode === MODES.VIEW) {
    return (
      <CardShell
        icon={bankIcon}
        title="Bank Details"
        subtitle="Used for all payments and refunds"
        badge={
          <Box
            sx={{
              ml: "auto",
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
        }
      >
        {/* Secure notice */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            background: "rgba(126,217,87,0.1)",
            border: "1.5px solid rgba(126,217,87,0.35)",
            borderRadius: "10px",
            px: 2,
            py: 1.2,
            mb: 3,
          }}
        >
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #7ed957, #4caf50)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </Box>
          <Box>
            <Box sx={{ fontSize: "0.8rem", fontWeight: 700, color: "#2e7d1e" }}>
              Bank details are securely stored
            </Box>
            <Box sx={{ fontSize: "0.72rem", color: "#4a8a3a" }}>
              Encrypted and safe 🔒
            </Box>
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <DetailField
              label="Account Holder Name"
              value={bankData.holderName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DetailField
              label="Bank Account Number"
              value={maskedAccountNumber}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DetailField label="IFSC Code" value={bankData.ifsc} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 2, borderColor: "#e0f4f7" }} />

        <Stack direction="row" spacing={1.5} justifyContent="flex-end">
          <GradientButton secondary onClick={() => setMode(MODES.EDIT)}>
            ✏️ Edit Bank Details
          </GradientButton>
        </Stack>

        <Box
          sx={{
            mt: 1.5,
            fontSize: "0.75rem",
            color: "#888",
            textAlign: "right",
          }}
        >
          OTP will be sent to your registered mobile number for verification.
        </Box>
      </CardShell>
    );
  }

  /* ── EDIT ── */
  return (
    <CardShell
      icon={bankIcon}
      title="Add / Update Bank Details"
      subtitle="Ensure all details are correct before saving"
    >
      {/* Info banner */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 1.5,
          background: "rgba(0,151,178,0.07)",
          border: "1.5px solid rgba(0,151,178,0.25)",
          borderRadius: "10px",
          px: 2,
          py: 1.5,
          mb: 3,
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0097b2"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ flexShrink: 0, marginTop: 2 }}
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <Box sx={{ fontSize: "0.82rem", color: "#0097b2", lineHeight: 1.5 }}>
          Please ensure the bank details are correct. These will be used for all
          payouts.
        </Box>
      </Box>

      <Grid container spacing={2.5}>
        {[
          {
            label: "Account Holder Name",
            name: "holderName",
            value: bankData.holderName,
          },
          {
            label: "Bank Account Number",
            name: "accountNumber",
            value: bankData.accountNumber,
          },
          {
            label: "Re-enter Account Number",
            name: "reAccountNumber",
            value: bankData.reAccountNumber,
            error: !!(
              bankData.reAccountNumber &&
              bankData.accountNumber !== bankData.reAccountNumber
            ),
            helperText:
              bankData.reAccountNumber &&
              bankData.accountNumber !== bankData.reAccountNumber
                ? "Account numbers do not match"
                : "",
          },
          {
            label: "IFSC Code",
            name: "ifsc",
            value: bankData.ifsc,
            onChange: handleIFSCChange,
          },
        ].map(({ label, name, value, error, helperText, onChange }) => (
          <Grid item xs={12} sm={6} key={name}>
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
              {label}
            </Box>
            <TextField
              fullWidth
              name={name}
              value={value}
              onChange={onChange || handleChange}
              size="small"
              error={error}
              helperText={helperText}
              sx={{
                ...fieldSx,
                ...(error
                  ? {
                      "& .MuiFormHelperText-root": {
                        color: "#e53935",
                        fontSize: "0.75rem",
                      },
                    }
                  : {}),
              }}
            />
          </Grid>
        ))}

        {/* File Upload */}
        <Grid item xs={12}>
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
            Upload Bank Proof
          </Box>
          <label
            htmlFor="bank-proof-upload"
            style={{ display: "block", cursor: "pointer" }}
          >
            <Box
              sx={{
                border: "2px dashed #b8e8f0",
                borderRadius: "10px",
                background: "#f8fdfe",
                p: 2.5,
                textAlign: "center",
                transition: "all 0.2s",
                "&:hover": { borderColor: "#0097b2", background: "#edf8fb" },
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0097b2"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginBottom: 6 }}
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <Box sx={{ fontSize: "0.82rem", color: "#555", fontWeight: 500 }}>
                {bankData.proof ? (
                  <span style={{ color: "#2e7d1e", fontWeight: 700 }}>
                    ✔ {bankData.proof.name}
                  </span>
                ) : (
                  <>
                    Click to choose file &nbsp;
                    <span style={{ color: "#999", fontWeight: 400 }}>
                      JPG, PNG · Max 200kb
                    </span>
                  </>
                )}
              </Box>
            </Box>
          </label>
          <input
            hidden
            id="bank-proof-upload"
            type="file"
            name="proof"
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      <Stack direction="row" spacing={1.5} sx={{ mt: 4 }}>
        <GradientButton
          secondary
          fullWidth
          onClick={() =>
            setMode(bankData.bank_details_status ? MODES.VIEW : MODES.EMPTY)
          }
        >
          Cancel
        </GradientButton>
        <GradientButton
          fullWidth
          disabled={
            !bankData.holderName ||
            !bankData.accountNumber ||
            bankData.accountNumber !== bankData.reAccountNumber
          }
          onClick={
            bankData.bank_details_status === false
              ? handleAddBankDetails
              : handleUpdateBankDetails
          }
        >
          Save Bank Details
        </GradientButton>
      </Stack>
    </CardShell>
  );
}

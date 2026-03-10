"use client";

import { useState } from "react";
import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Switch,
  FormControlLabel,
  Divider,
  Stack,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
  Paper,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const GRADIENT = "linear-gradient(135deg, #0097b2 0%, #7ed957 100%)";
const GRADIENT_HOVER = "linear-gradient(135deg, #007a91 0%, #65c040 100%)";

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
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#0097b2" },
  "& .MuiInputBase-input": { color: "#000" },
  "& .MuiSelect-select": { color: "#000" },
};

// ── Gradient Button ───────────────────────────────────────────────────────────
function GradientButton({
  children,
  onClick,
  secondary = false,
  startIcon,
  size = "medium",
  fullWidth = false,
}) {
  const [hovered, setHovered] = useState(false);
  const pad = size === "small" ? "6px 14px" : "10px 22px";
  const fontSize = size === "small" ? "0.8rem" : "0.875rem";
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: fullWidth ? "100%" : "auto",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "7px",
        padding: pad,
        borderRadius: "10px",
        fontSize,
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.2s ease",
        ...(secondary
          ? {
              background: hovered ? GRADIENT : "transparent",
              color: hovered ? "#fff" : "#0097b2",
              border: "1.5px solid #0097b2",
              boxShadow: "none",
            }
          : {
              background: hovered ? GRADIENT_HOVER : GRADIENT,
              color: "#fff",
              border: "none",
              boxShadow: hovered
                ? "0 4px 14px rgba(0,151,178,0.3)"
                : "0 2px 8px rgba(0,151,178,0.18)",
            }),
      }}
    >
      {startIcon && (
        <span style={{ display: "flex", alignItems: "center" }}>
          {startIcon}
        </span>
      )}
      {children}
    </button>
  );
}

// ── Teal Switch ───────────────────────────────────────────────────────────────
const switchSx = {
  "& .MuiSwitch-switchBase.Mui-checked": { color: "#0097b2" },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#0097b2",
  },
};

// ── Card shell ────────────────────────────────────────────────────────────────
function SettingsCard({ icon, title, subtitle, children }) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "16px",
        border: "1.5px solid #e0f4f7",
        overflow: "hidden",
        boxShadow: "0 2px 16px rgba(0,151,178,0.07)",
        height: "100%",
      }}
    >
      {/* Header */}
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
            color: "#fff",
          }}
        >
          {icon}
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
            {title}
          </Box>
          <Box sx={{ fontSize: "0.8rem", color: "#666", mt: 0.2 }}>
            {subtitle}
          </Box>
        </Box>
      </Box>
      <CardContent sx={{ p: 3 }}>{children}</CardContent>
    </Card>
  );
}

// ── Field Label ───────────────────────────────────────────────────────────────
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
      }}
    >
      {children}
    </Box>
  );
}

// ── Labeled Select ────────────────────────────────────────────────────────────
function LabeledSelect({ label, name, value, onChange, options }) {
  return (
    <Box>
      <FieldLabel>{label}</FieldLabel>
      <FormControl fullWidth size="small">
        <Select
          name={name}
          value={value}
          onChange={onChange}
          sx={
            fieldSx["& .MuiOutlinedInput-root"]
              ? fieldSx
              : {
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    "&:hover fieldset": { borderColor: "#0097b2" },
                    "&.Mui-focused fieldset": { borderColor: "#0097b2" },
                  },
                  "& .MuiSelect-select": { color: "#000" },
                }
          }
        >
          {options.map((o) => (
            <MenuItem key={o.value} value={o.value}>
              {o.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default function SupplierSettings() {
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [pickupAddresses, setPickupAddresses] = useState([]);
  const [editingAddressId, setEditingAddressId] = useState(null);

  const [newAddress, setNewAddress] = useState({
    id: null,
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "IN",
    isDefault: false,
    isEnabled: true,
  });

  const [shippingLabel, setShippingLabel] = useState({
    labelProvider: "dhl",
    defaultSize: "a4",
    autoGenerate: true,
    labelFormat: "pdf",
  });

  const [autoShipping, setAutoShipping] = useState({
    enabled: false,
    autoShipAfterPayment: true,
    autoShipDelay: "0",
    generateLabel: true,
    notifyCustomer: true,
    defaultCarrier: "dhl",
  });

  const handleShippingLabelChange = (e) => {
    const { name, value, type, checked } = e.target;
    setShippingLabel({
      ...shippingLabel,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAutoShippingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAutoShipping({
      ...autoShipping,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAddress({
      ...newAddress,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSaveSettings = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleAddAddress = () => {
    setEditingAddressId(null);
    setNewAddress({
      id: null,
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "IN",
      isDefault: false,
      isEnabled: true,
    });
    setOpenDialog(true);
  };

  const handleEditAddress = (address) => {
    setEditingAddressId(address.id);
    setNewAddress(address);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingAddressId(null);
  };

  const handleSaveAddress = () => {
    if (!newAddress.fullName || !newAddress.street || !newAddress.city) {
      alert("Please fill in all required fields");
      return;
    }
    if (editingAddressId !== null) {
      setPickupAddresses(
        pickupAddresses.map((a) =>
          a.id === editingAddressId ? newAddress : a,
        ),
      );
    } else {
      setPickupAddresses([
        ...pickupAddresses,
        { ...newAddress, id: Date.now() },
      ]);
    }
    handleSaveSettings();
    handleCloseDialog();
  };

  const handleDeleteAddress = (id) => {
    setPickupAddresses(pickupAddresses.filter((a) => a.id !== id));
    handleSaveSettings();
  };
  const handleToggleAddress = (id) =>
    setPickupAddresses(
      pickupAddresses.map((a) =>
        a.id === id ? { ...a, isEnabled: !a.isEnabled } : a,
      ),
    );
  const handleSetDefault = (id) => {
    setPickupAddresses(
      pickupAddresses.map((a) => ({ ...a, isDefault: a.id === id })),
    );
    handleSaveSettings();
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4fbfc", py: 4 }}>
      <Container maxWidth="lg">
        {/* ── Save success toast ── */}
        {saveSuccess && (
          <Box
            sx={{
              mb: 3,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              background: "rgba(126,217,87,0.12)",
              border: "1.5px solid rgba(126,217,87,0.4)",
              borderRadius: "12px",
              px: 2.5,
              py: 1.5,
            }}
          >
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#7ed957,#4caf50)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="14"
                height="14"
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
            <Box
              sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#2e7d1e" }}
            >
              Settings saved successfully!
            </Box>
          </Box>
        )}

        {/* ── Page Header ── */}
        <Box sx={{ mb: 4, display: "flex", alignItems: "flex-start", gap: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "13px",
              background: GRADIENT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 14px rgba(0,151,178,0.25)",
              flexShrink: 0,
            }}
          >
            <SettingsIcon sx={{ "& path": { fill: "#fff !important" } }} />{" "}
          </Box>
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: "#000",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              Settings
            </Typography>
            <Typography variant="body2" sx={{ color: "#555", mt: 0.5 }}>
              Manage your shipping labels, auto-shipping preferences, and pickup
              addresses
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {/* ── Shipping Label Settings ── */}
          <Grid item xs={12} md={6}>
            <SettingsCard
              icon={
                <LocalShippingIcon
                  sx={{ "& path": { fill: "#fff !important" } }}
                />
              }
              title="Shipping Label Settings"
              subtitle="Configure label generation preferences"
            >
              <Stack spacing={2.5}>
                <LabeledSelect
                  label="Label Provider"
                  name="labelProvider"
                  value={shippingLabel.labelProvider}
                  onChange={handleShippingLabelChange}
                  options={[
                    { value: "dhl", label: "DHL" },
                    { value: "fedex", label: "FedEx" },
                    { value: "ups", label: "UPS" },
                    { value: "usps", label: "USPS" },
                  ]}
                />
                <LabeledSelect
                  label="Default Label Size"
                  name="defaultSize"
                  value={shippingLabel.defaultSize}
                  onChange={handleShippingLabelChange}
                  options={[
                    { value: "a4", label: "A4" },
                    { value: "a6", label: "A6 (4×6)" },
                    { value: "letter", label: "Letter" },
                  ]}
                />
                <LabeledSelect
                  label="Label Format"
                  name="labelFormat"
                  value={shippingLabel.labelFormat}
                  onChange={handleShippingLabelChange}
                  options={[
                    { value: "pdf", label: "PDF" },
                    { value: "zpl", label: "ZPL" },
                    { value: "png", label: "PNG" },
                  ]}
                />

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "#f0fafc",
                    border: "1px solid #d0eef3",
                    borderRadius: "10px",
                    px: 2,
                    py: 1.2,
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "#000",
                      }}
                    >
                      Auto-generate labels
                    </Box>
                    <Box sx={{ fontSize: "0.75rem", color: "#666" }}>
                      For new orders automatically
                    </Box>
                  </Box>
                  <Switch
                    name="autoGenerate"
                    checked={shippingLabel.autoGenerate}
                    onChange={handleShippingLabelChange}
                    sx={switchSx}
                  />
                </Box>

                <GradientButton
                  fullWidth
                  onClick={handleSaveSettings}
                  startIcon={
                    <SaveIcon
                      sx={{
                        fontSize: 16,
                        "& path": { fill: "#fff !important" },
                      }}
                    />
                  }
                >
                  Save Label Settings
                </GradientButton>
              </Stack>
            </SettingsCard>
          </Grid>

          {/* ── Auto Shipping Settings ── */}
          <Grid item xs={12} md={6}>
            <SettingsCard
              icon={
                <LocalShippingIcon
                  sx={{ "& path": { fill: "#fff !important" } }}
                />
              }
              title="Auto Shipping Settings"
              subtitle="Enable automatic order shipping"
            >
              <Stack spacing={2.5}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "#f0fafc",
                    border: "1px solid #d0eef3",
                    borderRadius: "10px",
                    px: 2,
                    py: 1.2,
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "#000",
                      }}
                    >
                      Enable Auto Shipping
                    </Box>
                    <Box sx={{ fontSize: "0.75rem", color: "#666" }}>
                      Automatically ship paid orders
                    </Box>
                  </Box>
                  <Switch
                    name="enabled"
                    checked={autoShipping.enabled}
                    onChange={handleAutoShippingChange}
                    sx={switchSx}
                  />
                </Box>

                {autoShipping.enabled && (
                  <>
                    <LabeledSelect
                      label="Default Carrier"
                      name="defaultCarrier"
                      value={autoShipping.defaultCarrier}
                      onChange={handleAutoShippingChange}
                      options={[
                        { value: "dhl", label: "DHL" },
                        { value: "fedex", label: "FedEx" },
                        { value: "ups", label: "UPS" },
                        { value: "usps", label: "USPS" },
                      ]}
                    />
                    <LabeledSelect
                      label="Auto Ship After Payment"
                      name="autoShipDelay"
                      value={autoShipping.autoShipDelay}
                      onChange={handleAutoShippingChange}
                      options={[
                        { value: "0", label: "Immediately" },
                        { value: "1", label: "1 hour" },
                        { value: "4", label: "4 hours" },
                        { value: "24", label: "24 hours" },
                      ]}
                    />

                    {[
                      {
                        name: "generateLabel",
                        label: "Auto-generate shipping label",
                        sub: "Create label on ship",
                      },
                      {
                        name: "notifyCustomer",
                        label: "Notify customer when shipped",
                        sub: "Send shipping confirmation",
                      },
                    ].map(({ name, label, sub }) => (
                      <Box
                        key={name}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          background: "#f0fafc",
                          border: "1px solid #d0eef3",
                          borderRadius: "10px",
                          px: 2,
                          py: 1.2,
                        }}
                      >
                        <Box>
                          <Box
                            sx={{
                              fontSize: "0.875rem",
                              fontWeight: 600,
                              color: "#000",
                            }}
                          >
                            {label}
                          </Box>
                          <Box sx={{ fontSize: "0.75rem", color: "#666" }}>
                            {sub}
                          </Box>
                        </Box>
                        <Switch
                          name={name}
                          checked={autoShipping[name]}
                          onChange={handleAutoShippingChange}
                          sx={switchSx}
                        />
                      </Box>
                    ))}
                  </>
                )}

                <GradientButton
                  fullWidth
                  onClick={handleSaveSettings}
                  startIcon={
                    <SaveIcon
                      sx={{
                        fontSize: 16,
                        "& path": { fill: "#fff !important" },
                      }}
                    />
                  }
                >
                  Save Shipping Settings
                </GradientButton>
              </Stack>
            </SettingsCard>
          </Grid>

          {/* ── Pickup Addresses ── */}
          <Grid item xs={12}>
            <SettingsCard
              icon={
                <LocationOnIcon
                  sx={{ "& path": { fill: "#fff !important" } }}
                />
              }
              title="Pickup Addresses"
              subtitle="Manage addresses for order pickups"
            >
              <Stack spacing={3}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{ fontSize: "0.9rem", fontWeight: 600, color: "#000" }}
                  >
                    Saved Addresses
                    <Box
                      component="span"
                      sx={{
                        ml: 1,
                        background: "rgba(0,151,178,0.1)",
                        color: "#0097b2",
                        borderRadius: "20px",
                        px: 1,
                        py: 0.2,
                        fontSize: "0.75rem",
                        fontWeight: 700,
                      }}
                    >
                      {pickupAddresses.length}
                    </Box>
                  </Box>
                  <GradientButton secondary onClick={handleAddAddress}>
                    + Add New Address
                  </GradientButton>
                </Box>

                {pickupAddresses.length === 0 ? (
                  <Box
                    sx={{
                      p: 4,
                      border: "2px dashed #b8e8f0",
                      borderRadius: "12px",
                      background: "#f8fdfe",
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: "12px",
                        background: GRADIENT,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 1.5,
                      }}
                    >
                      <LocationOnIcon
                        sx={{
                          fontSize: 22,
                          "& path": { fill: "#fff !important" },
                        }}
                      />{" "}
                    </Box>
                    <Box
                      sx={{
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        color: "#000",
                        mb: 0.5,
                      }}
                    >
                      No pickup addresses yet
                    </Box>
                    <Box sx={{ fontSize: "0.825rem", color: "#777" }}>
                      Click "Add New Address" to get started.
                    </Box>
                  </Box>
                ) : (
                  <Stack spacing={2}>
                    {pickupAddresses.map((address) => (
                      <Box
                        key={address.id}
                        sx={{
                          p: 2.5,
                          borderRadius: "12px",
                          border: address.isDefault
                            ? "1.5px solid #0097b2"
                            : "1.5px solid #e0f4f7",
                          background: address.isEnabled ? "#fff" : "#f8f8f8",
                          transition: "all 0.2s",
                          boxShadow: address.isDefault
                            ? "0 2px 12px rgba(0,151,178,0.12)"
                            : "none",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            mb: 1.5,
                          }}
                        >
                          <Box sx={{ flex: 1 }}>
                            <Box
                              sx={{
                                display: "flex",
                                gap: 1,
                                alignItems: "center",
                                mb: 0.5,
                              }}
                            >
                              <Box
                                sx={{
                                  fontSize: "0.95rem",
                                  fontWeight: 700,
                                  color: "#000",
                                }}
                              >
                                {address.fullName}
                              </Box>
                              {address.isDefault && (
                                <Box
                                  sx={{
                                    background: GRADIENT,
                                    color: "#fff",
                                    borderRadius: "20px",
                                    px: 1.2,
                                    py: 0.2,
                                    fontSize: "0.68rem",
                                    fontWeight: 700,
                                  }}
                                >
                                  Default
                                </Box>
                              )}
                              {!address.isEnabled && (
                                <Box
                                  sx={{
                                    background: "rgba(229,57,53,0.1)",
                                    color: "#c62828",
                                    border: "1px solid rgba(229,57,53,0.3)",
                                    borderRadius: "20px",
                                    px: 1.2,
                                    py: 0.2,
                                    fontSize: "0.68rem",
                                    fontWeight: 700,
                                  }}
                                >
                                  Disabled
                                </Box>
                              )}
                            </Box>
                            {address.companyName && (
                              <Box
                                sx={{
                                  fontSize: "0.8rem",
                                  color: "#666",
                                  mb: 0.3,
                                }}
                              >
                                {address.companyName}
                              </Box>
                            )}
                            <Box sx={{ fontSize: "0.85rem", color: "#333" }}>
                              {address.street}, {address.city}, {address.state}{" "}
                              {address.zipCode}, {address.country}
                            </Box>
                            <Box
                              sx={{
                                fontSize: "0.8rem",
                                color: "#777",
                                mt: 0.3,
                              }}
                            >
                              {address.email} · {address.phone}
                            </Box>
                          </Box>
                          <Stack direction="row" spacing={0.5}>
                            <IconButton
                              size="small"
                              onClick={() => handleEditAddress(address)}
                              sx={{
                                color: "#0097b2",
                                border: "1px solid #d0eef3",
                                borderRadius: "8px",
                                "&:hover": {
                                  background: "rgba(0,151,178,0.08)",
                                },
                              }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleDeleteAddress(address.id)}
                              sx={{
                                color: "#e53935",
                                border: "1px solid rgba(229,57,53,0.25)",
                                borderRadius: "8px",
                                "&:hover": {
                                  background: "rgba(229,57,53,0.07)",
                                },
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Stack>
                        </Box>

                        <Divider sx={{ borderColor: "#e0f4f7", my: 1.5 }} />

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Switch
                              checked={address.isEnabled}
                              onChange={() => handleToggleAddress(address.id)}
                              size="small"
                              sx={switchSx}
                            />
                            <Box
                              sx={{
                                fontSize: "0.8rem",
                                color: address.isEnabled ? "#2e7d1e" : "#999",
                                fontWeight: 500,
                              }}
                            >
                              {address.isEnabled ? "Enabled" : "Disabled"}
                            </Box>
                          </Box>
                          {!address.isDefault && (
                            <GradientButton
                              size="small"
                              secondary
                              onClick={() => handleSetDefault(address.id)}
                            >
                              Set as Default
                            </GradientButton>
                          )}
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                )}
              </Stack>
            </SettingsCard>
          </Grid>
        </Grid>

        {/* ── Dialog ── */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: "16px",
              border: "1.5px solid #e0f4f7",
              boxShadow: "0 8px 40px rgba(0,151,178,0.15)",
              overflow: "hidden",
            },
          }}
        >
          <DialogTitle
            sx={{
              background: GRADIENT,
              color: "#fff",
              fontWeight: 700,
              fontSize: "1rem",
              py: 2,
              px: 3,
            }}
          >
            {editingAddressId !== null
              ? "✏️ Edit Pickup Address"
              : "📍 Add New Pickup Address"}
          </DialogTitle>

          <DialogContent sx={{ pt: 3, px: 3 }}>
            <Stack spacing={2}>
              {[
                {
                  label: "Full Name",
                  name: "fullName",
                  placeholder: "John Doe",
                },
                {
                  label: "Company Name",
                  name: "companyName",
                  placeholder: "Your Company",
                },
                {
                  label: "Email",
                  name: "email",
                  placeholder: "john@example.com",
                  type: "email",
                },
                {
                  label: "Phone",
                  name: "phone",
                  placeholder: "+91 98765 43210",
                },
                {
                  label: "Street Address",
                  name: "street",
                  placeholder: "123 Business Street",
                },
              ].map(({ label, name, placeholder, type }) => (
                <Box key={name}>
                  <FieldLabel>{label}</FieldLabel>
                  <TextField
                    fullWidth
                    name={name}
                    value={newAddress[name]}
                    onChange={handleAddressChange}
                    placeholder={placeholder}
                    size="small"
                    type={type || "text"}
                    sx={fieldSx}
                  />
                </Box>
              ))}

              <Grid container spacing={1.5}>
                <Grid item xs={6}>
                  <FieldLabel>City</FieldLabel>
                  <TextField
                    fullWidth
                    name="city"
                    value={newAddress.city}
                    onChange={handleAddressChange}
                    placeholder="Mumbai"
                    size="small"
                    sx={fieldSx}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FieldLabel>State</FieldLabel>
                  <TextField
                    fullWidth
                    name="state"
                    value={newAddress.state}
                    onChange={handleAddressChange}
                    placeholder="Maharashtra"
                    size="small"
                    sx={fieldSx}
                  />
                </Grid>
              </Grid>

              <Box>
                <FieldLabel>ZIP Code</FieldLabel>
                <TextField
                  fullWidth
                  name="zipCode"
                  value={newAddress.zipCode}
                  onChange={handleAddressChange}
                  placeholder="400001"
                  size="small"
                  sx={fieldSx}
                />
              </Box>

              <Box>
                <FieldLabel>Country</FieldLabel>
                <FormControl fullWidth size="small">
                  <Select
                    name="country"
                    value={newAddress.country}
                    onChange={handleAddressChange}
                    sx={{
                      borderRadius: "10px",
                      "& fieldset": { borderColor: "#d0eef3" },
                      "&:hover fieldset": { borderColor: "#0097b2" },
                      "& .MuiSelect-select": { color: "#000" },
                    }}
                  >
                    <MenuItem value="IN">India</MenuItem>
                    <MenuItem value="US">United States</MenuItem>
                    <MenuItem value="UK">United Kingdom</MenuItem>
                    <MenuItem value="CA">Canada</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Stack>
          </DialogContent>

          <DialogActions sx={{ px: 3, py: 2.5, gap: 1 }}>
            <GradientButton secondary onClick={handleCloseDialog}>
              Cancel
            </GradientButton>
            <GradientButton onClick={handleSaveAddress}>
              {editingAddressId !== null ? "Update Address" : "Save Address"}
            </GradientButton>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}

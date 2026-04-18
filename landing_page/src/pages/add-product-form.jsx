"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
  Chip,
  FormControlLabel,
  Checkbox,
  Paper,
  Stack,
  CircularProgress,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  InputAdornment,
  Divider,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { Plus, Trash2, Upload, ChevronDown, X } from "lucide-react";
import {
  addProduct,
  updateProduct,
  getSingleProduct,
  getCategories,
} from "../services/product/product.service";

const GRADIENT = "linear-gradient(135deg, #0097b2 0%, #7ed957 100%)";
const GRADIENT_HOVER = "linear-gradient(135deg, #007a91 0%, #65c040 100%)";

// ── Shared button ─────────────────────────────────────────────────────────────
function GradientButton({
  children,
  onClick,
  secondary = false,
  danger = false,
  size = "medium",
  startIcon,
  fullWidth = false,
  type = "button",
  disabled = false,
}) {
  const [hovered, setHovered] = useState(false);
  const pad = size === "small" ? "7px 16px" : "10px 24px";
  const fontSize = size === "small" ? "0.82rem" : "0.875rem";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "7px",
        padding: pad,
        borderRadius: "10px",
        fontSize,
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        whiteSpace: fullWidth ? "normal" : "nowrap",
        textAlign: fullWidth ? "center" : "left",
        transition: "all 0.2s ease",
        width: fullWidth ? "100%" : "auto",
        maxWidth: "100%",
        boxSizing: "border-box",
        ...(danger
          ? {
              background: hovered ? "#c62828" : "transparent",
              color: hovered ? "#fff" : "#e53935",
              border: "1.5px solid #e53935",
              boxShadow: "none",
            }
          : secondary
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
        opacity: disabled ? 0.6 : 1,
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

// ── Styled TextField wrapper ──────────────────────────────────────────────────
const fieldSx = {
  width: "100%",
  maxWidth: "100%",
  minWidth: 0,
  boxSizing: "border-box",
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    background: "#fff",
    minWidth: 0,
    "&:hover fieldset": { borderColor: "#0097b2" },
    "&.Mui-focused fieldset": {
      borderColor: "#0097b2",
      boxShadow: "0 0 0 3px rgba(0,151,178,0.1)",
    },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#0097b2" },
  "& .MuiInputBase-input": { color: "#000", minWidth: 0 },
};

const gridContainerSx = {
  minWidth: 0,
  width: "100%",
  "& > .MuiGrid-item": { minWidth: 0 },
};

export default function AddProductForm({ initialProduct, onSuccess }) {
  const params = useParams();
  const productId = params.product_id;
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    brand: "",
    category_id: "",
    mrp: 0,
    bulk_price: 0,
    transfer_price: 0,
    approval_status: "draft",
    lifecycle_status: "inactive",
    productGallery: [],
    options: [],
    variants: [],
    images: [],
  });
  const [expandedVariant, setExpandedVariant] = useState(null);
  const [categories, setCategories] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getSingleProduct(productId),
    enabled: !!productId,
  });

  useEffect(() => {
    getCategories()
      .then((list) => setCategories(Array.isArray(list) ? list : []))
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    if (product?.data) {
      setFormData((prev) => ({
        ...prev,
        title: product.data.title ?? prev.title,
        description: product.data.description ?? prev.description,
        brand: product.data.brand ?? prev.brand,
        category_id: product.data.category_id ?? prev.category_id ?? "",
        mrp: product.data.mrp ?? "",
        bulk_price: product.data.bulk_price ?? "",
        transfer_price: product.data.transfer_price ?? "",
        approval_status: product.data.approval_status ?? prev.approval_status,
        productGallery: product.data.images ?? prev.productGallery,
        variants: product.data.variants ?? prev.variants,
      }));
    }
  }, [product]);

  const handleProductChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const addVariant = () => {
    const id = Date.now().toString();
    const newVariant = {
      id,
      sku: "",
      price: 0,
      compare_at_price: 0,
      inventory_quantity: 0,
      weight_grams: 0,
      title: "",
      option1: "",
      option2: "",
      option3: "",
      attributes: {},
      images: [],
    };

    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, newVariant],
    }));
    setExpandedVariant(id);
  };

  const updateVariant = (id, field, value) =>
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((v) =>
        v.id === id ? { ...v, [field]: value } : v,
      ),
    }));

  const updateVariantAttribute = (id, attribute, value) =>
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((v) =>
        v.id === id
          ? { ...v, attributes: { ...v.attributes, [attribute]: value } }
          : v,
      ),
    }));

  const removeVariant = (id) =>
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter((v) => v.id !== id),
    }));

  const handleProductImageUpload = (files) => {
    if (files) {
      const fileArray = Array.from(files);
      setFormData((prev) => ({
        ...prev,
        productGallery: [...prev.productGallery, ...Array.from(files)],
        images: [...prev.images, ...fileArray],
      }));
    }
  };

  const removeProductImage = (index) =>
    setFormData((prev) => ({
      ...prev,
      productGallery: prev.productGallery.filter((_, i) => i !== index),
      images: prev.images.filter((_, i) => i !== index),
    }));

  const addOption = () =>
    setFormData((prev) => ({
      ...prev,
      options: [
        ...prev.options,
        { name: "", position: prev.options.length + 1, values: [] },
      ],
    }));

  const updateOption = (index, field, value) =>
    setFormData((prev) => ({
      ...prev,
      options: prev.options.map((opt, idx) =>
        idx === index ? { ...opt, [field]: value } : opt,
      ),
    }));

  const updateOptionValues = (index, rawValues) =>
    setFormData((prev) => ({
      ...prev,
      options: prev.options.map((opt, idx) =>
        idx === index
          ? {
              ...opt,
              values: rawValues
                .split(",")
                .map((v) => v.trim())
                .filter(Boolean),
            }
          : opt,
      ),
    }));

  const removeOption = (index) =>
    setFormData((prev) => ({
      ...prev,
      options: prev.options
        .filter((_, idx) => idx !== index)
        .map((opt, idx) => ({ ...opt, position: idx + 1 })),
    }));

  // ✅ FIX 1: alert and onSuccess only fire on success, error is caught and shown
  const handleSaveDraft = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      approval_status: "draft",
      lifecycle_status: formData.lifecycle_status || "inactive",
      id: formData.id || Date.now().toString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await addProduct(payload);
      alert("Product saved as draft successfully!");
      onSuccess?.();
    } catch (err) {
      console.log(err);
      alert("Failed to save draft: " + (err?.message || "Unknown error"));
    }
  };

  // ✅ FIX 2: alert, reset, and navigate only fire on success, error is caught and shown
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.variants.length === 0) {
      alert("Please add at least one variant");
      return;
    }
    setSubmitting(true);
    const form = new FormData();

    // ── Top-level fields ──
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("brand", formData.brand);
    form.append("category_id", formData.category_id);
    form.append("approval_status", formData.approval_status);
    form.append("mrp", formData.mrp);
    form.append("bulk_price", formData.bulk_price);
    form.append("transfer_price", formData.transfer_price);

    // ── Options & Variants as JSON strings ──
    form.append(
      "options",
      JSON.stringify(
        formData.options.map((opt, idx) => ({
          name: opt.name,
          position: idx + 1,
          values: opt.values,
        })),
      ),
    );

    form.append(
      "variants",
      JSON.stringify(
        formData.variants.map((variant) => ({
          sku: variant.sku,
          title: variant.title,
          price: Number(variant.price),
          compare_at_price: Number(variant.compare_at_price),
          inventory_quantity: Number(variant.inventory_quantity),
          weight_grams: Number(variant.weight_grams),
          option1: variant.option1 || null,
          option2: variant.option2 || null,
          option3: variant.option3 || null,
          images: [],
          dimension_cm: {
            height: Number(variant.dimension_cm?.height) || 0,
            width: Number(variant.dimension_cm?.width) || 0,
            length: Number(variant.dimension_cm?.length) || 0,
          },
        })),
      ),
    );

    // ── Images ──
    formData.images.forEach((file) => {
      form.append("images", file);
    });

    try {
      if (productId) {
        await updateProduct(productId, form);
      } else {
        await addProduct(form);
      }

      alert("Product submitted successfully!");

      setFormData({
        title: "",
        description: "",
        brand: "",
        category_id: "",
        approval_status: "draft",
        lifecycle_status: "inactive",
        productGallery: [],
        options: [],
        variants: [],
        images: [],
        mrp: "",
        bulk_price: "",
        transfer_price: "",
      });

      onSuccess?.();
      navigate("/products");
    } catch (err) {
      console.log(err);
      const apiError = err?.response?.data?.error;
      const apiMessage = err?.response?.data?.message;
      const fallback = err?.message || "Unknown error";

      alert(
        "Failed to submit product: " + (apiError || apiMessage || fallback),
      );
    } finally {
      setSubmitting(false); // 🔥 stop loading (VERY IMPORTANT)
    }
  };

  // ✅ FIX 3: isLoading check is back at the top level of the component, not inside handleSubmit
  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          maxWidth: "100%",
          minWidth: 0,
          boxSizing: "border-box",
          px: 2,
          bgcolor: "#f4fbfc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress sx={{ color: "#0097b2", mb: 2 }} />
          <Typography sx={{ color: "#0097b2", fontWeight: 500 }}>
            Loading product…
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,
        boxSizing: "border-box",
        bgcolor: "#f4fbfc",
        py: { xs: 2, sm: 4 },
        overflowX: "hidden",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          px: { xs: 1.5, sm: 2, md: 3 },
          minWidth: 0,
          width: "100%",
          maxWidth: "100%",
        }}
      >
        {/* Page Header */}
        <Box sx={{ mb: { xs: 2, sm: 4 }, minWidth: 0 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 800,
              mb: 0.5,
              color: "#000",
              letterSpacing: "-0.02em",
              fontSize: { xs: "1.5rem", sm: "2rem" },
              wordBreak: "break-word",
            }}
          >
            {productId ? "Edit Product" : "Add New Product"}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#555",
              fontSize: "0.9rem",
              wordBreak: "break-word",
            }}
          >
            {productId
              ? "Update your product details and variants"
              : "Create a new product with variants and specifications"}
          </Typography>
        </Box>

        <form style={{ width: "100%", minWidth: 0, maxWidth: "100%" }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: "18px",
              border: "1.5px solid #e0f4f7",
              overflow: "hidden",
              maxWidth: "100%",
              minWidth: 0,
              width: "100%",
              boxShadow: "0 2px 20px rgba(0,151,178,0.08)",
            }}
          >
            {/* ── Custom Tab Bar ── */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                borderBottom: "1.5px solid #e0f4f7",
                bgcolor: "#f8fdfe",
                minWidth: 0,
                overflowX: { xs: "visible", sm: "auto" },
                WebkitOverflowScrolling: "touch",
              }}
            >
              {["Product Details", "Variants"].map((label, idx) => {
                const isActive = activeTab === idx;
                return (
                  <Box
                    key={label}
                    component="button"
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    sx={{
                      flex: { sm: "1 1 0" },
                      minWidth: 0,
                      py: 1.5,
                      px: { xs: 2, sm: "clamp(8px, 2.5vw, 22px)" },
                      fontSize: {
                        xs: "0.88rem",
                        sm: "clamp(0.78rem, 2.8vw, 0.9rem)",
                      },
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? "#0097b2" : "#666",
                      background: isActive
                        ? "rgba(0,151,178,0.06)"
                        : "transparent",
                      border: "none",
                      borderLeft: {
                        xs: isActive
                          ? "3px solid #0097b2"
                          : "3px solid transparent",
                        sm: "none",
                      },
                      borderTop: {
                        xs: idx > 0 ? "1px solid #e0f4f7" : "none",
                        sm: "none",
                      },
                      borderBottom: {
                        xs: "none",
                        sm: isActive
                          ? "3px solid #0097b2"
                          : "3px solid transparent",
                      },
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      letterSpacing: isActive ? "0.01em" : "normal",
                      boxSizing: "border-box",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: { xs: "flex-start", sm: "center" },
                      gap: 1,
                      textAlign: { xs: "left", sm: "center" },
                      flexWrap: "wrap",
                    }}
                  >
                    <Box
                      sx={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: isActive ? GRADIENT : "#e0e0e0",
                        color: "#fff",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {idx + 1}
                    </Box>
                    <Box component="span" sx={{ wordBreak: "break-word" }}>
                      {label}
                    </Box>
                  </Box>
                );
              })}
            </Box>

            {/* ── Product Details Tab ── */}
            {activeTab === 0 && (
              <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, minWidth: 0 }}>
                <Grid container spacing={3} sx={gridContainerSx}>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Product Title"
                      placeholder="e.g., Cotton pajama"
                      value={formData.title}
                      onChange={(e) =>
                        handleProductChange("title", e.target.value)
                      }
                      required
                      variant="outlined"
                      sx={fieldSx}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={3}
                      sx={{ width: "100%", alignItems: { sm: "flex-start" } }}
                    >
                      <TextField
                        fullWidth
                        label="Brand"
                        placeholder="e.g., UrbanWear"
                        value={formData.brand}
                        onChange={(e) =>
                          handleProductChange("brand", e.target.value)
                        }
                        variant="outlined"
                        sx={{
                          ...fieldSx,
                          flex: { sm: "1 1 0" },
                          minWidth: { sm: 0 },
                        }}
                      />
                      <FormControl
                        fullWidth
                        variant="outlined"
                        sx={{
                          ...fieldSx,
                          flex: { sm: "1 1 0" },
                          minWidth: { xs: "100%", sm: 0 },
                          maxWidth: { xs: "100%", sm: "none" },
                        }}
                      >
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                          labelId="category-label"
                          label="Category"
                          value={formData.category_id ?? ""}
                          onChange={(e) =>
                            handleProductChange("category_id", e.target.value)
                          }
                          MenuProps={{
                            PaperProps: {
                              sx: {
                                maxHeight: 320,
                                minWidth: 0,
                                maxWidth: "min(100vw - 24px, 360px)",
                              },
                            },
                            anchorOrigin: {
                              vertical: "bottom",
                              horizontal: "left",
                            },
                            transformOrigin: {
                              vertical: "top",
                              horizontal: "left",
                            },
                          }}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {categories.map((cat) => (
                            <MenuItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {categories.length === 0 && (
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ mt: 0.5, display: "block" }}
                          >
                            No categories available. Create categories in the
                            admin panel.
                          </Typography>
                        )}
                      </FormControl>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 700, color: "#000", mb: 1 }}
                    >
                      Pricing
                    </Typography>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      label="MRP"
                      type="text"
                      value={formData.mrp}
                      onChange={(e) =>
                        handleProductChange("mrp", e.target.value)
                      }
                      sx={fieldSx}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      label="Bulk Price"
                      type="text"
                      value={formData.bulk_price}
                      onChange={(e) =>
                        handleProductChange("bulk_price", e.target.value)
                      }
                      sx={fieldSx}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      label="Transfer Price"
                      type="text"
                      value={formData.transfer_price}
                      onChange={(e) =>
                        handleProductChange("transfer_price", e.target.value)
                      }
                      sx={fieldSx}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: { xs: "stretch", sm: "center" },
                        justifyContent: "space-between",
                        gap: 1.5,
                        mb: 1,
                        minWidth: 0,
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 700, color: "#000" }}
                      >
                        Options
                      </Typography>
                      <Box sx={{ width: { xs: "100%", sm: "auto" } }}>
                        <GradientButton
                          secondary
                          size="small"
                          fullWidth
                          startIcon={<Plus size={15} />}
                          onClick={addOption}
                        >
                          Add Option
                        </GradientButton>
                      </Box>
                    </Box>

                    {formData.options.length === 0 ? (
                      <Typography sx={{ color: "#777", fontSize: "0.875rem" }}>
                        Add option groups (e.g., Color, Size) and their values.
                      </Typography>
                    ) : (
                      <Stack spacing={2}>
                        {formData.options.map((opt, idx) => (
                          <Paper
                            key={idx}
                            variant="outlined"
                            sx={{ p: 2, borderRadius: "14px" }}
                          >
                            <Grid
                              container
                              spacing={2}
                              alignItems="center"
                              sx={gridContainerSx}
                            >
                              <Grid size={{ xs: 12, sm: 4 }}>
                                <TextField
                                  fullWidth
                                  label="Option name"
                                  placeholder="Color"
                                  value={opt.name}
                                  onChange={(e) =>
                                    updateOption(idx, "name", e.target.value)
                                  }
                                  size="small"
                                  sx={fieldSx}
                                />
                              </Grid>
                              <Grid size={{ xs: 12, sm: 3 }}>
                                <TextField
                                  fullWidth
                                  label="Position"
                                  type="number"
                                  value={opt.position}
                                  onChange={(e) =>
                                    updateOption(
                                      idx,
                                      "position",
                                      parseInt(e.target.value, 10) || 0,
                                    )
                                  }
                                  size="small"
                                  sx={fieldSx}
                                />
                              </Grid>
                              <Grid size={{ xs: 12, sm: 4 }}>
                                <TextField
                                  fullWidth
                                  label="Values"
                                  placeholder="Black, White, Blue"
                                  value={opt.values.join(", ")}
                                  onChange={(e) =>
                                    updateOptionValues(idx, e.target.value)
                                  }
                                  size="small"
                                  sx={fieldSx}
                                />
                              </Grid>
                              <Grid
                                size={{ xs: 12, sm: "auto" }}
                                sx={{
                                  display: "flex",
                                  justifyContent: {
                                    xs: "flex-end",
                                    sm: "center",
                                  },
                                  alignItems: "center",
                                }}
                              >
                                <IconButton
                                  onClick={() => removeOption(idx)}
                                  sx={{
                                    color: "#c62828",
                                    bgcolor: "rgba(198,40,40,0.12)",
                                    "&:hover": {
                                      bgcolor: "rgba(198,40,40,0.18)",
                                    },
                                  }}
                                >
                                  <X size={16} />
                                </IconButton>
                              </Grid>
                            </Grid>
                          </Paper>
                        ))}
                      </Stack>
                    )}
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      select
                      fullWidth
                      label="Approval Status"
                      value={formData.approval_status}
                      onChange={(e) =>
                        handleProductChange("approval_status", e.target.value)
                      }
                      variant="outlined"
                      sx={fieldSx}
                    >
                      <MenuItem value="draft">Draft</MenuItem>
                      <MenuItem value="submitted">Submitted</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Description"
                      placeholder="Premium cotton t-shirt for daily wear"
                      value={formData.description}
                      onChange={(e) =>
                        handleProductChange("description", e.target.value)
                      }
                      variant="outlined"
                      multiline
                      rows={5}
                      sx={fieldSx}
                    />
                  </Grid>

                  {/* Image Upload */}
                  <Grid size={{ xs: 12 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 700, mb: 1.5, color: "#000" }}
                    >
                      Product Gallery
                    </Typography>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleProductImageUpload(e.target.files)}
                      style={{ display: "none" }}
                      id="product-image-upload"
                    />
                    <label
                      htmlFor="product-image-upload"
                      style={{ display: "block", cursor: "pointer" }}
                    >
                      <Paper
                        variant="outlined"
                        sx={{
                          p: { xs: 2.5, sm: 4 },
                          textAlign: "center",
                          border: "2px dashed #b8e8f0",
                          borderRadius: "14px",
                          bgcolor: "#f8fdfe",
                          transition: "all 0.2s",
                          minWidth: 0,
                          "&:hover": {
                            borderColor: "#0097b2",
                            bgcolor: "#edf8fb",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: "12px",
                            background: GRADIENT,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mx: "auto",
                            mb: 1.5,
                          }}
                        >
                          <Upload size={22} color="#fff" />
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#555",
                            mb: 0.5,
                            fontWeight: 500,
                            px: 0.5,
                            wordBreak: "break-word",
                          }}
                        >
                          Drag and drop images or click to upload
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#999",
                            px: 0.5,
                            wordBreak: "break-word",
                          }}
                        >
                          PNG, JPG, WEBP up to 10MB
                        </Typography>
                      </Paper>
                    </label>

                    {formData.productGallery.length > 0 && (
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ mt: 2, flexWrap: "wrap", gap: 1 }}
                      >
                        {formData.productGallery.map((img, idx) => (
                          <Chip
                            key={idx}
                            label={img.name || `Image ${idx + 1}`}
                            size="small"
                            onDelete={() => removeProductImage(idx)}
                            sx={{
                              maxWidth: "100%",
                              bgcolor: "rgba(0,151,178,0.08)",
                              color: "#0097b2",
                              border: "1px solid rgba(0,151,178,0.25)",
                              fontWeight: 500,
                              "& .MuiChip-label": {
                                display: "block",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              },
                              "& .MuiChip-deleteIcon": { color: "#0097b2" },
                            }}
                          />
                        ))}
                      </Stack>
                    )}
                  </Grid>
                </Grid>

                <Stack
                  direction={{ xs: "column-reverse", sm: "row" }}
                  sx={{
                    mt: 4,
                    justifyContent: { xs: "stretch", sm: "flex-end" },
                    gap: 2,
                    "& > button": {
                      width: { xs: "100%", sm: "auto" },
                      justifyContent: "center",
                    },
                  }}
                >
                  <GradientButton secondary onClick={handleSaveDraft}>
                    Save as Draft
                  </GradientButton>
                  <GradientButton onClick={() => setActiveTab(1)}>
                    Continue to Variants →
                  </GradientButton>
                </Stack>
              </Box>
            )}

            {/* ── Variants Tab ── */}
            {activeTab === 1 && (
              <Box
                sx={{
                  p: { xs: 2, sm: 3, md: 4 },
                  minWidth: 0,
                  maxWidth: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "stretch", sm: "center" },
                    justifyContent: "space-between",
                    mb: 3,
                    gap: 2,
                    minWidth: 0,
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: "1rem", sm: "1.1rem" },
                      minWidth: 0,
                    }}
                  >
                    Product Variants
                  </Typography>
                  <Box sx={{ width: { xs: "100%", sm: "auto" } }}>
                    {/* <GradientButton
                      fullWidth
                      startIcon={<Plus size={15} />}
                      onClick={() => {
                        addVariant();
                      }}
                    >
                      Add Variant
                    </GradientButton> */}
                  </Box>
                </Box>

                {formData.variants.length === 0 ? (
                  <Paper
                    variant="outlined"
                    sx={{
                      p: { xs: 4, sm: 6 },
                      textAlign: "center",
                      border: "2px dashed #b8e8f0",
                      borderRadius: "14px",
                      bgcolor: "#f8fdfe",
                      minWidth: 0,
                    }}
                  >
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: "14px",
                        background: GRADIENT,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 2,
                      }}
                    >
                      <Plus size={26} color="#fff" />
                    </Box>
                    <Typography
                      sx={{
                        color: "#1a1a1a",
                        fontWeight: 700,
                        fontSize: "1rem",
                        mb: 0.5,
                      }}
                    >
                      No variants yet
                    </Typography>
                    <Typography
                      sx={{
                        color: "#777",
                        fontSize: "0.875rem",
                        mb: 3,
                        wordBreak: "break-word",
                        px: { xs: 0.5, sm: 0 },
                      }}
                    >
                      Add product variants like size, color, and stock
                    </Typography>
                    <Box
                      sx={{
                        width: "100%",
                        maxWidth: 360,
                        mx: "auto",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <GradientButton
                        fullWidth
                        startIcon={<Plus size={15} />}
                        onClick={addVariant}
                      >
                        Add First Variant
                      </GradientButton>
                    </Box>
                  </Paper>
                ) : (
                  <Stack spacing={2}>
                    {formData.variants.map((variant, index) => (
                      <Accordion
                        key={variant.id}
                        expanded={expandedVariant === variant.id}
                        onChange={() =>
                          setExpandedVariant(
                            expandedVariant === variant.id ? null : variant.id,
                          )
                        }
                        sx={{
                          border: "1.5px solid #e0f4f7",
                          borderRadius: "14px",
                          boxShadow: "none",
                          "&.Mui-expanded": {
                            borderColor: "#0097b2",
                            boxShadow: "0 2px 16px rgba(0,151,178,0.1)",
                          },
                        }}
                      >
                        <AccordionSummary
                          expandIcon={
                            <ExpandMoreIcon sx={{ color: "#0097b2" }} />
                          }
                          sx={{
                            bgcolor: "#fafafa",
                            px: { xs: 1.5, sm: 3 },
                            py: 2,
                            minHeight: 64,
                            flexWrap: "wrap",
                            rowGap: 1,
                            columnGap: 1,
                            "& .MuiAccordionSummary-content": {
                              alignItems: "center",
                              gap: 1.5,
                              flexWrap: "wrap",
                              minWidth: 0,
                              margin: "12px 0 !important",
                              flex: "1 1 auto",
                            },
                            "& .MuiAccordionSummary-expandIconWrapper": {
                              flexShrink: 0,
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: "50%",
                              background: GRADIENT,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#fff",
                              fontWeight: 700,
                              fontSize: "0.85rem",
                            }}
                          >
                            {index + 1}
                          </Box>

                          <Box
                            sx={{
                              flex: "1 1 200px",
                              minWidth: 0,
                              maxWidth: "100%",
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              sx={{
                                fontWeight: 700,
                                color: "#000",
                                wordBreak: "break-word",
                              }}
                            >
                              {variant.sku || "Untitled variant"}
                            </Typography>

                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 1,
                                mt: 0.5,
                                alignItems: "center",
                              }}
                            >
                              <Chip
                                label={
                                  variant.price > 0
                                    ? `$${variant.price.toFixed(2)}`
                                    : "No price"
                                }
                                size="small"
                                sx={{
                                  bgcolor: "rgba(255,209,32,0.12)",
                                  color: "#b27a00",
                                  border: "1px solid rgba(255,209,32,0.35)",
                                  fontWeight: 500,
                                  fontSize: "0.7rem",
                                }}
                              />

                              <Chip
                                label={`Qty: ${variant.inventory_quantity || 0}`}
                                size="small"
                                sx={{
                                  bgcolor: "rgba(30,136,229,0.12)",
                                  color: "#0d47a1",
                                  border: "1px solid rgba(30,136,229,0.35)",
                                  fontWeight: 500,
                                  fontSize: "0.7rem",
                                }}
                              />
                            </Box>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              flexShrink: 0,
                              ml: { xs: "auto", sm: 0 },
                            }}
                          >
                            <Chip
                              label={variant.is_active ? "Active" : "Inactive"}
                              size="small"
                              sx={{
                                bgcolor: variant.is_active
                                  ? "rgba(126,217,87,0.15)"
                                  : "rgba(196,40,28,0.12)",
                                color: variant.is_active
                                  ? "#3a8a1e"
                                  : "#c62828",
                                border: variant.is_active
                                  ? "1px solid rgba(126,217,87,0.4)"
                                  : "1px solid rgba(198,40,40,0.35)",
                                fontWeight: 600,
                                fontSize: "0.72rem",
                              }}
                            />

                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeVariant(variant.id);
                              }}
                              sx={{
                                color: "#c62828",
                                bgcolor: "rgba(198,40,40,0.12)",
                                "&:hover": {
                                  bgcolor: "rgba(198,40,40,0.18)",
                                },
                              }}
                            >
                              <X size={14} />
                            </IconButton>
                          </Box>
                        </AccordionSummary>

                        <AccordionDetails
                          sx={{
                            px: { xs: 1.5, sm: 3 },
                            pt: 2,
                            pb: 3,
                            minWidth: 0,
                            overflowX: "hidden",
                          }}
                        >
                          <Grid
                            container
                            spacing={2}
                            alignItems="flex-start"
                            sx={gridContainerSx}
                          >
                            <Grid size={{ xs: 12 }}>
                              <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: 700, color: "#000" }}
                              >
                                Variant Details
                              </Typography>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 4 }}>
                              <TextField
                                fullWidth
                                label="SKU"
                                placeholder="TS-BLK-S"
                                value={variant.sku}
                                onChange={(e) =>
                                  updateVariant(
                                    variant.id,
                                    "sku",
                                    e.target.value,
                                  )
                                }
                                size="small"
                                sx={fieldSx}
                              />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                              <TextField
                                fullWidth
                                label="Title"
                                placeholder="e.g., Black Small"
                                value={variant.title}
                                onChange={(e) =>
                                  updateVariant(
                                    variant.id,
                                    "title",
                                    e.target.value,
                                  )
                                }
                                size="small"
                                sx={fieldSx}
                              />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                              <TextField
                                fullWidth
                                label="Price"
                                type="number"
                                placeholder="499"
                                value={variant.price}
                                onChange={(e) =>
                                  updateVariant(
                                    variant.id,
                                    "price",
                                    parseFloat(e.target.value) || 0,
                                  )
                                }
                                size="small"
                                inputProps={{ step: "0.01" }}
                                sx={fieldSx}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start"></InputAdornment>
                                  ),
                                }}
                              />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                              <TextField
                                fullWidth
                                label="Compare at price"
                                type="number"
                                placeholder="699"
                                value={variant.compare_at_price}
                                onChange={(e) =>
                                  updateVariant(
                                    variant.id,
                                    "compare_at_price",
                                    parseFloat(e.target.value) || 0,
                                  )
                                }
                                size="small"
                                inputProps={{ step: "0.01" }}
                                sx={fieldSx}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start"></InputAdornment>
                                  ),
                                }}
                              />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 4 }}>
                              <TextField
                                fullWidth
                                label="Inventory quantity"
                                type="number"
                                placeholder="50"
                                value={variant.inventory_quantity}
                                onChange={(e) =>
                                  updateVariant(
                                    variant.id,
                                    "inventory_quantity",
                                    parseInt(e.target.value) || 0,
                                  )
                                }
                                size="small"
                                sx={fieldSx}
                              />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                              <TextField
                                fullWidth
                                label="Weight (grams)"
                                type="number"
                                placeholder="200"
                                value={variant.weight_grams}
                                onChange={(e) =>
                                  updateVariant(
                                    variant.id,
                                    "weight_grams",
                                    parseInt(e.target.value) || 0,
                                  )
                                }
                                size="small"
                                sx={fieldSx}
                              />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                              <TextField
                                fullWidth
                                label="Color"
                                placeholder="Black"
                                value={variant.option1}
                                onChange={(e) =>
                                  updateVariant(
                                    variant.id,
                                    "option1",
                                    e.target.value,
                                  )
                                }
                                size="small"
                                sx={fieldSx}
                              />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                              <TextField
                                fullWidth
                                label="Size"
                                placeholder="S"
                                value={variant.option2}
                                onChange={(e) =>
                                  updateVariant(
                                    variant.id,
                                    "option2",
                                    e.target.value,
                                  )
                                }
                                size="small"
                                sx={fieldSx}
                              />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                              <TextField
                                fullWidth
                                label="Material"
                                placeholder="Cotton"
                                value={variant.option3}
                                onChange={(e) =>
                                  updateVariant(
                                    variant.id,
                                    "option3",
                                    e.target.value,
                                  )
                                }
                                size="small"
                                sx={fieldSx}
                              />
                            </Grid>

                            {/* ── Dimensions ── */}
                            <Grid size={{ xs: 12 }}>
                              <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: 700, color: "#000", mt: 1 }}
                              >
                                Dimensions (cm)
                              </Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                              <TextField
                                fullWidth
                                label="Length"
                                type="number"
                                value={variant.dimension_cm?.length ?? 0}
                                onChange={(e) =>
                                  updateVariant(variant.id, "dimension_cm", {
                                    ...variant.dimension_cm,
                                    length: parseFloat(e.target.value) || 0,
                                  })
                                }
                                size="small"
                                sx={fieldSx}
                              />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                              <TextField
                                fullWidth
                                label="Width"
                                type="number"
                                value={variant.dimension_cm?.width ?? 0}
                                onChange={(e) =>
                                  updateVariant(variant.id, "dimension_cm", {
                                    ...variant.dimension_cm,
                                    width: parseFloat(e.target.value) || 0,
                                  })
                                }
                                size="small"
                                sx={fieldSx}
                              />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                              <TextField
                                fullWidth
                                label="Height"
                                type="number"
                                value={variant.dimension_cm?.height ?? 0}
                                onChange={(e) =>
                                  updateVariant(variant.id, "dimension_cm", {
                                    ...variant.dimension_cm,
                                    height: parseFloat(e.target.value) || 0,
                                  })
                                }
                                size="small"
                                sx={fieldSx}
                              />
                            </Grid>
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                    ))}

                    {/* <GradientButton
                      secondary
                      fullWidth
                      startIcon={<Plus size={15} />}
                      onClick={addVariant}
                    >
                      Add Another Variant
                    </GradientButton> */}
                  </Stack>
                )}

                <Stack
                  direction={{ xs: "column-reverse", sm: "row" }}
                  sx={{
                    mt: 4,
                    justifyContent: { xs: "stretch", sm: "flex-end" },
                    gap: 2,
                    "& > button": {
                      width: { xs: "100%", sm: "auto" },
                      justifyContent: "center",
                    },
                  }}
                >
                  <GradientButton secondary onClick={() => setActiveTab(0)}>
                    ← Back to Details
                  </GradientButton>
                  <GradientButton onClick={handleSubmit} disabled={submitting}>
                    {submitting ? (
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <CircularProgress size={16} sx={{ color: "#fff" }} />
                        Submitting...
                      </span>
                    ) : (
                      "Submit Product"
                    )}
                  </GradientButton>
                </Stack>
              </Box>
            )}
          </Paper>
        </form>
      </Container>
    </Box>
  );
}

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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { Plus, Trash2, Upload, ChevronDown, X } from "lucide-react";
import {
  addProduct,
  updateProduct,
  getSingleProduct,
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
}) {
  const [hovered, setHovered] = useState(false);
  const pad = size === "small" ? "7px 16px" : "10px 24px";
  const fontSize = size === "small" ? "0.82rem" : "0.875rem";

  return (
    <button
      type={type}
      onClick={onClick}
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
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "all 0.2s ease",
        width: fullWidth ? "100%" : "auto",
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
};

export default function AddProductForm({ initialProduct, onSuccess }) {
  const params = useParams();
  const productId = params.product_id;
  const navigate = useNavigate(); // ← add this

  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    brand: "",
    categoryId: "",
    approval_status: "draft",
    lifecycle_status: "inactive",
    productGallery: [],
    options: [],
    variants: [],
    minimum_order_quantity: 1,
    mrp: 0,
    bulk_price: 0,
  });
  const [expandedVariant, setExpandedVariant] = useState(null);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getSingleProduct(productId),
    enabled: !!productId,
  });

  useEffect(() => {
    if (product) {
      const productData = product?.data || product;

      setFormData({
        title: productData?.title || "",
        description: productData?.description || "",
        brand: productData?.brand || "",
        categoryId: productData?.category_id || "",
        approval_status: (
          productData?.approval_status || "draft"
        ).toLowerCase(),
        lifecycle_status: productData?.lifecycle_status || "inactive",
        productGallery: productData?.images || [],
        options: productData?.options || [],
        variants: (productData?.variants || []).map((v, idx) => ({
          id: v.variant_id || `loaded-${idx}`,
          ...v,
        })),
        minimum_order_quantity: productData?.minimum_order_quantity || 1,
        mrp: productData?.mrp || 0,
        bulk_price: productData?.bulk_price || 0,
      });
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
      option1: "",
      option2: "",
      attributes: {},
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
      setFormData((prev) => ({
        ...prev,
        productGallery: [...prev.productGallery, ...Array.from(files)],
      }));
    }
  };

  const removeProductImage = (index) =>
    setFormData((prev) => ({
      ...prev,
      productGallery: prev.productGallery.filter((_, i) => i !== index),
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
    } catch (err) {
      console.log(err);
    }

    alert("Product saved as draft successfully!");
    onSuccess?.();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.variants.length === 0) {
      alert("Please add at least one variant");
      return;
    }

    const payload = {
      title: formData.title,
      description: formData.description,
      brand: formData.brand,

      categoryId: Number(formData.categoryId),

      // use selected value
      approval_status: formData.approval_status,

      minimum_order_quantity: Number(formData.minimum_order_quantity),
      mrp: Number(formData.mrp),
      bulk_price: Number(formData.bulk_price),

      options: formData.options.map((opt, idx) => ({
        name: opt.name,
        position: idx + 1,
        values: opt.values,
      })),

      variants: formData.variants.map((variant) => ({
        sku: variant.sku,
        price: Number(variant.price),
        compare_at_price: Number(variant.compare_at_price),
        inventory_quantity: Number(variant.inventory_quantity),
        weight_grams: Number(variant.weight_grams),
        option1: variant.option1 || null,
        option2: variant.option2 || null,
        attributes: variant.attributes || {},
      })),
    };

    try {
      if (productId) {
        await updateProduct(productId, payload);
      } else {
        await addProduct(payload);
      }
    } catch (err) {
      console.log(err);
    }

    alert("Product submitted successfully!");

    setFormData({
      title: "",
      description: "",
      brand: "",
      categoryId: "",
      approval_status: "draft",
      lifecycle_status: "inactive",
      productGallery: [],
      options: [],
      variants: [],

      minimum_order_quantity: 1,
      mrp: 0,
      bulk_price: 0,
    });

    onSuccess?.();
    navigate("/products");
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
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
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4fbfc", py: 4 }}>
      <Container maxWidth="lg">
        {/* Page Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 800,
              mb: 0.5,
              color: "#000",
              letterSpacing: "-0.02em",
            }}
          >
            {productId ? "Edit Product" : "Add New Product"}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#555", fontSize: "0.9rem" }}
          >
            {productId
              ? "Update your product details and variants"
              : "Create a new product with variants and specifications"}
          </Typography>
        </Box>

        <form>
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
              }}
            >
              {["Product Details", "Variants"].map((label, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    style={{
                      flex: 1,
                      padding: "16px 24px",
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
                      letterSpacing: isActive ? "0.01em" : "normal",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                      }}
                    >
                      {/* Step circle */}
                      <span
                        style={{
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
                        }}
                      >
                        {idx + 1}
                      </span>
                      {label}
                    </span>
                  </button>
                );
              })}
            </Box>

            {/* ── Product Details Tab ── */}
            {activeTab === 0 && (
              <Box sx={{ p: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
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
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Brand"
                      placeholder="e.g., UrbanWear"
                      value={formData.brand}
                      onChange={(e) =>
                        handleProductChange("brand", e.target.value)
                      }
                      variant="outlined"
                      sx={fieldSx}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Category ID"
                      placeholder="b2f5b1c9-9c22-..."
                      value={formData.categoryId}
                      onChange={(e) =>
                        handleProductChange("categoryId", e.target.value)
                      }
                      variant="outlined"
                      sx={fieldSx}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Minimum Order Quantity"
                      type="number"
                      value={formData.minimum_order_quantity}
                      onChange={(e) =>
                        handleProductChange(
                          "minimum_order_quantity",
                          parseInt(e.target.value) || 1,
                        )
                      }
                      size="small"
                      sx={fieldSx}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="MRP"
                      type="number"
                      value={formData.mrp}
                      onChange={(e) =>
                        handleProductChange(
                          "mrp",
                          parseFloat(e.target.value) || 0,
                        )
                      }
                      size="small"
                      sx={fieldSx}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">₹</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Bulk Price"
                      type="number"
                      value={formData.bulk_price}
                      onChange={(e) =>
                        handleProductChange(
                          "bulk_price",
                          parseFloat(e.target.value) || 0,
                        )
                      }
                      size="small"
                      sx={fieldSx}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">₹</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 700, color: "#000" }}
                      >
                        Options
                      </Typography>
                      <GradientButton
                        secondary
                        size="small"
                        startIcon={<Plus size={15} />}
                        onClick={addOption}
                      >
                        Add Option
                      </GradientButton>
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
                            <Grid container spacing={2} alignItems="center">
                              <Grid item xs={12} sm={4}>
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
                              <Grid item xs={12} sm={3}>
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
                              <Grid item xs={12} sm={4}>
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
                              <Grid item xs={12} sm={1}>
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

                  <Grid item xs={12} sm={6}>
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

                  {/* Replace the Description and Image Upload Grid items with these */}

                  <Grid item xs={12} sm={6}>
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
                      rows={8}
                      sx={{
                        ...fieldSx,
                        height: "100%",
                        "& .MuiInputBase-root": {
                          height: "100%",
                          alignItems: "flex-start",
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
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
                      style={{
                        display: "block",
                        cursor: "pointer",
                        height: "calc(100% - 32px)",
                      }}
                    >
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 4,
                          textAlign: "center",
                          border: "2px dashed #b8e8f0",
                          borderRadius: "14px",
                          bgcolor: "#f8fdfe",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.2s",
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
                            mb: 1.5,
                          }}
                        >
                          <Upload size={22} color="#fff" />
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{ color: "#555", mb: 0.5, fontWeight: 500 }}
                        >
                          Drag and drop images or click to upload
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#999" }}>
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
                              bgcolor: "rgba(0,151,178,0.08)",
                              color: "#0097b2",
                              border: "1px solid rgba(0,151,178,0.25)",
                              fontWeight: 500,
                              "& .MuiChip-deleteIcon": { color: "#0097b2" },
                            }}
                          />
                        ))}
                      </Stack>
                    )}
                  </Grid>
                </Grid>

                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ mt: 4, justifyContent: "flex-end" }}
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
              <Box sx={{ p: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 3,
                    gap: 2,
                  }}
                >
                  <Typography sx={{ fontWeight: 700, fontSize: "1.1rem" }}>
                    Product Variants
                  </Typography>
                  <GradientButton
                    startIcon={<Plus size={15} />}
                    onClick={() => {
                      addVariant();
                    }}
                  >
                    Add Variant
                  </GradientButton>
                </Box>

                {formData.variants.length === 0 ? (
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 6,
                      textAlign: "center",
                      border: "2px dashed #b8e8f0",
                      borderRadius: "14px",
                      bgcolor: "#f8fdfe",
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
                      sx={{ color: "#777", fontSize: "0.875rem", mb: 3 }}
                    >
                      Add product variants like size, color, and stock
                    </Typography>
                    <GradientButton
                      startIcon={<Plus size={15} />}
                      onClick={addVariant}
                    >
                      Add First Variant
                    </GradientButton>
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
                            px: 3,
                            py: 2,
                            minHeight: 64,
                            "& .MuiAccordionSummary-content": {
                              alignItems: "center",
                              gap: 2,
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

                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: 700, color: "#000" }}
                              noWrap
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

                          <Chip
                            label={variant.is_active ? "Active" : "Inactive"}
                            size="small"
                            sx={{
                              bgcolor: variant.is_active
                                ? "rgba(126,217,87,0.15)"
                                : "rgba(196,40,28,0.12)",
                              color: variant.is_active ? "#3a8a1e" : "#c62828",
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
                        </AccordionSummary>

                        <AccordionDetails sx={{ px: 3, pt: 2, pb: 3 }}>
                          <Grid container spacing={2} alignItems="flex-start">
                            <Grid item xs={12}>
                              <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: 700, color: "#000" }}
                              >
                                Variant Details
                              </Typography>
                            </Grid>

                            <Grid item xs={12} sm={4}>
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
                            <Grid item xs={12} sm={4}>
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
                                    <InputAdornment position="start">
                                      $
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={4}>
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
                                    <InputAdornment position="start">
                                      $
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Grid>

                            <Grid item xs={12} sm={4}>
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
                            <Grid item xs={12} sm={4}>
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
                            <Grid item xs={12} sm={4}>
                              <TextField
                                fullWidth
                                label="Material"
                                placeholder="cotton"
                                value={variant.attributes?.material || ""}
                                onChange={(e) =>
                                  updateVariantAttribute(
                                    variant.id,
                                    "material",
                                    e.target.value,
                                  )
                                }
                                size="small"
                                sx={fieldSx}
                              />
                            </Grid>

                            <Grid item xs={12} sm={6}>
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
                            <Grid item xs={12} sm={6}>
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

                            {/* ── Dimensions ── */}
                            <Grid item xs={12}>
                              <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: 700, color: "#000", mt: 1 }}
                              >
                                Dimensions (cm)
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <TextField
                                fullWidth
                                label="Length"
                                type="number"
                                value={variant.length_cm}
                                onChange={(e) =>
                                  updateVariant(
                                    variant.id,
                                    "length_cm",
                                    parseFloat(e.target.value) || 0,
                                  )
                                }
                                size="small"
                                sx={fieldSx}
                              />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <TextField
                                fullWidth
                                label="Width"
                                type="number"
                                value={variant.width_cm}
                                onChange={(e) =>
                                  updateVariant(
                                    variant.id,
                                    "width_cm",
                                    parseFloat(e.target.value) || 0,
                                  )
                                }
                                size="small"
                                sx={fieldSx}
                              />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <TextField
                                fullWidth
                                label="Height"
                                type="number"
                                value={variant.height_cm}
                                onChange={(e) =>
                                  updateVariant(
                                    variant.id,
                                    "height_cm",
                                    parseFloat(e.target.value) || 0,
                                  )
                                }
                                size="small"
                                sx={fieldSx}
                              />
                            </Grid>
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                    ))}

                    <GradientButton
                      secondary
                      fullWidth
                      startIcon={<Plus size={15} />}
                      onClick={addVariant}
                    >
                      Add Another Variant
                    </GradientButton>
                  </Stack>
                )}

                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ mt: 4, justifyContent: "flex-end" }}
                >
                  <GradientButton secondary onClick={() => setActiveTab(0)}>
                    ← Back to Details
                  </GradientButton>
                  <GradientButton onClick={handleSubmit}>
                    Submit Product
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

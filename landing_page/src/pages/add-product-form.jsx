"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  Typography,
  Chip,
  Paper,
  Stack,
  CircularProgress,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { Plus, Upload, X } from "lucide-react";
import { toast } from "react-toastify";
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

// ── Styled TextField ──────────────────────────────────────────────────────────
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

export default function AddProductForm({ onSuccess }) {
  const params = useParams();
  const productId = params.product_id;
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(0);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    brand: "",
    category_id: "",
    mrp: "",
    bulk_price: "",
    transfer_price: "",
    approval_status: "draft",
    lifecycle_status: "inactive",
    options: [],
    // ── variants: normalized objects, each has a local `id` for React keys
    //    and a `variant_id` (the server's UUID) for update payloads
    variants: [],
    // ── images split into two buckets:
    existingImages: [], // { id, image_url, ... } objects from the API
    newImageFiles: [], // File objects the user just picked
    existingVideos: [], // { id, video_url, ... } objects from the API
    newVideoFiles: [], // Video files the user just picked
  });

  const [expandedVariant, setExpandedVariant] = useState(null);
  const [categories, setCategories] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // ── Fetch product (edit mode) ─────────────────────────────────────────────
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

  // ── Populate form when product loads ─────────────────────────────────────
  useEffect(() => {
    if (!product?.data) return;
    const p = product.data;

    setFormData((prev) => ({
      ...prev,
      title: p.title ?? "",
      description: p.description ?? "",
      brand: p.brand ?? "",
      category_id: p.category_id ?? "",
      mrp: p.mrp ?? "",
      bulk_price: p.bulk_price ?? "",
      transfer_price: p.transfer_price ?? "",
      approval_status: p.approval_status ?? "draft",
      lifecycle_status: p.lifecycle_status ?? "inactive",

      // ✅ Keep existing images as-is — display thumbnails from image_url
      existingImages: Array.isArray(p.images) ? p.images : [],
      newImageFiles: [],
      existingVideos: Array.isArray(p.videos) ? p.videos : [],
      newVideoFiles: [],

      // ✅ Normalize variants:
      //    - variant_id  = the server's UUID (sent back on update)
      //    - id          = local React key (same value, guaranteed unique)
      //    - flatten dimension_cm from either top-level or attributes
      variants: (p.variants ?? []).map((v) => ({
        id: v.variant_id ?? v.id,
        variant_id: v.variant_id ?? v.id,
        product_id: v.product_id,
        sku: v.sku ?? "",
        title: v.title ?? "",
        price: v.price ?? 0,
        compare_at_price: v.compare_at_price ?? 0,
        inventory_quantity: v.inventory_quantity ?? 0,
        weight_grams: v.weight_grams ?? 0,
        option1: v.option1 ?? "",
        option2: v.option2 ?? "",
        option3: v.option3 ?? "",
        is_active: v.is_active ?? true,
        dimension_cm: v.dimension_cm ??
          v.attributes?.dimension_cm ?? { height: 0, width: 0, length: 0 },
        images: [],
      })),
    }));
  }, [product]);

  // ── Field helpers ─────────────────────────────────────────────────────────
  const handleProductChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  // ── Variants ──────────────────────────────────────────────────────────────
  const addVariant = () => {
    const id = Date.now().toString();
    setFormData((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          id,
          variant_id: null, // null = new variant, backend will INSERT not UPDATE
          sku: "",
          title: "",
          price: 0,
          compare_at_price: 0,
          inventory_quantity: 0,
          weight_grams: 0,
          option1: "",
          option2: "",
          option3: "",
          is_active: true,
          dimension_cm: { height: 0, width: 0, length: 0 },
          images: [],
        },
      ],
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

  const removeVariant = (id) =>
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter((v) => v.id !== id),
    }));

  // ── Options ───────────────────────────────────────────────────────────────
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

  // ── Image helpers ─────────────────────────────────────────────────────────
  const handleNewImageUpload = (files) => {
    if (!files) return;
    setFormData((prev) => ({
      ...prev,
      newImageFiles: [...prev.newImageFiles, ...Array.from(files)],
    }));
  };

  const handleNewVideoUpload = (files) => {
    if (!files) return;
    setFormData((prev) => ({
      ...prev,
      newVideoFiles: [...prev.newVideoFiles, ...Array.from(files)],
    }));
  };

  // Remove an already-uploaded image (will be excluded from keepImageIds)
  const removeExistingImage = (index) =>
    setFormData((prev) => ({
      ...prev,
      existingImages: prev.existingImages.filter((_, i) => i !== index),
    }));

  // Remove a newly picked file before upload
  const removeNewImage = (index) =>
    setFormData((prev) => ({
      ...prev,
      newImageFiles: prev.newImageFiles.filter((_, i) => i !== index),
    }));

  const removeExistingVideo = (index) =>
    setFormData((prev) => ({
      ...prev,
      existingVideos: prev.existingVideos.filter((_, i) => i !== index),
    }));

  const removeNewVideo = (index) =>
    setFormData((prev) => ({
      ...prev,
      newVideoFiles: prev.newVideoFiles.filter((_, i) => i !== index),
    }));

  // ── Build multipart/form-data payload ────────────────────────────────────
  //
  //  Variants are sent as a JSON string matching the Postman shape.
  //  Each variant that already exists includes its variant_id so the
  //  backend can UPDATE it instead of INSERT a new row.
  //
  //  Images:
  //    - keepImageIds  → JSON array of IDs to KEEP (backend deletes the rest)
  //    - images        → new File objects to upload
  //
  const buildPayload = () => {
    const form = new FormData();

    // Scalars
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("brand", formData.brand);
    form.append("category_id", formData.category_id);
    form.append("approval_status", formData.approval_status);
    form.append("lifecycle_status", formData.lifecycle_status);
    form.append("mrp", formData.mrp);
    form.append("bulk_price", formData.bulk_price);
    form.append("transfer_price", formData.transfer_price);

    // Variants — mirror the Postman JSON shape exactly
    const variantsPayload = formData.variants.map((v) => {
      const dim = {
        height: Number(v.dimension_cm?.height) || 0,
        width: Number(v.dimension_cm?.width) || 0,
        length: Number(v.dimension_cm?.length) || 0,
      };
      return {
        // ✅ include variant_id only when updating an existing variant
        ...(v.variant_id ? { variant_id: v.variant_id } : {}),
        sku: v.sku,
        title: v.title,
        price: String(Number(v.price)),
        compare_at_price: String(Number(v.compare_at_price)),
        inventory_quantity: Number(v.inventory_quantity),
        weight_grams: Number(v.weight_grams),
        option1: v.option1 || null,
        option2: v.option2 || null,
        option3: v.option3 || null,
        is_active: v.is_active,
        dimension_cm: dim,
        attributes: { dimension_cm: dim },
        images: [],
      };
    });
    form.append("variants", JSON.stringify(variantsPayload));

    // Options
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

    // ✅ Tell backend which existing images to KEEP (it deletes the rest)
    const keepImageIds = formData.existingImages.map((img) => img.id);
    form.append("keepImageIds", JSON.stringify(keepImageIds));

    const keepVideoIds = formData.existingVideos.map((video) => video.id);
    form.append("keepVideoIds", JSON.stringify(keepVideoIds));

    // New files to upload
    formData.newImageFiles.forEach((file) => form.append("images", file));
    formData.newVideoFiles.forEach((file) => form.append("videos", file));

    return form;
  };

  // ── Save as Draft ─────────────────────────────────────────────────────────
  const handleSaveDraft = async () => {
    const form = buildPayload();
    form.set("approval_status", "draft");

    try {
      if (productId) {
        await updateProduct(productId, form);
      } else {
        await addProduct(form);
      }
      toast.success("Product saved as draft successfully!");
      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast.error(
        "Failed to save draft: " +
          (err?.response?.data?.message || err?.message || "Unknown error"),
      );
    }
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (formData.variants.length === 0) {
      toast.warn("Please add at least one variant");
      return;
    }
    setSubmitting(true);

    const form = buildPayload();

    try {
      if (productId) {
        await updateProduct(productId, form);
      } else {
        await addProduct(form);
      }

      toast.success("Product submitted successfully!");

      setFormData({
        title: "",
        description: "",
        brand: "",
        category_id: "",
        mrp: "",
        bulk_price: "",
        transfer_price: "",
        approval_status: "draft",
        lifecycle_status: "inactive",
        options: [],
        variants: [],
        existingImages: [],
        newImageFiles: [],
        existingVideos: [],
        newVideoFiles: [],
      });

      onSuccess?.();
      navigate("/products");
    } catch (err) {
      console.error(err);
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "Unknown error";
      toast.error("Failed to submit product: " + msg);
    } finally {
      setSubmitting(false);
    }
  };

  // ── Loading state ─────────────────────────────────────────────────────────
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

  // ── Render ────────────────────────────────────────────────────────────────
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
      <Container maxWidth="lg" sx={{ px: { xs: 1.5, sm: 2, md: 3 } }}>
        {/* Header */}
        <Box sx={{ mb: { xs: 2, sm: 4 } }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 800,
              mb: 0.5,
              color: "#000",
              letterSpacing: "-0.02em",
              fontSize: { xs: "1.5rem", sm: "2rem" },
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

        {/* ✅ div — no native form submit possible */}
        <div style={{ width: "100%", minWidth: 0, maxWidth: "100%" }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: "18px",
              border: "1.5px solid #e0f4f7",
              overflow: "hidden",
              boxShadow: "0 2px 20px rgba(0,151,178,0.08)",
            }}
          >
            {/* Tab bar */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                borderBottom: "1.5px solid #e0f4f7",
                bgcolor: "#f8fdfe",
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
                      fontSize: { xs: "0.88rem", sm: "0.9rem" },
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
                      boxSizing: "border-box",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: { xs: "flex-start", sm: "center" },
                      gap: 1,
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
                    {label}
                  </Box>
                );
              })}
            </Box>

            {/* ══════════════════════════════════════════════════════════════
                TAB 0 — Product Details
            ══════════════════════════════════════════════════════════════ */}
            {activeTab === 0 && (
              <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, minWidth: 0 }}>
                <Grid container spacing={3} sx={gridContainerSx}>
                  {/* Title */}
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

                  {/* Brand + Category */}
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
                          MenuProps={{ PaperProps: { sx: { maxHeight: 320 } } }}
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
                      </FormControl>
                    </Stack>
                  </Grid>

                  {/* Pricing */}
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

                  {/* Options */}
                  <Grid size={{ xs: 12 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 1,
                        gap: 1.5,
                        flexWrap: "wrap",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 700, color: "#000" }}
                      >
                        Options
                      </Typography>
                      <GradientButton
                        type="button"
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

                  {/* Approval Status */}
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

                  {/* Description */}
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

                  {/* ── Product Gallery ── */}
                  <Grid size={{ xs: 12 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 700, mb: 1.5, color: "#000" }}
                    >
                      Product Gallery
                    </Typography>

                    {/* Upload dropzone */}
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleNewImageUpload(e.target.files)}
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
                          sx={{ color: "#555", mb: 0.5, fontWeight: 500 }}
                        >
                          Drag and drop images or click to upload
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#999" }}>
                          PNG, JPG, WEBP up to 10MB
                        </Typography>
                      </Paper>
                    </label>

                    {/* ✅ Existing server images — show thumbnails */}
                    {formData.existingImages.length > 0 && (
                      <Box sx={{ mt: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#888",
                            fontWeight: 600,
                            mb: 1,
                            display: "block",
                          }}
                        >
                          Existing Images (click × to remove)
                        </Typography>
                        <Stack
                          direction="row"
                          sx={{ flexWrap: "wrap", gap: 1.5 }}
                        >
                          {formData.existingImages.map((img, idx) => (
                            <Box
                              key={img.id ?? idx}
                              sx={{
                                position: "relative",
                                display: "inline-flex",
                              }}
                            >
                              <Box
                                component="img"
                                src={img.image_url}
                                alt={img.alt_text || `Image ${idx + 1}`}
                                sx={{
                                  width: 80,
                                  height: 80,
                                  borderRadius: "10px",
                                  objectFit: "cover",
                                  border: "1.5px solid #e0f4f7",
                                }}
                              />
                              <IconButton
                                size="small"
                                onClick={() => removeExistingImage(idx)}
                                sx={{
                                  position: "absolute",
                                  top: -8,
                                  right: -8,
                                  bgcolor: "#e53935",
                                  color: "#fff",
                                  width: 22,
                                  height: 22,
                                  "&:hover": { bgcolor: "#c62828" },
                                }}
                              >
                                <X size={12} />
                              </IconButton>
                            </Box>
                          ))}
                        </Stack>
                      </Box>
                    )}

                    {/* ✅ Newly picked files (not yet uploaded) */}
                    {formData.newImageFiles.length > 0 && (
                      <Box sx={{ mt: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#888",
                            fontWeight: 600,
                            mb: 1,
                            display: "block",
                          }}
                        >
                          New Images (will upload on save)
                        </Typography>
                        <Stack
                          direction="row"
                          sx={{ flexWrap: "wrap", gap: 1 }}
                        >
                          {formData.newImageFiles.map((file, idx) => (
                            <Chip
                              key={idx}
                              label={file.name}
                              size="small"
                              onDelete={() => removeNewImage(idx)}
                              sx={{
                                maxWidth: 180,
                                bgcolor: "rgba(0,151,178,0.08)",
                                color: "#0097b2",
                                border: "1px solid rgba(0,151,178,0.25)",
                                fontWeight: 500,
                                "& .MuiChip-deleteIcon": { color: "#0097b2" },
                              }}
                            />
                          ))}
                        </Stack>
                      </Box>
                    )}
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 700, mb: 1.5, color: "#000" }}
                    >
                      Video Gallery
                    </Typography>

                    <input
                      type="file"
                      multiple
                      accept="video/*"
                      onChange={(e) => handleNewVideoUpload(e.target.files)}
                      style={{ display: "none" }}
                      id="product-video-upload"
                    />
                    <label
                      htmlFor="product-video-upload"
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
                          sx={{ color: "#555", mb: 0.5, fontWeight: 500 }}
                        >
                          Drag and drop videos or click to upload
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#999" }}>
                          MP4, MOV, WEBM up to 50MB
                        </Typography>
                      </Paper>
                    </label>

                    {formData.existingVideos.length > 0 && (
                      <Box sx={{ mt: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#888",
                            fontWeight: 600,
                            mb: 1,
                            display: "block",
                          }}
                        >
                          Existing Videos (click × to remove)
                        </Typography>
                        <Stack
                          direction="row"
                          sx={{ flexWrap: "wrap", gap: 1.5 }}
                        >
                          {formData.existingVideos.map((video, idx) => (
                            <Box
                              key={video.id ?? idx}
                              sx={{
                                position: "relative",
                                display: "inline-flex",
                              }}
                            >
                              <Box
                                component="video"
                                src={video.video_url || video.url}
                                sx={{
                                  width: 120,
                                  height: 80,
                                  borderRadius: "10px",
                                  objectFit: "cover",
                                  border: "1.5px solid #e0f4f7",
                                  bgcolor: "#000",
                                }}
                              />
                              <IconButton
                                size="small"
                                onClick={() => removeExistingVideo(idx)}
                                sx={{
                                  position: "absolute",
                                  top: -8,
                                  right: -8,
                                  bgcolor: "#e53935",
                                  color: "#fff",
                                  width: 22,
                                  height: 22,
                                  "&:hover": { bgcolor: "#c62828" },
                                }}
                              >
                                <X size={12} />
                              </IconButton>
                            </Box>
                          ))}
                        </Stack>
                      </Box>
                    )}

                    {formData.newVideoFiles.length > 0 && (
                      <Box sx={{ mt: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#888",
                            fontWeight: 600,
                            mb: 1,
                            display: "block",
                          }}
                        >
                          New Videos (will upload on save)
                        </Typography>
                        <Stack
                          direction="row"
                          sx={{ flexWrap: "wrap", gap: 1 }}
                        >
                          {formData.newVideoFiles.map((file, idx) => (
                            <Chip
                              key={idx}
                              label={file.name}
                              size="small"
                              onDelete={() => removeNewVideo(idx)}
                              sx={{
                                maxWidth: 200,
                                bgcolor: "rgba(0,151,178,0.08)",
                                color: "#0097b2",
                                border: "1px solid rgba(0,151,178,0.25)",
                                fontWeight: 500,
                                "& .MuiChip-deleteIcon": { color: "#0097b2" },
                              }}
                            />
                          ))}
                        </Stack>
                      </Box>
                    )}
                  </Grid>
                </Grid>

                <Stack
                  direction={{ xs: "column-reverse", sm: "row" }}
                  sx={{
                    mt: 4,
                    justifyContent: { xs: "stretch", sm: "flex-end" },
                    gap: 2,
                  }}
                >
                  <GradientButton
                    type="button"
                    secondary
                    onClick={handleSaveDraft}
                  >
                    Save as Draft
                  </GradientButton>
                  <GradientButton type="button" onClick={() => setActiveTab(1)}>
                    Continue to Variants →
                  </GradientButton>
                </Stack>
              </Box>
            )}

            {/* ══════════════════════════════════════════════════════════════
                TAB 1 — Variants
            ══════════════════════════════════════════════════════════════ */}
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
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 3,
                    gap: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: "1rem", sm: "1.1rem" },
                    }}
                  >
                    Product Variants
                  </Typography>
                  {formData.variants.length > 0 && (
                    <GradientButton
                      type="button"
                      size="small"
                      startIcon={<Plus size={15} />}
                      onClick={addVariant}
                    >
                      Add Variant
                    </GradientButton>
                  )}
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
                    <Box sx={{ maxWidth: 360, mx: "auto" }}>
                      <GradientButton
                        type="button"
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

                          <Box sx={{ flex: "1 1 200px", minWidth: 0 }}>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: 700, color: "#000" }}
                            >
                              {variant.sku || "Untitled variant"}
                            </Typography>
                            <Stack
                              direction="row"
                              spacing={1}
                              sx={{ mt: 0.5, flexWrap: "wrap", gap: 0.5 }}
                            >
                              <Chip
                                label={
                                  variant.price > 0
                                    ? `₹${Number(variant.price).toFixed(2)}`
                                    : "No price"
                                }
                                size="small"
                                sx={{
                                  bgcolor: "rgba(255,209,32,0.12)",
                                  color: "#b27a00",
                                  border: "1px solid rgba(255,209,32,0.35)",
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
                                  fontSize: "0.7rem",
                                }}
                              />
                            </Stack>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              ml: "auto",
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
                                "&:hover": { bgcolor: "rgba(198,40,40,0.18)" },
                              }}
                            >
                              <X size={14} />
                            </IconButton>
                          </Box>
                        </AccordionSummary>

                        <AccordionDetails
                          sx={{ px: { xs: 1.5, sm: 3 }, pt: 2, pb: 3 }}
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
                                    <InputAdornment position="start">
                                      ₹
                                    </InputAdornment>
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
                                    <InputAdornment position="start">
                                      ₹
                                    </InputAdornment>
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

                            {/* Dimensions */}
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

                    <GradientButton
                      type="button"
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
                  direction={{ xs: "column-reverse", sm: "row" }}
                  sx={{
                    mt: 4,
                    justifyContent: { xs: "stretch", sm: "flex-end" },
                    gap: 2,
                  }}
                >
                  <GradientButton
                    type="button"
                    secondary
                    onClick={() => setActiveTab(0)}
                  >
                    ← Back to Details
                  </GradientButton>
                  <GradientButton
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitting}
                  >
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
        </div>
      </Container>
    </Box>
  );
}

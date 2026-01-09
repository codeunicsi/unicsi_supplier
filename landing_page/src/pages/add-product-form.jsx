"use client"


import { useState } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
  Tab,
  Tabs,
  Chip,
  FormControlLabel,
  Checkbox,
  Paper,
  Stack,
} from "@mui/material"
import { Plus, Trash2, Upload, ChevronDown } from "lucide-react"



export default function AddProductForm({
  initialProduct,
  onSuccess,
}) {
  const [activeTab, setActiveTab] = useState(0)
  const [formData, setFormData] = useState(
    initialProduct || {
      title: "",
      description: "",
      brand: "",
      categoryId: "",
      variants: [],
      status: "draft",
    },
  )

  const [expandedVariant, setExpandedVariant] = useState(null)

  const handleProductChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const addVariant = () => {
    const newVariant = {
      id: Date.now().toString(),
      sku: "",
      variantName: "",
      variantPrice: 0,
      variantStock: 0,
      color: "",
      size: "",
      weightGrams: 0,
      hsnCode: "",
      isActive: true,
      dimensionsCm: { l: 0, w: 0, h: 0 },
      images: [],
    }
    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, newVariant],
    }))
  }

  const updateVariant = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((v) => (v.id === id ? { ...v, [field]: value } : v)),
    }))
  }

  const updateVariantDimension = (id, dimension, value) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((v) =>
        v.id === id
          ? {
              ...v,
              dimensionsCm: { ...v.dimensionsCm, [dimension]: value },
            }
          : v,
      ),
    }))
  }

  const removeVariant = (id) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter((v) => v.id !== id),
    }))
  }

  const handleVariantImageUpload = (id, files) => {
    if (files) {
      const fileArray = Array.from(files)
      updateVariant(id, "images", fileArray)
    }
  }

  const handleSaveDraft = (e) => {
    e.preventDefault()
    const products = JSON.parse(localStorage.getItem("products") || "[]")

    if (formData.id) {
      // Update existing draft
      const index = products.findIndex((p) => p.id === formData.id)
      products[index] = { ...formData, status: "draft", updatedAt: new Date().toISOString() }
    } else {
      // Create new draft
      products.push({
        ...formData,
        id: Date.now().toString(),
        status: "draft",
        createdAt: new Date().toISOString(),
      })
    }

    localStorage.setItem("products", JSON.stringify(products))
    alert("Product saved as draft successfully!")
    onSuccess?.()
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (formData.variants.length === 0) {
      alert("Please add at least one variant")
      return
    }

    const products = JSON.parse(localStorage.getItem("products") || "[]")

    if (formData.id) {
      const index = products.findIndex((p) => p.id === formData.id)
      products[index] = { ...formData, status: "submitted", submittedAt: new Date().toISOString() }
    } else {
      products.push({
        ...formData,
        id: Date.now().toString(),
        status: "submitted",
        createdAt: new Date().toISOString(),
        submittedAt: new Date().toISOString(),
      })
    }

    localStorage.setItem("products", JSON.stringify(products))
    alert("Product submitted successfully!")
    setFormData({
      title: "",
      description: "",
      brand: "",
      categoryId: "",
      variants: [],
      status: "draft",
    })
    onSuccess?.()
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1, color: "#1a1a1a" }}>
            {formData.id ? "Edit Product" : "Add New Product"}
          </Typography>
          <Typography variant="body1" sx={{ color: "#666" }}>
            {formData.id
              ? "Update your product details and variants"
              : "Create a new product with variants and specifications"}
          </Typography>
        </Box>

        <form>
          <Paper elevation={2} sx={{ borderRadius: 2 }}>
            {/* Material UI Tabs */}
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                bgcolor: "#fafafa",
              }}
            >
              <Tab label="Product Details" />
              <Tab label="Variants" />
            </Tabs>

            {/* Product Details Tab */}
            {activeTab === 0 && (
              <Box sx={{ p: 4 }}>
                <Grid container spacing={3}>
                  {/* Title */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Product Title"
                      placeholder="e.g., Cotton pajama"
                      value={formData.title}
                      onChange={(e) => handleProductChange("title", e.target.value)}
                      required
                      variant="outlined"
                      size="medium"
                    />
                  </Grid>

                  {/* Brand and Category */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Brand"
                      placeholder="e.g., UrbanWear"
                      value={formData.brand}
                      onChange={(e) => handleProductChange("brand", e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Category"
                      placeholder="Select category"
                      value={formData.categoryId}
                      onChange={(e) => handleProductChange("categoryId", e.target.value)}
                      variant="outlined"
                    />
                  </Grid>

                  {/* Description */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      placeholder="Premium cotton t-shirt for daily wear"
                      value={formData.description}
                      onChange={(e) => handleProductChange("description", e.target.value)}
                      variant="outlined"
                      multiline
                      rows={5}
                    />
                  </Grid>
                </Grid>

                {/* Action Buttons */}
                <Stack direction="row" spacing={2} sx={{ mt: 4, justifyContent: "flex-end" }}>
                  <Button variant="outlined" color="primary" onClick={handleSaveDraft}>
                    Save as Draft
                  </Button>
                  <Button variant="contained" color="primary" onClick={() => setActiveTab(1)}>
                    Continue to Variants
                  </Button>
                </Stack>
              </Box>
            )}

            {/* Variants Tab */}
            {activeTab === 1 && (
              <Box sx={{ p: 4 }}>
                {formData.variants.length === 0 ? (
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 4,
                      textAlign: "center",
                      border: "2px dashed #ccc",
                      bgcolor: "#fafafa",
                    }}
                  >
                    <Typography variant="body1" sx={{ mb: 2, color: "#666" }}>
                      No variants added yet
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Plus className="w-4 h-4" />}
                      onClick={addVariant}
                    >
                      Add First Variant
                    </Button>
                  </Paper>
                ) : (
                  <Stack spacing={2}>
                    {formData.variants.map((variant, index) => (
                      <Card key={variant.id} sx={{ overflow: "hidden" }}>
                        {/* Variant Header */}
                        <Box
                          onClick={() => setExpandedVariant(expandedVariant === variant.id ? null : variant.id)}
                          sx={{
                            bgcolor: "#f5f5f5",
                            p: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            cursor: "pointer",
                            "&:hover": { bgcolor: "#efefef" },
                            transition: "background-color 0.2s",
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Box sx={{ width: 8, height: 8, bgcolor: "#1976d2", borderRadius: "50%" }} />
                            <Box>
                              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                Variant {index + 1}
                                {variant.variantName && ` - ${variant.variantName}`}
                              </Typography>
                              {variant.sku && (
                                <Typography variant="caption" sx={{ color: "#999" }}>
                                  SKU: {variant.sku}
                                </Typography>
                              )}
                            </Box>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            {variant.isActive && <Chip label="Active" color="success" size="small" />}
                            <ChevronDown
                              className="w-5 h-5"
                              style={{
                                transform: expandedVariant === variant.id ? "rotate(180deg)" : "rotate(0deg)",
                                transition: "transform 0.2s",
                              }}
                            />
                          </Box>
                        </Box>

                        {/* Variant Content */}
                        {expandedVariant === variant.id && (
                          <CardContent sx={{ pt: 3 }}>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  label="SKU"
                                  placeholder="TS-BLK-M"
                                  value={variant.sku}
                                  onChange={(e) => updateVariant(variant.id, "sku", e.target.value)}
                                  size="small"
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  label="Variant Name"
                                  placeholder="e.g., Black Medium"
                                  value={variant.variantName}
                                  onChange={(e) => updateVariant(variant.id, "variantName", e.target.value)}
                                  size="small"
                                />
                              </Grid>

                              <Grid item xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  label="Color"
                                  placeholder="Black"
                                  value={variant.color}
                                  onChange={(e) => updateVariant(variant.id, "color", e.target.value)}
                                  size="small"
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  label="Size"
                                  placeholder="M"
                                  value={variant.size}
                                  onChange={(e) => updateVariant(variant.id, "size", e.target.value)}
                                  size="small"
                                />
                              </Grid>

                              <Grid item xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  label="Price"
                                  type="number"
                                  placeholder="345"
                                  value={variant.variantPrice}
                                  onChange={(e) =>
                                    updateVariant(variant.id, "variantPrice", Number.parseFloat(e.target.value))
                                  }
                                  size="small"
                                  inputProps={{ step: "0.01" }}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  label="Stock"
                                  type="number"
                                  placeholder="45"
                                  value={variant.variantStock}
                                  onChange={(e) =>
                                    updateVariant(variant.id, "variantStock", Number.parseInt(e.target.value))
                                  }
                                  size="small"
                                />
                              </Grid>

                              <Grid item xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  label="Weight (grams)"
                                  type="number"
                                  placeholder="350"
                                  value={variant.weightGrams}
                                  onChange={(e) =>
                                    updateVariant(variant.id, "weightGrams", Number.parseInt(e.target.value))
                                  }
                                  size="small"
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  label="HSN Code"
                                  placeholder="6109"
                                  value={variant.hsnCode}
                                  onChange={(e) => updateVariant(variant.id, "hsnCode", e.target.value)}
                                  size="small"
                                />
                              </Grid>

                              {/* Dimensions */}
                              <Grid item xs={12}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                                  Dimensions (cm)
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <TextField
                                  fullWidth
                                  label="Length"
                                  type="number"
                                  placeholder="30"
                                  value={variant.dimensionsCm.l}
                                  onChange={(e) =>
                                    updateVariantDimension(variant.id, "l", Number.parseInt(e.target.value))
                                  }
                                  size="small"
                                />
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <TextField
                                  fullWidth
                                  label="Width"
                                  type="number"
                                  placeholder="20"
                                  value={variant.dimensionsCm.w}
                                  onChange={(e) =>
                                    updateVariantDimension(variant.id, "w", Number.parseInt(e.target.value))
                                  }
                                  size="small"
                                />
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <TextField
                                  fullWidth
                                  label="Height"
                                  type="number"
                                  placeholder="3"
                                  value={variant.dimensionsCm.h}
                                  onChange={(e) =>
                                    updateVariantDimension(variant.id, "h", Number.parseInt(e.target.value))
                                  }
                                  size="small"
                                />
                              </Grid>

                              {/* Image Upload */}
                              <Grid item xs={12}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                                  Variant Images
                                </Typography>
                                <Paper
                                  variant="outlined"
                                  sx={{
                                    p: 3,
                                    textAlign: "center",
                                    border: "2px dashed #ccc",
                                    bgcolor: "#fafafa",
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                    "&:hover": { borderColor: "#1976d2", bgcolor: "#f0f7ff" },
                                  }}
                                >
                                  <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: "#999" }} />
                                  <Typography variant="body2" sx={{ mb: 1, color: "#666" }}>
                                    Drag and drop images or click to upload
                                  </Typography>
                                  <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={(e) => handleVariantImageUpload(variant.id, e.target.files)}
                                    className="hidden"
                                    id={`image-upload-${variant.id}`}
                                  />
                                  <label htmlFor={`image-upload-${variant.id}`} style={{ cursor: "pointer" }}>
                                    <Button
                                      component="span"
                                      variant="outlined"
                                      size="small"
                                      startIcon={<Upload className="w-4 h-4" />}
                                    >
                                      Select Images
                                    </Button>
                                  </label>
                                </Paper>
                                {variant.images.length > 0 && (
                                  <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap" }}>
                                    {variant.images.map((img, idx) => (
                                      <Chip key={idx} label={img.name} size="small" variant="outlined" />
                                    ))}
                                  </Stack>
                                )}
                              </Grid>

                              {/* Active Status */}
                              <Grid item xs={12}>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={variant.isActive}
                                      onChange={(e) => updateVariant(variant.id, "isActive", e.target.checked)}
                                    />
                                  }
                                  label="Mark as Active"
                                />
                              </Grid>

                              {/* Delete Button */}
                              <Grid item xs={12}>
                                <Button
                                  variant="outlined"
                                  color="error"
                                  startIcon={<Trash2 className="w-4 h-4" />}
                                  onClick={() => removeVariant(variant.id)}
                                  fullWidth
                                >
                                  Delete Variant
                                </Button>
                              </Grid>
                            </Grid>
                          </CardContent>
                        )}
                      </Card>
                    ))}

                    {/* Add Variant Button */}
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Plus className="w-4 h-4" />}
                      onClick={addVariant}
                      fullWidth
                    >
                      Add Another Variant
                    </Button>
                  </Stack>
                )}

                {/* Submit Buttons */}
                <Stack direction="row" spacing={2} sx={{ mt: 4, justifyContent: "flex-end" }}>
                  <Button variant="outlined" color="primary" onClick={() => setActiveTab(0)}>
                    Back to Details
                  </Button>
                  <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Submit Product
                  </Button>
                </Stack>
              </Box>
            )}
          </Paper>
        </form>
      </Container>
    </Box>
  )
}

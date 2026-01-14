"use client"

import React from "react"
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
import { addProduct, getProducts } from "../services/product/product.service"

// interface Variant {
//   id: string
//   sku: string
//   variant_name: string
//   variant_price: number
//   variant_stock: number
//   attributes: {
//     color: string
//     size: string
//   }
//   weight_grams: number
//   hsn_code: string
//   is_active: boolean
//   dimensions_cm: {
//     l: number
//     w: number
//     h: number
//   }
// }

// interface ProductFormData {
//   id?: string
//   title: string
//   description: string
//   brand: string
//   category_id: string
//   approval_status?: "draft" | "submitted"
//   productGallery: File[]
//   variants: Variant[]
//   createdAt?: string
// }

export default function AddProductForm({
  initialProduct,
  onSuccess,
}) {
  const [activeTab, setActiveTab] = useState(0)
  const [formData, setFormData] = useState(
       {
      title: "",
      description: "",
      brand: "",
      category_id: "",
      approval_status: "draft",
      productGallery: [],
      variants: [],
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
      variant_name: "",
      variant_price: 0,
      variant_stock: 0,
      attributes: {
        color: "",
        size: "",
      },
      weight_grams: 0,
      hsn_code: "",
      is_active: true,
      dimensions_cm: { l: 0, w: 0, h: 0 },
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

  const updateVariantAttribute = (id, attribute, value) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((v) =>
        v.id === id
          ? {
              ...v,
              attributes: { ...v.attributes, [attribute]: value },
            }
          : v,
      ),
    }))
  }

  const updateVariantDimension = (id, dimension, value) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((v) =>
        v.id === id
          ? {
              ...v,
              dimensions_cm: { ...v.dimensions_cm, [dimension]: value },
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

  const handleProductImageUpload = (files) => {
    console.log(files)
    if (files) {
      const fileArray = Array.from(files)
      console.log(fileArray)
      setFormData((prev) => ({
        ...prev,
        productGallery: [...prev.productGallery, ...fileArray],
      }))
    }
  }

  const removeProductImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      productGallery: prev.productGallery.filter((_, i) => i !== index),
    }))
  }

  const handleSaveDraft = async (e) => {
    e.preventDefault()
    const products = JSON.parse(localStorage.getItem("products") || "[]")

    const payload = {
      ...formData,
      approval_status: "draft",
      id: formData.id || Date.now().toString(),
      updatedAt: new Date().toISOString(),
    }

    if (formData.id) {
      const index = products.findIndex((p) => p.id === formData.id)
      products[index] = payload
    } else {
      payload.createdAt = new Date().toISOString()
      products.push(payload)
    }

    // localStorage.setItem("products", JSON.stringify(products))
    try {
      await addProduct(payload)
    } catch (error) {
      console.log(error)
    }
    alert("Product saved as draft successfully!")
    onSuccess?.()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.variants.length === 0) {
      alert("Please add at least one variant")
      return
    }

    const products = JSON.parse(localStorage.getItem("products") || "[]")

    const payload = {
      ...formData,
      approval_status: "submitted",
      id: formData.id || Date.now().toString(),
      submittedAt: new Date().toISOString(),

      
    }

    console.log("payload",payload)

    const productData = new FormData()
    productData.append("title", payload.title)
    productData.append("description", payload.description)
    productData.append("brand", payload.brand)
    productData.append("category_id", payload.category_id)
    productData.append("approval_status", payload.approval_status)
    productData.append("variants", JSON.stringify(payload.variants));

      // Append product images
  if (payload.productGallery?.length > 0) {
    payload.productGallery.forEach((file) => {
      productData.append("images", file)
    })
  }

    console.log("payload",productData)

    if (formData.id) {
      const index = products.findIndex((p) => p.id === formData.id)
      products[index] = payload
    } else {
      payload.createdAt = new Date().toISOString()
      products.push(payload)
    }
    // console.log("setting-producgs-data",products)

    localStorage.setItem("products", JSON.stringify(products))
    try {
      await addProduct(productData)
    } catch (error) {
      console.log(error)
    }
    alert("Product submitted successfully!")
    setFormData({
      title: "",
      description: "",
      brand: "",
      category_id: "",
      approval_status: "draft",
      productGallery: [],
      variants: [],
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
                      label="Category ID"
                      placeholder="b2f5b1c9-9c22-4c7a-8e10-90c21c4c3e91"
                      value={formData.category_id}
                      onChange={(e) => handleProductChange("category_id", e.target.value)}
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

                  <Grid item xs={12}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                      Product Gallery
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
                        onChange={(e) => handleProductImageUpload(e.target.files)}
                        className="hidden"
                        id="product-image-upload"
                      />
                      <label htmlFor="product-image-upload" style={{ cursor: "pointer" }}>
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
                    {formData.productGallery.length > 0 && (
                      <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap", gap: 1 }}>
                        {formData.productGallery.map((img, idx) => (
                          <Chip
                            key={idx}
                            label={img.name}
                            size="small"
                            variant="outlined"
                            onDelete={() => removeProductImage(idx)}
                          />
                        ))}
                      </Stack>
                    )}
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
                                {variant.variant_name && ` - ${variant.variant_name}`}
                              </Typography>
                              {variant.sku && (
                                <Typography variant="caption" sx={{ color: "#999" }}>
                                  SKU: {variant.sku}
                                </Typography>
                              )}
                            </Box>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            {variant.is_active && <Chip label="Active" color="success" size="small" />}
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
                                  value={variant.variant_name}
                                  onChange={(e) => updateVariant(variant.id, "variant_name", e.target.value)}
                                  size="small"
                                />
                              </Grid>

                              <Grid item xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  label="Color"
                                  placeholder="Black"
                                  value={variant.attributes.color}
                                  onChange={(e) => updateVariantAttribute(variant.id, "color", e.target.value)}
                                  size="small"
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  label="Size"
                                  placeholder="M"
                                  value={variant.attributes.size}
                                  onChange={(e) => updateVariantAttribute(variant.id, "size", e.target.value)}
                                  size="small"
                                />
                              </Grid>

                              <Grid item xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  label="Price"
                                  type="number"
                                  placeholder="345"
                                  value={variant.variant_price}
                                  onChange={(e) =>
                                    updateVariant(variant.id, "variant_price", Number.parseFloat(e.target.value))
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
                                  value={variant.variant_stock}
                                  onChange={(e) =>
                                    updateVariant(variant.id, "variant_stock", Number.parseInt(e.target.value))
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
                                  value={variant.weight_grams}
                                  onChange={(e) =>
                                    updateVariant(variant.id, "weight_grams", Number.parseInt(e.target.value))
                                  }
                                  size="small"
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  label="HSN Code"
                                  placeholder="6109"
                                  value={variant.hsn_code}
                                  onChange={(e) => updateVariant(variant.id, "hsn_code", e.target.value)}
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
                                  value={variant.dimensions_cm.l}
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
                                  value={variant.dimensions_cm.w}
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
                                  value={variant.dimensions_cm.h}
                                  onChange={(e) =>
                                    updateVariantDimension(variant.id, "h", Number.parseInt(e.target.value))
                                  }
                                  size="small"
                                />
                              </Grid>

                              {/* Active Status */}
                              <Grid item xs={12}>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={variant.is_active}
                                      onChange={(e) => updateVariant(variant.id, "is_active", e.target.checked)}
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

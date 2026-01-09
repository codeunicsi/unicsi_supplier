"use client"
import { useEffect, useState } from "react"
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Paper,
} from "@mui/material"
import { Edit, Trash2, Copy } from "lucide-react"
import { Link } from "react-router-dom"
import ProductFormData from "./add-product-form"

export default function ProductsList() {
  const [products, setProducts] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = () => {
    const stored = localStorage.getItem("products")
    if (stored) {
      setProducts(JSON.parse(stored))
    }
  }

  const handleDelete = () => {
    if (selectedProduct) {
      const updated = products.filter((p) => p.id !== selectedProduct)
      localStorage.setItem("products", JSON.stringify(updated))
      setProducts(updated)
      setOpenDialog(false)
      setSelectedProduct(null)
    }
  }

  const handleClone = (product) => {
    const clonedProduct = {
      ...product,
      id: Date.now().toString(),
      title: `${product.title} (Copy)`,
      createdAt: new Date().toISOString(),
      status: "draft",
    }
    const updated = [...products, clonedProduct]
    localStorage.setItem("products", JSON.stringify(updated))
    setProducts(updated)
    alert("Product cloned successfully!")
  }

  if (products.length === 0) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", py: 4 }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1, color: "#1a1a1a" }}>
              Products
            </Typography>
            <Typography variant="body1" sx={{ color: "#666" }}>
              Manage your products, drafts, and submissions
            </Typography>
          </Box>

          <Paper
            variant="outlined"
            sx={{
              p: 6,
              textAlign: "center",
              border: "2px dashed #ccc",
              bgcolor: "#fafafa",
            }}
          >
            <Typography variant="body1" sx={{ mb: 3, color: "#666" }}>
              No products yet. Create your first product!
            </Typography>
            <Link to="/products/add">
              <Button variant="contained" color="primary">
                Add New Product
              </Button>
            </Link>
          </Paper>
        </Container>
      </Box>
    )
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1, color: "#1a1a1a" }}>
              Products
            </Typography>
            <Typography variant="body1" sx={{ color: "#666" }}>
              Manage your products, drafts, and submissions
            </Typography>
          </Box>
          <Link to="/products/add">
            <Button variant="contained"  sx={{ backgroundColor: "#943A09" }}>
              Add New Product
            </Button>
          </Link>
        </Box>

        <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: 700 }}>Product Title</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Brand</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Variants</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Created</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} sx={{ "&:hover": { bgcolor: "#f9f9f9" } }}>
                  <TableCell sx={{ fontWeight: 500 }}>{product.title}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>{product.variants?.length || 0}</TableCell>
                  <TableCell>
                    <Chip
                      label={product.status === "draft" ? "Draft" : "Submitted"}
                      color={product.status === "draft" ? "warning" : "success"}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{new Date(product.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end" }}>
                      <Link to={`/edit-product/${product.id}`}>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<Edit className="w-4 h-4" />}
                          sx={{ textTransform: "none" }}
                        >
                          Edit
                        </Button>
                      </Link>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<Copy className="w-4 h-4" />}
                        onClick={() => handleClone(product)}
                        sx={{ textTransform: "none" }}
                      >
                        Clone
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        startIcon={<Trash2 className="w-4 h-4" />}
                        onClick={() => {
                          setSelectedProduct(product.id)
                          setOpenDialog(true)
                        }}
                        sx={{ textTransform: "none" }}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this product? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

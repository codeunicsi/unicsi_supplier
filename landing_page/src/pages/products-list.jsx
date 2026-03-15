"use client";
import { useState } from "react";
import {
  Box,
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
  CircularProgress,
} from "@mui/material";
import { Edit, Trash2, Copy } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/product/product.service";

const GRADIENT = "linear-gradient(135deg, #0097b2 0%, #7ed957 100%)";
const GRADIENT_HOVER = "linear-gradient(135deg, #007a91 0%, #65c040 100%)";

function GradientButton({
  children,
  onClick,
  secondary = false,
  danger = false,
  size = "medium",
  startIcon,
  as: As,
  to,
  href,
}) {
  const [hovered, setHovered] = useState(false);
  const pad = size === "small" ? "6px 14px" : "9px 22px";
  const fontSize = size === "small" ? "0.8rem" : "0.875rem";

  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: pad,
    borderRadius: "9px",
    fontSize,
    fontWeight: 600,
    cursor: "pointer",
    whiteSpace: "nowrap",
    textDecoration: "none",
    transition: "all 0.2s ease",
    border: "none",
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
            boxShadow: hovered
              ? "0 4px 14px rgba(0,151,178,0.3)"
              : "0 2px 8px rgba(0,151,178,0.2)",
          }),
  };

  // Compute what the icon color should be at any hover state
  const iconColor = hovered
    ? "#fff"
    : danger
      ? "#e53935"
      : secondary
        ? "#0097b2"
        : "#fff";

  const inner = (
    <>
      {startIcon && (
        <span style={{ display: "flex", alignItems: "center" }}>
          {typeof startIcon === "function" ? startIcon(iconColor) : startIcon}
        </span>
      )}
      {children}
    </>
  );

  if (As && to) {
    return (
      <As
        to={to}
        style={baseStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {inner}
      </As>
    );
  }

  return (
    <button
      onClick={onClick}
      style={baseStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {inner}
    </button>
  );
}

// ── Shared page shell ─────────────────────────────────────────────────────────
function PageShell({ children, showAddBtn = false }) {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4fbfc", py: 4 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            mb: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box>
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
              Products
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#555", fontSize: "0.9rem" }}
            >
              Manage your products, drafts, and submissions
            </Typography>
          </Box>
          {showAddBtn && (
            <Link to="/products/add" style={{ textDecoration: "none" }}>
              <GradientButton>+ Add New Product</GradientButton>
            </Link>
          )}
        </Box>
        {children}
      </Container>
    </Box>
  );
}

export default function ProductsList() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    data: productData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const handleDelete = () => {
    if (selectedProduct) {
      setOpenDialog(false);
      setSelectedProduct(null);
    }
  };

  const handleClone = (product) => {
    alert("Product cloned successfully!");
  };

  // ── Loading ─────────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <PageShell>
        <Paper
          elevation={0}
          sx={{
            p: 8,
            textAlign: "center",
            border: "1.5px solid #e0f4f7",
            borderRadius: "16px",
            bgcolor: "#fff",
          }}
        >
          <CircularProgress sx={{ color: "#0097b2", mb: 2 }} />
          <Typography sx={{ color: "#555", fontSize: "0.95rem" }}>
            Loading products…
          </Typography>
        </Paper>
      </PageShell>
    );
  }

  // ── Empty ───────────────────────────────────────────────────────────────────
  if (productData?.data?.products?.length === 0) {
    return (
      <PageShell>
        <Paper
          elevation={0}
          sx={{
            p: 8,
            textAlign: "center",
            border: "2px dashed #b8e8f0",
            borderRadius: "16px",
            bgcolor: "#f8fdfe",
          }}
        >
          {/* Empty state icon */}
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: GRADIENT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
              boxShadow: "0 4px 16px rgba(0,151,178,0.2)",
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
          </Box>
          <Typography
            sx={{
              color: "#1a1a1a",
              fontWeight: 700,
              fontSize: "1.1rem",
              mb: 0.5,
            }}
          >
            No products yet
          </Typography>
          <Typography sx={{ color: "#777", mb: 3, fontSize: "0.9rem" }}>
            Create your first product to get started
          </Typography>
          <Link to="/products/add" style={{ textDecoration: "none" }}>
            <GradientButton>+ Add New Product</GradientButton>
          </Link>
        </Paper>
      </PageShell>
    );
  }

  // ── Main list ───────────────────────────────────────────────────────────────
  return (
    <PageShell showAddBtn>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: "16px",
          border: "1.5px solid #e0f4f7",
          overflow: "hidden",
          boxShadow: "0 2px 16px rgba(0,151,178,0.08)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                background: GRADIENT,
              }}
            >
              {[
                "Product Title",
                "Brand",
                "Variants",
                "Status",
                "Created",
                "Actions",
              ].map((h, i) => (
                <TableCell
                  key={h}
                  align={h === "Actions" ? "right" : "left"}
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.78rem",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: "#ffffff !important",
                    borderBottom: "none",
                    py: 1.8,
                  }}
                >
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {productData?.data?.products?.map((product, idx) => (
              <TableRow
                key={product.id}
                sx={{
                  bgcolor: idx % 2 === 0 ? "#ffffff" : "#f8fdfe",
                  "&:hover": { bgcolor: "#edf8fb" },
                  transition: "background 0.15s ease",
                }}
              >
                <TableCell
                  sx={{ fontWeight: 600, color: "#000", fontSize: "0.9rem" }}
                >
                  {product.title}
                </TableCell>
                <TableCell sx={{ color: "#333", fontSize: "0.875rem" }}>
                  {product.brand}
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(0,151,178,0.1)",
                      color: "#0097b2",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      borderRadius: "20px",
                      px: 1.5,
                      py: 0.3,
                      minWidth: 28,
                    }}
                  >
                    {product.variants?.length || 0}
                  </Box>
                </TableCell>
                <TableCell>
                  {(() => {
                    const status = (
                      product.approval_status ||
                      product.status ||
                      "submitted"
                    ).toString();
                    const normalized = status.toLowerCase();
                    const label =
                      normalized.charAt(0).toUpperCase() + normalized.slice(1);

                    const styleMap = {
                      draft: {
                        bgcolor: "rgba(255,160,0,0.1)",
                        color: "#e65100",
                        border: "1px solid rgba(230,81,0,0.3)",
                      },
                      submitted: {
                        bgcolor: "rgba(0,151,178,0.1)",
                        color: "#0097b2",
                        border: "1px solid rgba(0,151,178,0.3)",
                      },
                      approved: {
                        bgcolor: "rgba(76,175,80,0.12)",
                        color: "#2e7d32",
                        border: "1px solid rgba(76,175,80,0.35)",
                      },
                      rejected: {
                        bgcolor: "rgba(198,40,40,0.12)",
                        color: "#c62828",
                        border: "1px solid rgba(198,40,40,0.35)",
                      },
                    };

                    const statusStyle =
                      styleMap[normalized] || styleMap.submitted;

                    return (
                      <Chip
                        label={label}
                        size="small"
                        sx={{
                          fontWeight: 600,
                          fontSize: "0.75rem",
                          ...statusStyle,
                        }}
                        variant="outlined"
                      />
                    );
                  })()}
                </TableCell>
                <TableCell sx={{ color: "#555", fontSize: "0.85rem" }}>
                  {new Date(product.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell align="right">
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ justifyContent: "flex-end" }}
                  >
                    <Link
                      to={`/edit-product/${product?.product_id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <GradientButton
                        size="small"
                        secondary
                        startIcon={(color) => <Edit size={13} color={color} />}
                      >
                        {/* Edit */}
                      </GradientButton>
                    </Link>
                    <GradientButton
                      size="small"
                      secondary
                      startIcon={(color) => <Copy size={13} color={color} />}
                      onClick={() => handleClone(product)}
                    >
                      {/* Clone */}
                    </GradientButton>
                    <GradientButton
                      size="small"
                      danger
                      startIcon={(color) => <Trash2 size={13} color={color} />}
                      onClick={() => {
                        setSelectedProduct(product.id);
                        setOpenDialog(true);
                      }}
                    >
                      {/* Delete */}
                    </GradientButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            border: "1.5px solid #e0f4f7",
            boxShadow: "0 8px 40px rgba(0,151,178,0.15)",
            minWidth: 360,
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #e53935 0%, #ef9a9a 100%)",
            color: "#fff",
            fontWeight: 700,
            fontSize: "1rem",
            py: 2,
            px: 3,
          }}
        >
          🗑️ Delete Product
        </DialogTitle>
        <DialogContent sx={{ pt: 3, pb: 1, px: 3 }}>
          <Typography
            sx={{ color: "#333", fontSize: "0.9rem", lineHeight: 1.6 }}
          >
            Are you sure you want to delete this product? This action{" "}
            <strong>cannot be undone</strong>.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2.5, gap: 1 }}>
          <GradientButton secondary onClick={() => setOpenDialog(false)}>
            Cancel
          </GradientButton>
          <GradientButton danger onClick={handleDelete}>
            Yes, Delete
          </GradientButton>
        </DialogActions>
      </Dialog>
    </PageShell>
  );
}

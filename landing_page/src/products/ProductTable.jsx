import React, { useEffect, useState, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
} from "@mui/material";

const GRADIENT = "linear-gradient(135deg, #0097b2 0%, #7ed957 100%)";
const GRADIENT_HOVER = "linear-gradient(135deg, #007a91 0%, #65c040 100%)";

function GradientButton({
  children,
  onClick,
  secondary = false,
  size = "medium",
}) {
  const [hovered, setHovered] = useState(false);
  const pad = size === "small" ? "4px 14px" : "9px 22px";
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: pad,
        borderRadius: "6px",
        border: secondary ? "1.5px solid #0097b2" : "none",
        background: secondary
          ? hovered
            ? GRADIENT
            : "transparent"
          : hovered
            ? GRADIENT_HOVER
            : GRADIENT,
        color: secondary ? (hovered ? "#fff" : "#0097b2") : "#fff",
        fontSize: "0.78rem",
        fontWeight: 600,
        cursor: "pointer",
        whiteSpace: "nowrap",
        lineHeight: "1",
        height: "28px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: secondary
          ? "none"
          : hovered
            ? "0 4px 14px rgba(0,151,178,0.3)"
            : "0 2px 8px rgba(0,151,178,0.2)",
        transition: "all 0.2s ease",
      }}
    >
      {children}
    </button>
  );
}

export default function ProductTable({
  data,
  isLoading,
  error,
  updateInventory,
}) {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [stock, setStock] = useState("");

  const rows = useMemo(() => {
    if (!data?.data?.products) return [];
    return data.data.products.flatMap((item) =>
      item.variants.map((variant) => ({
        id: variant.variant_id,
        productDetails: item.title || item.description || "",
        skuId: variant.sku,
        QtyInStock: variant.inventory_quantity ?? 0,
        costPrice: variant.cost_price ?? 0,
        salePrice: variant.price ?? 0,
        compareAtPrice: variant.compare_at_price ?? 0,
        inventoryManagement: variant.inventory_management || "",
        weightGrams: variant.weight_grams ?? 0,
      })),
    );
  }, [data?.data?.products]);

  const handleSave = async () => {
    let action = "";
    let quantity = Math.abs(stock - selectedRow.QtyInStock);
    if (stock > selectedRow.QtyInStock) action = "add";
    else if (stock < selectedRow.QtyInStock) action = "deduct";
    else return;
    await updateInventory({ sku: selectedRow.skuId, quantity, action });
    setOpen(false);
  };

  const handleEdit = (row) => {
    setSelectedRow(row);
    setStock(row.QtyInStock);
    setOpen(true);
  };

  const columns = [
    { field: "productDetails", headerName: "Product", width: 180 },
    { field: "skuId", headerName: "SKU", width: 140 },
    {
      field: "QtyInStock",
      headerName: "Stock",
      type: "number",
      width: 120,
    },
    { field: "costPrice", headerName: "Cost Price", width: 120 },
    { field: "salePrice", headerName: "Sale Price", width: 120 },
    { field: "compareAtPrice", headerName: "Compare At", width: 120 },
    {
      field: "inventoryManagement",
      headerName: "Inventory Management",
      width: 160,
    },
    { field: "weightGrams", headerName: "Weight (g)", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <GradientButton size="small" onClick={() => handleEdit(params.row)}>
            Edit
          </GradientButton>
        </div>
      ),
    },
  ];

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "220px",
          gap: "12px",
        }}
      >
        <CircularProgress sx={{ color: "#0097b2" }} />
        <span style={{ color: "#0097b2", fontSize: "0.9rem", fontWeight: 500 }}>
          Loading products…
        </span>
      </div>
    );

  if (error)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "120px",
          color: "#e53935",
          fontSize: "0.9rem",
          fontWeight: 500,
        }}
      >
        ⚠️ Error loading products
      </div>
    );

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          minWidth: 0,
          maxWidth: "100%",
          overflow: "auto",
          borderRadius: "16px",
          border: "1.5px solid #e0f4f7",
          boxShadow: "0 2px 16px rgba(0,151,178,0.08)",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
          autoHeight
          sx={{
            minWidth: 0,
            border: 0,
            fontFamily: "inherit",
            fontSize: "0.875rem",

            // ── Header ────────────────────────────────────────────────────
            "& .MuiDataGrid-columnHeaders": {
              background: GRADIENT,
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeader": {
              background: "transparent",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              color: "#ffffff !important",
              fontWeight: 700,
              fontSize: "0.82rem",
              letterSpacing: "0.03em",
              textTransform: "uppercase",
            },
            "& .MuiDataGrid-columnHeader .MuiDataGrid-iconButtonContainer svg":
              {
                color: "#fff",
              },
            "& .MuiDataGrid-columnSeparator svg": {
              color: "rgba(255,255,255,0.3)",
            },
            "& .MuiDataGrid-columnHeaderCheckbox .MuiCheckbox-root": {
              color: "#fff",
            },

            // ── Rows & Cells ──────────────────────────────────────────────
            "& .MuiDataGrid-row": {
              color: "#000000",
              transition: "background 0.15s ease",
            },
            "& .MuiDataGrid-row:hover": {
              background: "#f0fafc",
              color: "#000000",
            },
            "& .MuiDataGrid-row.Mui-selected": {
              background: "rgba(0,151,178,0.07)",
              color: "#000000",
              "&:hover": { background: "rgba(0,151,178,0.12)" },
            },
            "& .MuiDataGrid-cell": {
              color: "#000000",
              borderColor: "#e8f6f9",
              fontSize: "0.875rem",
              display: "flex",
              alignItems: "center",
            },
            "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
              outline: "none",
            },

            // ── Checkbox ──────────────────────────────────────────────────
            "& .MuiDataGrid-cellCheckbox .MuiCheckbox-root": {
              color: "#b0b0b0",
            },
            "& .MuiCheckbox-root.Mui-checked": {
              color: "#0097b2",
            },

            // ── Footer / Pagination ───────────────────────────────────────
            "& .MuiDataGrid-footerContainer": {
              borderTop: "1.5px solid #e0f4f7",
              background: "#f8fdfe",
              color: "#000000",
            },
            "& .MuiTablePagination-root, & .MuiTablePagination-displayedRows, & .MuiTablePagination-selectLabel":
              {
                color: "#000000",
              },
            "& .MuiTablePagination-selectIcon": {
              color: "#0097b2",
            },
            "& .MuiDataGrid-footerContainer .MuiIconButton-root": {
              color: "#0097b2",
            },
          }}
        />
      </Paper>

      {/* Edit Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            border: "1.5px solid #e0f4f7",
            boxShadow: "0 8px 40px rgba(0,151,178,0.15)",
            minWidth: { xs: "min(100%, 360px)", sm: 360 },
            maxWidth: "calc(100vw - 24px)",
            margin: { xs: "8px", sm: 0 },
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
          ✏️ Edit Inventory
        </DialogTitle>

        <DialogContent sx={{ pt: 3, pb: 1, px: 3 }}>
          <div
            style={{
              background: "#f0fafc",
              border: "1.5px solid #d0eef3",
              borderRadius: "10px",
              padding: "10px 14px",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontSize: "0.75rem",
                color: "#0097b2",
                fontWeight: 700,
                letterSpacing: "0.05em",
              }}
            >
              SKU
            </span>
            <span
              style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1a1a1a" }}
            >
              {selectedRow?.skuId || "—"}
            </span>
          </div>

          <TextField
            label="Stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            fullWidth
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                "&:hover fieldset": { borderColor: "#0097b2" },
                "&.Mui-focused fieldset": {
                  borderColor: "#0097b2",
                  boxShadow: "0 0 0 3px rgba(0,151,178,0.12)",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": { color: "#0097b2" },
            }}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2.5, gap: 1 }}>
          <GradientButton secondary onClick={() => setOpen(false)}>
            Cancel
          </GradientButton>
          <GradientButton onClick={handleSave}>Save Changes</GradientButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

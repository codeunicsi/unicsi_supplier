import React, { useEffect, useState } from "react"
import { DataGrid } from "@mui/x-data-grid"
import Paper from "@mui/material/Paper"
import { useMemo } from "react"
import { Button } from "@mui/material"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material"


export default function ProductTable({ data, isLoading, error }) {
  const [open, setOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [stock, setStock] = useState("")




  const rows = useMemo(() => {
    if (!data?.data?.products) return []

    return data.data.products.flatMap((item) =>
      item.variants.map((variant) => ({
        id: variant.variant_id, // MUST be unique
        productDetails: item.description,
        skuId: variant.sku,
        businessTag: item.businessTag || "",
        QtyInStock: variant.variant_stock || 0,
        transferPrice: item.transferPrice || 0,
        appPrice: variant.variant_price || 0,
        autoShipment: item.autoShipment ? "Yes" : "No",
        volumetricWeightAndDimensions: item.volumetricWeightAndDimensions || 0,
        deadWeight: item.deadWeight || 0,
      }))
    )
  }, [data?.data?.products])

  const handleSave = () => {
    console.log("Updated Stock:", stock)
    console.log("Variant ID:", selectedRow.id)

    // 🔜 API call here
    // updateStock({ variantId: selectedRow.id, stock })

    setOpen(false)
  }

  const handleEdit = (row) => {
    setSelectedRow(row)
    setStock(row.QtyInStock)
    setOpen(true)
  }

  const columns = [
    { field: "productDetails", headerName: "Product Details", width: 150 },
    { field: "skuId", headerName: "SKU ID", width: 130 },
    { field: "businessTag", headerName: "Business Tag", width: 130 },
    { field: "QtyInStock", headerName: "Qty In Stock", type: "number", width: 120 },
    { field: "transferPrice", headerName: "Transfer Price", width: 130 },
    { field: "appPrice", headerName: "App Price", width: 120 },
    { field: "autoShipment", headerName: "Auto Shipment", width: 140 },
    { field: "volumetricWeightAndDimensions", headerName: "Volumetric Weight & Dim", width: 200 },
    { field: "deadWeight", headerName: "Dead Weight", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Button size="small" onClick={() => handleEdit(params.row)}>
          Edit
        </Button>
      ),
    },
  ]



  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading products</div>

  return (
    <Paper sx={{ height: 400, width: "100%", overflow: "hidden" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
        sx={{
          border: 0,
          "& .MuiDataGrid-virtualScroller": {
            overflowX: "auto",
          },
        }}
      />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Inventory</DialogTitle>
        <DialogContent>
          <TextField
            // label="SKU"
            value={selectedRow?.skuId || ""}
            fullWidth
            disabled
            sx={{ mb: 2 }}
          />
          <TextField
            label="Stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>




    </Paper>
  )
}

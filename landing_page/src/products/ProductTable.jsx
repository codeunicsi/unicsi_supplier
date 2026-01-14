// components/products/ProductTable.tsx
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
// const { getProducts } = require("../api/products");

const columns = [
  { field: "productDetails", headerName: "Product Details", width: 150 },
  { field: "skuId", headerName: "SKU ID", width: 130 },
  { field: "businessTag", headerName: "Business Tag", width: 130 },
  { field: "QtyInStock", headerName: "Qty In Stock", type: "number", width: 120 },
  { field: "transferPrice", headerName: "Transfer Price", width: 130 },
  {field: "appPrice", headerName: "App Price", width: 120},
  { field: "autoShipment", headerName: "Auto Shipment", width: 140 },
  { field: "volumetricWeightAndDimensions", headerName: "Volumetric Weight & Dim", width: 200 },
  { field: "deadWeight", headerName: "Dead Weight", width: 120 },
  { field: "actions", headerName: "Actions", width: 100 },
];

const rows = [
  {
    id: 1,
    productDetails: "Product 1",
    skuId: "SKU 1",
    businessTag: "Business Tag 1",
    QtyInStock: 10,
    transferPrice: 100,
    autoShipment: true,
    volumetricWeightAndDimensions: "10 x 10 x 10",
    deadWeight: 10,
    actions: "Edit",
    appPrice: 100,
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function ProductTable() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}

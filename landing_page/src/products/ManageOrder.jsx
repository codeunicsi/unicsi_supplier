import { useState, useEffect, useRef } from "react";
import Pagination from "../ui/Pagination";
import ProductTable from "./ProductTable";
import BulkOrderTable from "./Bulkordertable";
import {
  getBulkOrders,
  uploadBiltiDetails,
} from "../services/prodile/profile.service";
import { shopifyOrders } from "../services/prodile/profile.service"; // ← add this import

const ORDER_HEADERS = [
  "Product",
  "SKU",
  "Stock",
  // "Cost Price",
  // "Sale Price",
  "Status",
  "Inventory Management",
  "Weight (G)",
  "Actions",
];

const SLA_STATUS_OPTIONS = [
  { value: "", label: "-- Select Option --" },
  { value: "breached", label: "Breached" },
  { value: "at_risk", label: "At Risk" },
  { value: "on_track", label: "On Track" },
];

export default function ManageOrder() {
  const [activeSection, setActiveSection] = useState("orders");

  // ── Orders tab state ──────────────────────────────────────────────
  const [activeOrderTab, setActiveOrderTab] = useState("All");
  const [activeSubTab, setActiveSubTab] = useState("New");
  const [viewMode, setViewMode] = useState("Aggregated");
  const [slaStatus, setSlaStatus] = useState("");
  const [skuId, setSkuId] = useState("");
  const [showHighPriority, setShowHighPriority] = useState(false);

  // ── Shopify orders state ──────────────────────────────────────────
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState(null);

  // ── Bulk orders state ─────────────────────────────────────────────
  const [bulkOrders, setBulkOrders] = useState([]);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [bulkError, setBulkError] = useState(null);

  const [uploadState, setUploadState] = useState({});
  const fileRefs = useRef({});

  const STATUS_MAP = {
    All: [],
    "Pending Supplier": ["pending_supplier"],
    Confirmed: ["confirmed"],
    Processing: ["processing"],
    Shipped: ["shipped"],
    "In Transit": ["in_transit"],
    Delivered: ["delivered"],
    Cancelled: ["cancelled"],
    Refunded: ["refunded"],
  };

  const ORDER_TABS = Object.keys(STATUS_MAP).map((label) => ({
    label,
  }));

  // ── Fetch shopify orders on mount / tab switch ────────────────────
  useEffect(() => {
    if (activeSection !== "orders") return;
    const fetchOrders = async () => {
      setOrdersLoading(true);
      setOrdersError(null);
      try {
        const res = await shopifyOrders();
        // API returns { success, data: [...] }
        setOrders(res?.data?.data ?? []);
      } catch (err) {
        setOrdersError(err?.message || "Failed to fetch orders.");
      } finally {
        setOrdersLoading(false);
      }
    };
    fetchOrders();
  }, [activeSection]);

  // ── Fetch bulk orders ─────────────────────────────────────────────
  useEffect(() => {
    if (activeSection !== "bulk") return;
    const fetchBulkOrders = async () => {
      setBulkLoading(true);
      setBulkError(null);
      try {
        const res = await getBulkOrders();
        setBulkOrders(res?.data?.data.orders ?? []);
      } catch (err) {
        setBulkError(err?.message || "Failed to fetch bulk orders.");
      } finally {
        setBulkLoading(false);
      }
    };
    fetchBulkOrders();
  }, [activeSection]);

  // ── Derived: flatten items_json for table rows ────────────────────
  // Each order can have multiple line items; we show one row per item.
  const tableRows = orders.flatMap((order) =>
    (order.items_json ?? []).map((item) => ({
      orderId: order.order_id,
      orderName: order.shopify_order_name,
      status: order.status,
      // ── Fields shown in UI columns ──
      product: item.title,
      sku: item.sku,
      stock: item.quantity, // quantity available maps to Stock
      // costPrice: item.price, // supplier cost price
      // salePrice: item.price, // sale price (same field until API exposes separately)
      compareAt: null, // not in API yet — shown as "—"
      inventoryManagement: null, // not in API yet — shown as "—"
      weightG: null, // not in API yet — shown as "—"
      variantTitle: item.variantTitle,
    })),
  );

  // ── Filter: SKU ID search (client-side) ───────────────────────────
  const [appliedSkuId, setAppliedSkuId] = useState("");
  const [appliedSlaStatus, setAppliedSlaStatus] = useState("");

  const handleApplyFilters = () => {
    setAppliedSkuId(skuId.trim());
    setAppliedSlaStatus(slaStatus);
  };

  const handleResetFilters = () => {
    setSlaStatus("");
    setSkuId("");
    setAppliedSkuId("");
    setAppliedSlaStatus("");
  };

  const filteredRows = tableRows.filter((row) => {
    // SKU filter
    if (
      appliedSkuId &&
      !row.sku?.toLowerCase().includes(appliedSkuId.toLowerCase())
    ) {
      return false;
    }

    // Status filter
    const allowedStatuses = STATUS_MAP[activeOrderTab];

    if (allowedStatuses.length > 0 && !allowedStatuses.includes(row.status)) {
      return false;
    }

    return true;
  });

  const getCount = (label) => {
    const statuses = STATUS_MAP[label];

    if (label === "All") return tableRows.length;

    return tableRows.filter((row) => statuses.includes(row.status)).length;
  };

  const handleDownloadOrdersData = () =>
    console.log("Downloading orders data…");
  const handleDownloadHistory = () => console.log("Downloading history…");
  const handleDownloadTable = () => console.log("Downloading table…");

  // ── Bulk upload handlers (unchanged) ─────────────────────────────
  const handleFileChange = (orderId, newFiles) => {
    const newFileArray = Array.from(newFiles);
    const newPreviews = newFileArray.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setUploadState((prev) => {
      const existing = prev[orderId]?.previews || [];
      return {
        ...prev,
        [orderId]: {
          ...prev[orderId],
          files: [...(prev[orderId]?.files || []), ...newFileArray],
          previews: [...existing, ...newPreviews],
          error: null,
          success: false,
        },
      };
    });
  };

  const handleRemoveImage = (orderId, index) => {
    setUploadState((prev) => {
      const state = prev[orderId] || {};
      const previews = [...(state.previews || [])];
      const files = [...(state.files || [])];
      URL.revokeObjectURL(previews[index]?.url);
      previews.splice(index, 1);
      files.splice(index, 1);
      return {
        ...prev,
        [orderId]: { ...state, previews, files, error: null, success: false },
      };
    });
  };

  const handleNumberChange = (orderId, value) => {
    setUploadState((prev) => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        number: value,
        error: null,
        success: false,
      },
    }));
  };

  const handleUpload = async (orderId) => {
    const state = uploadState[orderId] || {};
    const { files = [], number } = state;
    if (!files.length)
      return setUploadState((prev) => ({
        ...prev,
        [orderId]: { ...state, error: "Select at least one file." },
      }));
    if (!number)
      return setUploadState((prev) => ({
        ...prev,
        [orderId]: { ...state, error: "Enter Bilti number." },
      }));
    setUploadState((prev) => ({
      ...prev,
      [orderId]: { ...state, uploading: true, error: null, success: false },
    }));
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("biltiImages", file));
      formData.append("bilti_number", number);
      formData.append("order_id", orderId);
      await uploadBiltiDetails(formData);
      (uploadState[orderId]?.previews || []).forEach((p) =>
        URL.revokeObjectURL(p.url),
      );
      setUploadState((prev) => ({
        ...prev,
        [orderId]: {
          files: [],
          previews: [],
          number: "",
          success: true,
          uploading: false,
        },
      }));
      if (fileRefs.current[orderId]) fileRefs.current[orderId].value = "";
    } catch (err) {
      setUploadState((prev) => ({
        ...prev,
        [orderId]: {
          ...prev[orderId],
          uploading: false,
          error: err?.response?.data?.message || "Upload failed.",
        },
      }));
    }
  };

 
  // ── Render ────────────────────────────────────────────────────────
  return (
    <div>
      {/* Section tabs */}
      <div className="flex gap-2 mb-6 border-b">
        <button
          onClick={() => setActiveSection("orders")}
          className={`px-4 py-2 text-sm font-semibold ${activeSection === "orders" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
        >
          Manage Orders
        </button>
        <button
          onClick={() => setActiveSection("bulk")}
          className={`px-4 py-2 text-sm font-semibold ${activeSection === "bulk" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
        >
          Manage Bulk Orders
        </button>
      </div>

      {/* ── ORDERS TAB ─────────────────────────────────────────────── */}
      {activeSection === "orders" ? (
        <>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Manage Orders</h2>
            <div className="flex gap-2">
              <button
                onClick={handleDownloadOrdersData}
                className="flex items-center gap-1.5 border border-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-50 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 4v11"
                  />
                </svg>
                Download Orders Data
              </button>
              <button
                onClick={handleDownloadHistory}
                className="flex items-center gap-1.5 border border-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-50 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3M12 2a10 10 0 100 20A10 10 0 0012 2z"
                  />
                </svg>
                Download History
              </button>
            </div>
          </div>

          {/* Order status tabs */}
          <div className="flex gap-0 border-b mb-3 overflow-x-auto">
            {ORDER_TABS.map(({ label }) => (
              <button
                key={label}
                onClick={() => setActiveOrderTab(label)}
                className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeOrderTab === label
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {label}
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                    activeOrderTab === label
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {getCount(label)}
                </span>
              </button>
            ))}
          </div>

          {/* Sub-tabs + Aggregated toggle */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-2">
              {["New", "Under Processing"].map((sub) => (
                <button
                  key={sub}
                  onClick={() => setActiveSubTab(sub)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors ${activeSubTab === sub ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  {sub}
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${activeSubTab === sub ? "bg-white text-gray-900" : "bg-gray-300 text-gray-600"}`}
                  >
                    {sub === "New" ? 27 : 0}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex items-center border border-gray-300 rounded overflow-hidden text-sm">
              {["Aggregated", "Order Level"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1.5 font-medium transition-colors ${viewMode === mode ? "bg-gray-900 text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Filters row */}
          <div className="flex flex-wrap gap-3 items-end mb-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600">
                SLA Status:
              </label>
              <select
                value={slaStatus}
                onChange={(e) => setSlaStatus(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 min-w-[150px]"
              >
                {SLA_STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600">
                SKU ID:
              </label>
              <input
                type="text"
                value={skuId}
                onChange={(e) => setSkuId(e.target.value)}
                placeholder="Enter SKU ID"
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 min-w-[160px]"
              />
            </div>
            <button
              onClick={handleApplyFilters}
              className="flex items-center gap-1.5 bg-gray-800 text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-900 transition-colors"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Apply
            </button>
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1.5 border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h5M20 20v-5h-5M4 9a9 9 0 0114.65-3.65M19.91 15A9 9 0 015.35 18.65"
                />
              </svg>
              Reset
            </button>
            <div className="flex-1" />
            <div className="flex items-center gap-3 flex-wrap">
              {/* <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded px-3 py-2">
                <svg
                  className="w-4 h-4 text-red-500 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-9a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm0-4a1 1 0 100 2 1 1 0 000-2z"
                  />
                </svg>
                <span className="text-red-600 text-xs font-semibold">
                  27 Orders Need Attention
                </span>
              </div> */}
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <div
                  onClick={() => setShowHighPriority((p) => !p)}
                  className={`relative w-10 h-5 rounded-full transition-colors ${showHighPriority ? "bg-pink-400" : "bg-gray-200"}`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${showHighPriority ? "translate-x-5" : "translate-x-0"}`}
                  />
                </div>
                <span className="text-xs text-gray-600 font-medium">
                  Show high priority orders
                </span>
              </label>
              <button
                onClick={handleDownloadTable}
                className="flex items-center gap-1.5 border border-gray-300 text-gray-700 px-3 py-2 rounded text-sm hover:bg-gray-50 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 4v11"
                  />
                </svg>
                Download Table
              </button>
            </div>
          </div>

          {/* ── Orders Table ───────────────────────────────────────── */}
          {ordersLoading ? (
            <p className="text-center py-10 text-gray-500">Loading orders…</p>
          ) : ordersError ? (
            <p className="text-center py-10 text-red-500">{ordersError}</p>
          ) : (
            <>
              <div className="overflow-x-auto rounded border border-gray-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-teal-500 text-white text-xs uppercase">
                      <th className="w-8 px-3 py-3">
                        <input type="checkbox" className="rounded" />
                      </th>
                      {ORDER_HEADERS.map((h) => (
                        <th
                          key={h}
                          className="px-3 py-3 text-left font-semibold whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRows.length === 0 ? (
                      <tr>
                        <td
                          colSpan={ORDER_HEADERS.length + 1}
                          className="text-center py-10 text-gray-400"
                        >
                          No rows
                        </td>
                      </tr>
                    ) : (
                      filteredRows.map((row, idx) => (
                        <tr
                          key={`${row.orderId}-${idx}`}
                          className="border-t border-gray-100 hover:bg-gray-50"
                        >
                          <td className="px-3 py-3">
                            <input type="checkbox" className="rounded" />
                          </td>
                          {/* Product */}
                          <td className="px-3 py-3">
                            <div className="font-medium text-gray-800">
                              {row.product}
                            </div>
                            <div className="text-xs text-gray-400">
                              {row.variantTitle}
                            </div>
                          </td>
                          {/* SKU */}
                          <td className="px-3 py-3 text-gray-600">{row.sku}</td>
                          {/* Stock */}
                          <td className="px-3 py-3 text-gray-600">
                            {row.stock}
                          </td>
                          {/* Cost Price */}
                          {/* <td className="px-3 py-3 text-gray-600">
                            ₹{row.costPrice}
                          </td>
                          {/* Sale Price */}
                          {/* <td className="px-3 py-3 text-gray-600">
                            ₹{row.salePrice}
                          </td> */} 
                          {/* Status */}
                          <td className="px-3 py-3 text-gray-400">
                            {row.status}
                          </td>
                          {/* Inventory Management */}
                          <td className="px-3 py-3 text-gray-400">—</td>
                          {/* Weight (G) */}
                          <td className="px-3 py-3 text-gray-400">—</td>
                          {/* Actions */}
                          <td className="px-3 py-3">
                            <button className="text-blue-600 hover:underline text-xs font-medium">
                              View
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <Pagination />
            </>
          )}
        </>
      ) : (
        /* ── BULK ORDERS TAB ──────────────────────────────────────── */
        <>
          <h2 className="text-lg font-semibold mb-4">Manage Bulk Orders</h2>
          {bulkLoading ? (
            <p className="text-center py-6 text-gray-500">Loading...</p>
          ) : bulkError ? (
            <p className="text-center py-6 text-red-500">{bulkError}</p>
          ) : bulkOrders.length === 0 ? (
            <p className="text-center py-6 text-gray-400">No orders found</p>
          ) : (
            <>
              {bulkOrders.map((order) => {
                const orderId = order.orderId;
                const state = uploadState[orderId] || {};
                const previews = state.previews || [];
                return (
                  <div
                    key={orderId}
                    className="mb-4 border border-gray-300 rounded-lg overflow-hidden"
                  >
                    <div className="bg-gray-100 px-4 py-2 flex justify-between">
                      <span className="text-sm font-semibold">
                        Order #{orderId}
                      </span>
                      <span className="text-xs text-gray-500">
                        {order.status}
                      </span>
                    </div>
                    <div className="p-3">
                      <BulkOrderTable orders={[order]} />
                    </div>
                    <div className="border-t bg-gray-50 p-3 space-y-3">
                      {previews.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {previews.map((preview, idx) => (
                            <div
                              key={idx}
                              className="relative w-16 h-16 rounded border border-gray-300 overflow-hidden group shadow-sm"
                            >
                              <img
                                src={preview.url}
                                alt={preview.name}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[9px] px-1 py-0.5 truncate opacity-0 group-hover:opacity-100 transition-opacity">
                                {preview.name}
                              </div>
                              <button
                                onClick={() => handleRemoveImage(orderId, idx)}
                                className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] leading-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                title="Remove"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                          <div className="w-16 h-16 flex flex-col items-center justify-center rounded border border-dashed border-gray-300 text-gray-400 text-xs text-center leading-tight">
                            <span className="text-lg font-bold text-gray-600">
                              {previews.length}
                            </span>
                            image{previews.length !== 1 ? "s" : ""}
                          </div>
                        </div>
                      )}
                      <div className="flex gap-3 flex-wrap items-end">
                        <div>
                          <button
                            type="button"
                            onClick={() => fileRefs.current[orderId]?.click()}
                            className="flex items-center gap-1.5 border border-dashed border-blue-400 text-blue-600 px-3 py-2 rounded text-xs hover:bg-blue-50 transition-colors"
                          >
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 12V4m0 0L8 8m4-4l4 4"
                              />
                            </svg>
                            {previews.length > 0
                              ? "Add more images"
                              : "Choose images"}
                          </button>
                          <input
                            ref={(el) => (fileRefs.current[orderId] = el)}
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              handleFileChange(orderId, e.target.files);
                              e.target.value = "";
                            }}
                          />
                        </div>
                        <input
                          type="text"
                          value={state.number || ""}
                          onChange={(e) =>
                            handleNumberChange(orderId, e.target.value)
                          }
                          placeholder="Bilti number"
                          className="border px-3 py-2 text-xs rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
                        />
                        <button
                          onClick={() => handleUpload(orderId)}
                          disabled={state.uploading}
                          className="bg-blue-600 text-white px-4 py-2 text-xs rounded hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                        >
                          {state.uploading ? (
                            <span className="flex items-center gap-1.5">
                              <svg
                                className="w-3 h-3 animate-spin"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                />
                              </svg>
                              Uploading…
                            </span>
                          ) : (
                            "Upload"
                          )}
                        </button>
                      </div>
                      {state.error && (
                        <p className="text-red-500 text-xs">{state.error}</p>
                      )}
                      {state.success && (
                        <p className="text-green-600 text-xs font-medium">
                          ✓ Uploaded successfully.
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
              <Pagination />
            </>
          )}
        </>
      )}
    </div>
  );
}

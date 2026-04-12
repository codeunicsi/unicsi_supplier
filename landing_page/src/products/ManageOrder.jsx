import { useState, useEffect, useRef, useCallback } from "react";
import Pagination from "../ui/Pagination";
import FiltersBar from "./FiltersBar";
import ProductTable from "./ProductTable";
import Tabs from "./Tabs";
import BulkOrderTable from "./Bulkordertable";
import {
  getBulkOrders,
  uploadBiltiDetails,
} from "../services/prodile/profile.service";
import {
  getShopifyOrders,
  acceptShopifyOrder,
  shipShopifyOrder,
} from "../services/shopifyOrder/shopifyOrderService";

const ORDER_TABS = [
  "On Hold",
  "Pending",
  "To Dispatched",
  "Ready To Ship",
  "Shipped",
  "Cancelled",
  "All",
];

const ORDER_HEADERS = [
  "Product Details",
  "Pushed Date & Time",
  "C-Code",
  "Clout Price",
  "More Details",
];

// ── Status badge colors for Shopify orders ───────────────────────────────────
const STATUS_COLORS = {
  new:       { bg: "#fff3e0", text: "#e65100" },
  routed:    { bg: "#e3f2fd", text: "#1565c0" },
  accepted:  { bg: "#e8f5e9", text: "#2e7d32" },
  packed:    { bg: "#f3e5f5", text: "#6a1b9a" },
  shipped:   { bg: "#e0f2f1", text: "#00695c" },
  fulfilled: { bg: "#e8eaf6", text: "#283593" },
  delivered: { bg: "#f9fbe7", text: "#558b2f" },
  cancelled: { bg: "#fce4ec", text: "#b71c1c" },
};

const SHOPIFY_STATUS_TABS = [
  { label: "All",       value: "" },
  { label: "New",       value: "new" },
  { label: "Routed",    value: "routed" },
  { label: "Accepted",  value: "accepted" },
  { label: "Shipped",   value: "shipped" },
  { label: "Fulfilled", value: "fulfilled" },
];

// ── ShipModal sub-component ───────────────────────────────────────────────────
function ShipModal({ order, onClose, onSuccess }) {
  const [tracking, setTracking] = useState("");
  const [company,  setCompany]  = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  const submit = async () => {
    if (!tracking.trim()) { setError("Tracking number is required"); return; }
    setLoading(true);
    setError("");
    try {
      const res = await shipShopifyOrder(order.id, tracking.trim(), company.trim());
      if (res?.data?.success) onSuccess();
      else throw new Error(res?.data?.error || "Failed");
    } catch (e) {
      setError(e?.response?.data?.error || e.message || "Failed to ship order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999,
    }}>
      <div style={{
        background: "#fff", borderRadius: 16, padding: 32,
        width: 420, boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
      }}>
        <h3 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 700 }}>Mark as Shipped</h3>
        <p style={{ color: "#777", fontSize: 13, marginBottom: 20 }}>
          Order #{order.shopify_order_number || order.id.slice(0, 8)}
        </p>
        {error && (
          <div style={{
            background: "#fce4ec", color: "#b71c1c",
            padding: "10px 14px", borderRadius: 8, marginBottom: 16, fontSize: 13,
          }}>{error}</div>
        )}
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6, color: "#333" }}>
            Tracking Number *
          </label>
          <input
            value={tracking}
            onChange={(e) => setTracking(e.target.value)}
            placeholder="e.g. 123456789012"
            style={{
              width: "100%", padding: "10px 14px", border: "1.5px solid #ddd",
              borderRadius: 8, fontSize: 14, boxSizing: "border-box", outline: "none",
            }}
          />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6, color: "#333" }}>
            Courier Company
          </label>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g. Delhivery, Bluedart"
            style={{
              width: "100%", padding: "10px 14px", border: "1.5px solid #ddd",
              borderRadius: 8, fontSize: 14, boxSizing: "border-box", outline: "none",
            }}
          />
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{
            padding: "10px 20px", border: "1.5px solid #ddd", borderRadius: 8,
            background: "transparent", cursor: "pointer", fontSize: 14, fontWeight: 600,
          }}>Cancel</button>
          <button onClick={submit} disabled={loading} style={{
            padding: "10px 24px", border: "none", borderRadius: 8,
            background: "linear-gradient(135deg,#0097b2,#7ed957)", color: "#fff",
            cursor: loading ? "not-allowed" : "pointer", fontSize: 14, fontWeight: 700,
            opacity: loading ? 0.7 : 1,
          }}>
            {loading ? "Shipping…" : "Confirm Shipment"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ManageOrder() {
  const [activeSection, setActiveSection] = useState("orders");
  const [bulkOrders, setBulkOrders] = useState([]);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [bulkError, setBulkError] = useState(null);

  // upload state per orderId
  const [uploadState, setUploadState] = useState({});
  const fileRefs = useRef({});

  // ── Shopify Orders state ──────────────────────────────────────
  const [shopifyOrders,  setShopifyOrders]  = useState([]);
  const [shopifyLoading, setShopifyLoading] = useState(false);
  const [shopifyError,   setShopifyError]   = useState(null);
  const [shopifyTab,     setShopifyTab]     = useState("");
  const [shipModal,      setShipModal]      = useState(null);
  const [actionLoading,  setActionLoading]  = useState({});
  const [toast,          setToast]          = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3200);
  };

  const fetchShopifyOrders = useCallback(async () => {
    setShopifyLoading(true);
    setShopifyError(null);
    try {
      const res = await getShopifyOrders(shopifyTab);
      setShopifyOrders(res?.data?.data?.orders ?? []);
    } catch (err) {
      setShopifyError(err?.response?.data?.error || err.message || "Failed to fetch orders");
    } finally {
      setShopifyLoading(false);
    }
  }, [shopifyTab]);

  useEffect(() => {
    if (activeSection === "shopify") fetchShopifyOrders();
  }, [activeSection, fetchShopifyOrders]);

  const handleAccept = async (orderId) => {
    setActionLoading((p) => ({ ...p, [orderId]: true }));
    try {
      const res = await acceptShopifyOrder(orderId);
      if (res?.data?.success) { showToast("Order accepted!"); fetchShopifyOrders(); }
      else showToast(res?.data?.error || "Failed to accept");
    } catch (e) {
      showToast(e?.response?.data?.error || "Failed to accept order");
    } finally {
      setActionLoading((p) => ({ ...p, [orderId]: false }));
    }
  };

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

  // Append newly selected files and generate preview URLs
  const handleFileChange = (orderId, newFiles) => {
    const newFileArray = Array.from(newFiles);

    // Generate object URLs for preview
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

  // Remove a single image from the list
  const handleRemoveImage = (orderId, index) => {
    setUploadState((prev) => {
      const state = prev[orderId] || {};
      const previews = [...(state.previews || [])];
      const files = [...(state.files || [])];

      // Revoke object URL to free memory
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

    if (!files.length) {
      return setUploadState((prev) => ({
        ...prev,
        [orderId]: { ...state, error: "Select at least one file." },
      }));
    }
    if (!number) {
      return setUploadState((prev) => ({
        ...prev,
        [orderId]: { ...state, error: "Enter Bilti number." },
      }));
    }

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

      // Revoke all preview URLs on success
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

  return (
    <div>
      {/* Toast notification */}
      {toast && (
        <div style={{
          position: "fixed", top: 20, right: 24, zIndex: 9999,
          background: "#323232", color: "#fff", padding: "12px 20px",
          borderRadius: 10, fontSize: 14, fontWeight: 600,
          boxShadow: "0 4px 16px rgba(0,0,0,0.2)", pointerEvents: "none",
        }}>{toast}</div>
      )}

      {/* Ship tracking modal */}
      {shipModal && (
        <ShipModal
          order={shipModal}
          onClose={() => setShipModal(null)}
          onSuccess={() => { setShipModal(null); showToast("Order shipped! Shopify notified."); fetchShopifyOrders(); }}
        />
      )}

      {/* Section tabs */}
      <div className="flex gap-2 mb-6 border-b">
        <button
          onClick={() => setActiveSection("orders")}
          className={`px-4 py-2 text-sm font-semibold ${
            activeSection === "orders"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
        >
          Manage Orders
        </button>
        <button
          onClick={() => setActiveSection("bulk")}
          className={`px-4 py-2 text-sm font-semibold ${
            activeSection === "bulk"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
        >
          Manage Bulk Orders
        </button>
        <button
          onClick={() => setActiveSection("shopify")}
          className={`px-4 py-2 text-sm font-semibold ${
            activeSection === "shopify"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
        >
          Shopify Orders
        </button>
      </div>

      {activeSection === "orders" ? (
        <>
          <h2 className="text-lg font-semibold mb-4">Manage Orders</h2>
          <Tabs tabItems={ORDER_TABS} />
          <FiltersBar type="order" />
          <ProductTable TableHeader={ORDER_HEADERS} />
          <Pagination />
        </>
      ) : (
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
                    {/* Order header */}
                    <div className="bg-gray-100 px-4 py-2 flex justify-between">
                      <span className="text-sm font-semibold">
                        Order #{orderId}
                      </span>
                      <span className="text-xs text-gray-500">
                        {order.status}
                      </span>
                    </div>

                    {/* Order table */}
                    <div className="p-3">
                      <BulkOrderTable orders={[order]} />
                    </div>

                    {/* Upload UI */}
                    <div className="border-t bg-gray-50 p-3 space-y-3">
                      {/* Image previews */}
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
                              {/* Tooltip with filename on hover */}
                              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[9px] px-1 py-0.5 truncate opacity-0 group-hover:opacity-100 transition-opacity">
                                {preview.name}
                              </div>
                              {/* Remove button */}
                              <button
                                onClick={() => handleRemoveImage(orderId, idx)}
                                className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] leading-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                title="Remove"
                              >
                                ✕
                              </button>
                            </div>
                          ))}

                          {/* Count badge */}
                          <div className="w-16 h-16 flex flex-col items-center justify-center rounded border border-dashed border-gray-300 text-gray-400 text-xs text-center leading-tight">
                            <span className="text-lg font-bold text-gray-600">
                              {previews.length}
                            </span>
                            image{previews.length !== 1 ? "s" : ""}
                          </div>
                        </div>
                      )}

                      {/* Controls row */}
                      <div className="flex gap-3 flex-wrap items-end">
                        {/* File picker */}
                        <div>
                          <button
                            type="button"
                            onClick={() => fileRefs.current[orderId]?.click()}
                            className="flex items-center gap-1.5 border border-dashed border-blue-400 text-blue-600 px-3 py-2 rounded text-xs hover:bg-blue-50 transition-colors"
                          >
                            {/* Upload icon */}
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
                              e.target.value = ""; // reset so same file can be added again
                            }}
                          />
                        </div>

                        {/* AWB number */}
                        <input
                          type="text"
                          value={state.number || ""}
                          onChange={(e) =>
                            handleNumberChange(orderId, e.target.value)
                          }
                          placeholder="Bilti number"
                          className="border px-3 py-2 text-xs rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
                        />

                        {/* Submit */}
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

                      {/* Feedback */}
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

      {/* ─── Shopify Orders Section ─────────────────────────────── */}
      {activeSection === "shopify" && (
        <>
          <h2 className="text-lg font-semibold mb-4">Shopify Orders</h2>

          {/* Status filter tabs */}
          <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
            {SHOPIFY_STATUS_TABS.map((t) => (
              <button
                key={t.value}
                onClick={() => setShopifyTab(t.value)}
                style={{
                  padding: "6px 16px", borderRadius: 20,
                  border: `1.5px solid ${shopifyTab === t.value ? "#0097b2" : "#e0e0e0"}`,
                  background: shopifyTab === t.value
                    ? "linear-gradient(135deg,#0097b2,#7ed957)"
                    : "#fff",
                  color: shopifyTab === t.value ? "#fff" : "#444",
                  fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "all .15s",
                }}
              >
                {t.label}
              </button>
            ))}
            <button
              onClick={fetchShopifyOrders}
              style={{
                marginLeft: "auto", padding: "6px 16px", borderRadius: 20,
                border: "1.5px solid #e0e0e0", background: "#fff", cursor: "pointer",
                fontWeight: 600, fontSize: 13, color: "#555",
              }}
            >↻ Refresh</button>
          </div>

          {shopifyLoading ? (
            <p className="text-center py-6 text-gray-500">Loading…</p>
          ) : shopifyError ? (
            <p className="text-center py-6 text-red-500">{shopifyError}</p>
          ) : shopifyOrders.length === 0 ? (
            <div style={{
              background: "#f9f9f9", borderRadius: 12, padding: "48px 20px",
              textAlign: "center", color: "#555", fontSize: 14, lineHeight: 1.6,
            }}>
              <p style={{ margin: "0 0 12px", fontWeight: 600, color: "#333" }}>
                No Shopify orders in Unicsi yet
              </p>
              <p style={{ margin: 0, color: "#777" }}>
                Orders only appear here after your backend receives the Shopify{" "}
                <strong>orders/create</strong> webhook and saves them (dropshipper catalog must be
                pushed with <strong>mrp-update</strong> so products link to your supplier). If the
                dropshipper sees sales in Shopify but this list stays empty, the webhook URL or
                mapping is not set up yet.
              </p>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, minWidth: 720 }}>
                <thead>
                  <tr style={{ background: "linear-gradient(135deg,#0097b2,#7ed957)" }}>
                    {["Order #", "Customer", "Items", "Your cost", "Status", "Tracking", "Actions"].map((h) => (
                      <th key={h} style={{
                        padding: "12px 14px", color: "#fff", fontWeight: 700,
                        fontSize: 12, textAlign: "left", textTransform: "uppercase",
                        letterSpacing: ".04em", whiteSpace: "nowrap",
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {shopifyOrders.map((order, i) => {
                    const sc = STATUS_COLORS[order.status] || { bg: "#f5f5f5", text: "#555" };
                    return (
                      <tr key={order.id} style={{
                        background: i % 2 === 0 ? "#fff" : "#fafafa",
                        borderBottom: "1px solid #f0f0f0",
                      }}>
                        <td style={{ padding: "14px", fontWeight: 700, color: "#0097b2" }}>
                          #{order.shopify_order_number || order.id.slice(0, 8)}
                        </td>
                        <td style={{ padding: "14px" }}>
                          <div style={{ fontWeight: 600 }}>{order.customer_name || "—"}</div>
                          <div style={{ fontSize: 12, color: "#888" }}>{order.customer_phone || ""}</div>
                        </td>
                        <td style={{ padding: "14px" }}>
                          {(order.line_items || []).map((item, j) => (
                            <div key={j} style={{ fontSize: 13 }}>
                              {item.title} × {item.quantity}
                            </div>
                          ))}
                        </td>
                        <td style={{ padding: "14px", fontWeight: 600 }}>
                          {order.supplier_cost_price != null && order.supplier_cost_price !== ""
                            ? `${order.currency || "₹"} ${order.supplier_cost_price}`
                            : "—"}
                        </td>
                        <td style={{ padding: "14px" }}>
                          <span style={{
                            background: sc.bg, color: sc.text,
                            padding: "3px 10px", borderRadius: 20,
                            fontSize: 12, fontWeight: 700, textTransform: "capitalize",
                          }}>{order.status}</span>
                        </td>
                        <td style={{ padding: "14px", fontSize: 12, color: "#555" }}>
                          {order.tracking_number ? (
                            <span>🚚 {order.tracking_number}<br />
                              <span style={{ color: "#999" }}>{order.tracking_company}</span>
                            </span>
                          ) : "—"}
                        </td>
                        <td style={{ padding: "14px" }}>
                          <div style={{ display: "flex", gap: 8 }}>
                            {["new", "routed"].includes(order.status) && (
                              <button
                                onClick={() => handleAccept(order.id)}
                                disabled={actionLoading[order.id]}
                                style={{
                                  padding: "7px 14px", border: "none", borderRadius: 8,
                                  background: "#0097b2", color: "#fff",
                                  fontSize: 13, fontWeight: 700, cursor: "pointer",
                                  opacity: actionLoading[order.id] ? 0.6 : 1,
                                }}
                              >
                                {actionLoading[order.id] ? "…" : "Accept"}
                              </button>
                            )}
                            {["accepted", "packed"].includes(order.status) && (
                              <button
                                onClick={() => setShipModal(order)}
                                style={{
                                  padding: "7px 14px", border: "none", borderRadius: 8,
                                  background: "linear-gradient(135deg,#0097b2,#7ed957)",
                                  color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer",
                                }}
                              >
                                Mark Shipped
                              </button>
                            )}
                            {["shipped", "fulfilled", "delivered", "cancelled"].includes(order.status) && (
                              <span style={{ color: "#aaa", fontSize: 12 }}>No action</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}

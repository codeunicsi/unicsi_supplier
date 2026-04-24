import { useState, useEffect, useRef } from "react";
import Pagination from "../ui/Pagination";
import BulkOrderTable from "./Bulkordertable";
import {
  getBulkOrders,
  uploadBiltiDetails,
  fetchAllAddresses,
  createShipment,
  generateLabel,
  updateOrderStatus,
  trackShipment,
} from "../services/prodile/profile.service";
import { shopifyOrders } from "../services/prodile/profile.service";

const ORDER_HEADERS = [
  "Product",
  "SKU",
  "Stock",
  "Status",
  "AWB",
  "Courier",
  "Actions",
];

const SLA_STATUS_OPTIONS = [
  { value: "", label: "-- Select Option --" },
  { value: "breached", label: "Breached" },
  { value: "at_risk", label: "At Risk" },
  { value: "on_track", label: "On Track" },
];

// ── helpers ───────────────────────────────────────────────────────────────────
function formatOrderDate(isoString) {
  if (!isoString) return "";
  const d = new Date(isoString);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
}

function buildShipmentPayload(row, activeWarehouse, rtoSameAddress) {
  const sa = row.shippingAddress ?? {};
  const ba = row.billingAddress ?? {};

  return {
    order_id: row.orderId,
    order_date: formatOrderDate(row.createdAt),
    carrier_id: "",
    billing_customer_name: ba.first_name ?? sa.first_name ?? "",
    billing_last_name: ba.last_name ?? sa.last_name ?? "",
    billing_address: ba.address1 ?? sa.address1 ?? "",
    billing_city: ba.city ?? sa.city ?? "",
    billing_pincode: ba.zip ?? sa.zip ?? "",
    billing_state: ba.province ?? sa.province ?? "",
    billing_country: ba.country ?? sa.country ?? "",
    billing_email: row.customerEmail ?? "",
    billing_phone: ba.phone ?? sa.phone ?? row.customerPhone ?? "9999999999",
    shipping_is_billing: true,
    print_label: true,
    order_items: [
      {
        name: row.product,
        sku: row.sku,
        units: row.stock,
        selling_price: parseFloat(row.price) || 0,
        discount: 0,
        tax: 0,
      },
    ],
    payment_method: "PREPAID",
    sub_total: parseFloat(row.totalPrice) || 0,
    cod_collectible: 0,
    length: 10,
    breadth: 10,
    height: 10,
    weight: 1,
    pickup_location: "Primary",
    warehouse_id: activeWarehouse?.warehouse_code ?? "",
    rto_warehouse_id: rtoSameAddress
      ? ""
      : (activeWarehouse?.warehouse_code ?? ""),
    vendor_details: {
      email: row.customerEmail ?? "",
      phone: ba.phone ?? sa.phone ?? row.customerPhone ?? "9999999999",
      name: `${ba.first_name ?? sa.first_name ?? ""} ${ba.last_name ?? sa.last_name ?? ""}`.trim(),
      address: ba.address1 ?? sa.address1 ?? "",
      address_2: ba.address2 ?? sa.address2 ?? "",
      city: ba.city ?? sa.city ?? "",
      state: ba.province ?? sa.province ?? "",
      country: ba.country ?? sa.country ?? "",
      pin_code: ba.zip ?? sa.zip ?? "",
      pickup_location: "Primary",
    },
  };
}

// ── Create Shipment Modal ─────────────────────────────────────────────────────
function CreateShipmentModal({ row, onClose, onConfirm }) {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [rtoSameAddress, setRtoSameAddress] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirming, setConfirming] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchAllAddresses();
        const all = res?.data?.data ?? res?.data ?? [];
        const active = all.filter((a) => a.is_active && !a.is_deleted);
        setAddresses(active);
        if (active.length > 0) setSelectedAddress(active[0]);
      } catch (err) {
        setError(err?.message || "Failed to load addresses.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleConfirm = async () => {
    if (!selectedAddress) return;
    setConfirming(true);
    setError(null);
    try {
      const payload = buildShipmentPayload(
        row,
        selectedAddress,
        rtoSameAddress,
      );
      await onConfirm(payload);
      setSuccess(true);
      setTimeout(() => onClose(), 1200);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to create shipment.",
      );
    } finally {
      setConfirming(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-black/40 p-3 py-6 sm:items-center sm:p-4"
      onClick={(e) => e.target === e.currentTarget && !confirming && onClose()}
    >
      <div className="max-h-[min(90vh,calc(100dvh-2rem))] w-full max-w-lg overflow-y-auto rounded-lg bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-base font-semibold text-gray-800">
            Create Shipment
          </h2>
          <button
            onClick={onClose}
            disabled={confirming}
            className="text-gray-400 hover:text-gray-600 transition-colors text-lg leading-none disabled:opacity-40"
          >
            ✕
          </button>
        </div>

        {/* Order summary strip */}
        <div className="px-5 pt-3 pb-3 bg-gray-50 border-b">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
            Order Details
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-gray-700">
            <span>
              <span className="text-gray-400">Order:</span> {row.orderName}
            </span>
            <span>
              <span className="text-gray-400">Product:</span> {row.product}
            </span>
            <span>
              <span className="text-gray-400">SKU:</span> {row.sku}
            </span>
            <span>
              <span className="text-gray-400">Qty:</span> {row.stock}
            </span>
            <span>
              <span className="text-gray-400">Amount:</span> ₹{row.totalPrice}
            </span>
          </div>
        </div>

        {/* Address list */}
        <div className="px-5 py-4">
          <p className="text-sm font-medium text-gray-600 mb-3">
            Select Pickup Address:
          </p>

          {loading ? (
            <p className="text-center py-8 text-gray-400 text-sm">
              Loading addresses…
            </p>
          ) : error && addresses.length === 0 ? (
            <p className="text-center py-8 text-red-500 text-sm">{error}</p>
          ) : addresses.length === 0 ? (
            <p className="text-center py-8 text-gray-400 text-sm">
              No active pickup addresses found.
            </p>
          ) : (
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {addresses.map((addr) => (
                <label
                  key={addr.warehouse_id}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedAddress?.warehouse_id === addr.warehouse_id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="pickup_address"
                    className="mt-0.5 accent-blue-600"
                    checked={
                      selectedAddress?.warehouse_id === addr.warehouse_id
                    }
                    onChange={() => setSelectedAddress(addr)}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800">
                      {addr.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {addr.address}, {addr.city}, {addr.state}, {addr.country}{" "}
                      – {addr.pincode}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Warehouse Code:{" "}
                      <span className="font-medium text-gray-600">
                        {addr.warehouse_code}
                      </span>
                    </p>
                    <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                      Active
                    </span>
                  </div>
                </label>
              ))}
            </div>
          )}

          {error && addresses.length > 0 && (
            <p className="mt-2 text-red-500 text-xs">{error}</p>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-4 border-t bg-gray-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <span className="text-xs font-medium text-gray-600">
              Use the same address for RTO?
            </span>
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <label className="flex cursor-pointer items-center gap-1.5">
                <input
                  type="radio"
                  name="rto"
                  checked={rtoSameAddress}
                  onChange={() => setRtoSameAddress(true)}
                  className="accent-blue-600"
                />
                Yes
              </label>
              <label className="flex cursor-pointer items-center gap-1.5">
                <input
                  type="radio"
                  name="rto"
                  checked={!rtoSameAddress}
                  onChange={() => setRtoSameAddress(false)}
                  className="accent-blue-600"
                />
                No
              </label>
            </div>
          </div>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={!selectedAddress || confirming || loading || success}
            className="flex w-full shrink-0 items-center justify-center gap-2 rounded bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:py-2"
          >
            {success ? (
              <>
                <svg
                  className="w-3.5 h-3.5 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Done!
              </>
            ) : confirming ? (
              <>
                <svg
                  className="w-3.5 h-3.5 animate-spin"
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
                Processing…
              </>
            ) : (
              <>
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                CONFIRM SHIPMENT
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function ManageOrder() {
  const [activeSection, setActiveSection] = useState("orders");
  const [activeOrderTab, setActiveOrderTab] = useState("All");
  const [activeSubTab, setActiveSubTab] = useState("New");
  const [viewMode, setViewMode] = useState("Aggregated");
  const [slaStatus, setSlaStatus] = useState("");
  const [skuId, setSkuId] = useState("");
  const [showHighPriority, setShowHighPriority] = useState(false);
  const [shipmentModal, setShipmentModal] = useState(null);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState(null);
  const [bulkOrders, setBulkOrders] = useState([]);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [bulkError, setBulkError] = useState(null);
  const [uploadState, setUploadState] = useState({});
  const fileRefs = useRef({});

  const STATUS_MAP = {
    All: [],
    "Pending": ["Pending", "pending_supplier"],
    "Dispatched": ["Dispatched"],
    "In Transit": ["In_Transit"],
    "Delivered": ["Delivered"],
    "Cancelled": ["Cancelled"],
    "Refunded": ["Refunded"],
  };

  const isPending = (status) => status === "Pending" || status === "pending_supplier";

  const ORDER_TABS = Object.keys(STATUS_MAP).map((label) => ({ label }));

  useEffect(() => {
    if (activeSection !== "orders") return;
    const fetchOrders = async () => {
      setOrdersLoading(true);
      setOrdersError(null);
      try {
        const res = await shopifyOrders();
        setOrders(res?.data?.data ?? []);
      } catch (err) {
        setOrdersError(err?.message || "Failed to fetch orders.");
      } finally {
        setOrdersLoading(false);
      }
    };
    fetchOrders();
  }, [activeSection]);

  useEffect(() => {
    if (activeSection !== "bulk") return;
    const fetchBulkOrders = async () => {
      setBulkLoading(true);
      setBulkError(null);
      try {
        const res = await getBulkOrders();
        setBulkOrders(res?.data?.data?.orders ?? []);
      } catch (err) {
        setBulkError(err?.message || "Failed to fetch bulk orders.");
      } finally {
        setBulkLoading(false);
      }
    };
    fetchBulkOrders();
  }, [activeSection]);

  // Flatten orders — carry ALL fields the payload builder needs
  const tableRows = orders.flatMap((order) =>
    (order.items_json ?? []).map((item) => ({
      orderId: order.order_id,
      orderName: order.shopify_order_name,
      status: order.status,
      createdAt: order.createdAt,
      customerEmail: order.customer_email,
      customerPhone: order.customer_phone,
      shippingAddress: order.shipping_address,
      billingAddress: order.billing_address,
      totalPrice: order.total_price,
      currency: order.currency,
      product: item.title,
      sku: item.sku,
      stock: item.quantity,
      price: item.price,
      variantTitle: item.variantTitle,
      labelUrl: order.label_url,
      awbCode: order.awb_code,
      trackingNumber: order.tracking_number,
      courierName: order.tracking_carrier,
      trackingUrl: order.tracking_url,
    })),
  );

  const [appliedSkuId, setAppliedSkuId] = useState("");
  const [_appliedSla, setAppliedSlaStatus] = useState("");

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
    if (
      appliedSkuId &&
      !row.sku?.toLowerCase().includes(appliedSkuId.toLowerCase())
    )
      return false;
    const allowedStatuses = STATUS_MAP[activeOrderTab];
    if (allowedStatuses.length > 0 && !allowedStatuses.includes(row.status))
      return false;
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

  const [updatingOrders, setUpdatingOrders] = useState({});

  const handleUpdateStatus = async (orderId, newStatus) => {
    setUpdatingOrders((prev) => ({ ...prev, [orderId]: true }));
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((o) => (o.order_id === orderId ? { ...o, status: newStatus } : o)),
      );
    } catch (err) {
      alert(err?.response?.data?.error || err?.message || "Failed to update order");
    } finally {
      setUpdatingOrders((prev) => ({ ...prev, [orderId]: false }));
    }
  };

  // Receives the fully-built payload from the modal
  const handleConfirmShipment = async (payload) => {
    const res = await createShipment(payload);
    const data = res?.data?.data ?? res?.data;
    const updatedOrder = data?.order;
    if (updatedOrder) {
      setOrders((prev) =>
        prev.map((o) =>
          o.order_id === updatedOrder.order_id ? { ...o, ...updatedOrder } : o
        )
      );
    } else {
      // Fallback: at minimum update status so UI reflects the change
      setOrders((prev) =>
        prev.map((o) =>
          o.order_id === payload.order_id
            ? { ...o, status: "Dispatched", label_url: data?.shipment?.label_url ?? o.label_url }
            : o
        )
      );
    }
    return res;
  };

  // Generate / download shipping label for an order
  const handleDownloadLabel = async (row) => {
    if (row.labelUrl) {
      window.open(row.labelUrl, "_blank");
      return;
    }
    // If no label_url stored, try generating via AWB
    try {
      const awb = row.awbCode || row.trackingNumber;
      if (!awb) {
        alert("No AWB code found. Please create a shipment first.");
        return;
      }
      const res = await generateLabel(awb);
      const labelUrl = res?.data?.data?.label_url || res?.data?.label_url;
      if (labelUrl) {
        // Update local state with the label URL
        setOrders((prev) =>
          prev.map((o) =>
            o.order_id === row.orderId ? { ...o, label_url: labelUrl } : o
          )
        );
        window.open(labelUrl, "_blank");
      } else {
        alert("Label not available yet. Please try again later.");
      }
    } catch (err) {
      alert(err?.response?.data?.message || err?.message || "Failed to generate label.");
    }
  };

  // ── AWB Tracking ──────────────────────────────────────────────────
  const [trackingModal, setTrackingModal] = useState(null);
  const [trackingData, setTrackingData] = useState(null);
  const [trackingLoading, setTrackingLoading] = useState(false);

  const handleTrackAWB = async (row) => {
    const awb = row.awbCode || row.trackingNumber;
    if (!awb) return alert("No AWB code found.");
    setTrackingModal(awb);
    setTrackingLoading(true);
    setTrackingData(null);
    try {
      const res = await trackShipment([awb]);
      setTrackingData(res.data?.data || res.data);
    } catch (err) {
      setTrackingData({ error: err.response?.data?.message || err.message });
    } finally {
      setTrackingLoading(false);
    }
  };

  // ── Bulk upload handlers ──────────────────────────────────────────
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

  return (
    <div className="w-full min-w-0 max-w-full">
      {/* Shipment Modal */}
      {shipmentModal && (
        <CreateShipmentModal
          row={shipmentModal}
          onClose={() => setShipmentModal(null)}
          onConfirm={handleConfirmShipment}
        />
      )}

      {/* Section tabs */}
      <div className="mb-6 flex min-w-0 gap-1 overflow-x-auto border-b pb-px [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-2 [&::-webkit-scrollbar]:hidden">
        <button
          type="button"
          onClick={() => setActiveSection("orders")}
          className={`shrink-0 whitespace-nowrap px-3 py-2 text-xs font-semibold sm:px-4 sm:text-sm ${activeSection === "orders" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
        >
          Manage Orders
        </button>
        <button
          type="button"
          onClick={() => setActiveSection("bulk")}
          className={`shrink-0 whitespace-nowrap px-3 py-2 text-xs font-semibold sm:px-4 sm:text-sm ${activeSection === "bulk" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
        >
          Manage Bulk Orders
        </button>
      </div>

      {activeSection === "orders" ? (
        <>
          <div className="mb-4 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="shrink-0 text-base font-semibold sm:text-lg">
              Manage Orders
            </h2>
            <div className="flex min-w-0 w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-end">
              <button
                type="button"
                onClick={handleDownloadOrdersData}
                className="flex w-full items-center justify-center gap-1.5 rounded border border-gray-300 px-3 py-2 text-xs text-gray-700 transition-colors hover:bg-gray-50 sm:w-auto sm:justify-start sm:py-1.5 sm:text-sm"
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
                type="button"
                onClick={handleDownloadHistory}
                className="flex w-full items-center justify-center gap-1.5 rounded border border-gray-300 px-3 py-2 text-xs text-gray-700 transition-colors hover:bg-gray-50 sm:w-auto sm:justify-start sm:py-1.5 sm:text-sm"
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

          <div className="mb-3 flex min-w-0 gap-0 overflow-x-auto border-b [-ms-overflow-style:none] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5">
            {ORDER_TABS.map(({ label }) => (
              <button
                type="button"
                key={label}
                onClick={() => setActiveOrderTab(label)}
                className={`flex shrink-0 items-center gap-1 border-b-2 px-2.5 py-2 text-xs font-medium whitespace-nowrap transition-colors sm:gap-1.5 sm:px-4 sm:text-sm ${
                  activeOrderTab === label
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {label}
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${activeOrderTab === label ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`}
                >
                  {getCount(label)}
                </span>
              </button>
            ))}
          </div>

          <div className="mb-3 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 flex-wrap gap-2">
              {["New", "Under Processing"].map((sub) => (
                <button
                  type="button"
                  key={sub}
                  onClick={() => setActiveSubTab(sub)}
                  className={`flex min-w-0 items-center gap-1.5 rounded px-2.5 py-1.5 text-xs font-medium transition-colors sm:px-3 sm:text-sm ${activeSubTab === sub ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
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
            <div className="flex w-full max-w-full shrink-0 items-center overflow-hidden rounded border border-gray-300 text-xs sm:w-auto sm:text-sm">
              {["Aggregated", "Order Level"].map((mode) => (
                <button
                  type="button"
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`min-w-0 flex-1 px-2 py-1.5 font-medium transition-colors sm:flex-none sm:px-3 ${viewMode === mode ? "bg-gray-900 text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4 flex min-w-0 flex-col gap-4">
            <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
            <div className="flex min-w-0 w-full flex-col gap-1 sm:w-auto sm:min-w-[10rem]">
              <label className="text-xs font-medium text-gray-600">
                SLA Status:
              </label>
              <select
                value={slaStatus}
                onChange={(e) => setSlaStatus(e.target.value)}
                className="min-h-[2.5rem] w-full min-w-0 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 sm:min-w-[150px]"
              >
                {SLA_STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex min-w-0 w-full flex-col gap-1 sm:w-auto sm:min-w-[10rem]">
              <label className="text-xs font-medium text-gray-600">
                SKU ID:
              </label>
              <input
                type="text"
                value={skuId}
                onChange={(e) => setSkuId(e.target.value)}
                placeholder="Enter SKU ID"
                className="min-h-[2.5rem] w-full min-w-0 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 sm:min-w-[160px]"
              />
            </div>
            <button
              type="button"
              onClick={handleApplyFilters}
              className="flex w-full items-center justify-center gap-1.5 rounded bg-gray-800 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-900 sm:w-auto sm:py-2"
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
              type="button"
              onClick={handleResetFilters}
              className="flex w-full items-center justify-center gap-1.5 rounded border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 sm:w-auto sm:py-2"
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
            </div>
            <div className="flex min-w-0 flex-col gap-3 border-t border-gray-100 pt-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <label className="flex min-w-0 cursor-pointer select-none items-center gap-2">
                <div
                  role="switch"
                  tabIndex={0}
                  aria-checked={showHighPriority}
                  onClick={() => setShowHighPriority((p) => !p)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      setShowHighPriority((p) => !p);
                  }}
                  className={`relative h-5 w-10 shrink-0 rounded-full transition-colors ${showHighPriority ? "bg-pink-400" : "bg-gray-200"}`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${showHighPriority ? "translate-x-5" : "translate-x-0"}`}
                  />
                </div>
                <span className="text-xs font-medium leading-snug text-gray-600">
                  Show high priority orders
                </span>
              </label>
              <button
                type="button"
                onClick={handleDownloadTable}
                className="flex w-full items-center justify-center gap-1.5 rounded border border-gray-300 px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 sm:w-auto sm:justify-start"
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

          {ordersLoading ? (
            <p className="text-center py-10 text-gray-500">Loading orders…</p>
          ) : ordersError ? (
            <p className="text-center py-10 text-red-500">{ordersError}</p>
          ) : (
            <>
              {/* Mobile / tablet: order cards (no horizontal table scroll) */}
              <div className="md:hidden">
                {filteredRows.length === 0 ? (
                  <p className="rounded border border-gray-200 py-10 text-center text-gray-400">
                    No rows
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {filteredRows.map((row, idx) => (
                      <li
                        key={`${row.orderId}-${idx}`}
                        className="min-w-0 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            className="mt-1 shrink-0 rounded"
                            aria-label={`Select ${row.product}`}
                          />
                          <div className="min-w-0 flex-1 space-y-3">
                            <div>
                              <p className="break-words font-semibold text-gray-900">
                                {row.product}
                              </p>
                              {row.variantTitle ? (
                                <p className="mt-0.5 break-words text-xs text-gray-500">
                                  {row.variantTitle}
                                </p>
                              ) : null}
                              <p className="mt-1 text-xs text-gray-400">
                                {row.orderName}
                              </p>
                            </div>
                            <dl className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs sm:text-sm">
                              <div className="min-w-0">
                                <dt className="text-gray-400">SKU</dt>
                                <dd className="break-all font-medium text-gray-700">
                                  {row.sku || "—"}
                                </dd>
                              </div>
                              <div>
                                <dt className="text-gray-400">Stock</dt>
                                <dd className="font-medium text-gray-700">
                                  {row.stock}
                                </dd>
                              </div>
                              <div className="col-span-2">
                                <dt className="text-gray-400">Status</dt>
                                <dd className="break-words text-gray-600">
                                  {row.status}
                                </dd>
                              </div>
                              {(row.awbCode || row.trackingNumber) && (
                                <div className="min-w-0">
                                  <dt className="text-gray-400">AWB</dt>
                                  <dd className="break-all font-medium text-blue-600">
                                    {row.trackingUrl ? (
                                      <a href={row.trackingUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                        {row.awbCode || row.trackingNumber}
                                      </a>
                                    ) : (
                                      row.awbCode || row.trackingNumber
                                    )}
                                  </dd>
                                </div>
                              )}
                              {row.courierName && (
                                <div>
                                  <dt className="text-gray-400">Courier</dt>
                                  <dd className="font-medium text-gray-700">
                                    {row.courierName}
                                  </dd>
                                </div>
                              )}
                            </dl>
                            <div className="flex flex-wrap gap-2 pt-1">
                              {isPending(row.status) && (
                                <button
                                  type="button"
                                  onClick={() => setShipmentModal(row)}
                                  className="flex w-full items-center justify-center gap-1.5 rounded bg-blue-600 px-3 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-blue-700 sm:w-auto sm:py-2"
                                >
                                  Create Shipment
                                </button>
                              )}
                              {row.status === "Dispatched" && (
                                <button
                                  type="button"
                                  onClick={() => handleUpdateStatus(row.orderId, "In_Transit")}
                                  disabled={updatingOrders[row.orderId]}
                                  className="flex w-full items-center justify-center gap-1.5 rounded bg-indigo-600 px-3 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-50 sm:w-auto sm:py-2"
                                >
                                  {updatingOrders[row.orderId] ? "Updating..." : "Mark In Transit"}
                                </button>
                              )}
                              {row.status === "In_Transit" && (
                                <button
                                  type="button"
                                  onClick={() => handleUpdateStatus(row.orderId, "Delivered")}
                                  disabled={updatingOrders[row.orderId]}
                                  className="flex w-full items-center justify-center gap-1.5 rounded bg-emerald-600 px-3 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-700 disabled:opacity-50 sm:w-auto sm:py-2"
                                >
                                  {updatingOrders[row.orderId] ? "Updating..." : "Mark Delivered"}
                                </button>
                              )}
                              {(row.awbCode || row.trackingNumber) && !["Delivered", "Cancelled", "Refunded", "Hold"].includes(row.status) && (
                                <button
                                  type="button"
                                  onClick={() => handleDownloadLabel(row)}
                                  className="flex w-full items-center justify-center gap-1.5 rounded bg-teal-600 px-3 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-teal-700 sm:w-auto sm:py-2"
                                >
                                  Download Label
                                </button>
                              )}
                              {(row.awbCode || row.trackingNumber) && !["Delivered", "Cancelled", "Refunded", "Hold"].includes(row.status) && (
                                <button
                                  type="button"
                                  onClick={() => handleTrackAWB(row)}
                                  className="flex w-full items-center justify-center gap-1.5 rounded bg-indigo-600 px-3 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-indigo-700 sm:w-auto sm:py-2"
                                >
                                  Track
                                </button>
                              )}
                              {!["Delivered", "Cancelled", "Refunded", "Hold", "pending_supplier"].includes(row.status) && (
                                <button
                                  type="button"
                                  onClick={() => handleUpdateStatus(row.orderId, "Hold")}
                                  disabled={updatingOrders[row.orderId]}
                                  className="flex w-full items-center justify-center gap-1.5 rounded bg-amber-600 px-3 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-amber-700 disabled:opacity-50 sm:w-auto sm:py-2"
                                >
                                  {updatingOrders[row.orderId] ? "..." : "Hold"}
                                </button>
                              )}
                              {["Delivered", "Cancelled", "Refunded", "Hold"].includes(row.status) && (
                                <span className="text-xs text-gray-400 capitalize">{row.status}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* md+: wide table with horizontal scroll if needed */}
              <div className="hidden min-w-0 w-full max-w-full overflow-x-auto rounded border border-gray-200 [-ms-overflow-style:auto] [scrollbar-width:thin] md:block">
                <table className="w-full min-w-[52rem] text-sm sm:min-w-[56rem]">
                  <thead>
                    <tr className="bg-teal-500 text-xs uppercase text-white">
                      <th className="w-8 px-2 py-3 sm:px-3">
                        <input type="checkbox" className="rounded" />
                      </th>
                      {ORDER_HEADERS.map((h) => (
                        <th
                          key={h}
                          className="whitespace-nowrap px-2 py-3 text-left font-semibold sm:px-3"
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
                          className="py-10 text-center text-gray-400"
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
                          <td className="px-2 py-3 sm:px-3">
                            <input type="checkbox" className="rounded" />
                          </td>
                          <td className="max-w-[14rem] px-2 py-3 sm:max-w-xs sm:px-3">
                            <div className="break-words font-medium text-gray-800">
                              {row.product}
                            </div>
                            <div className="text-xs text-gray-400">
                              {row.variantTitle}
                            </div>
                          </td>
                          <td className="px-2 py-3 text-gray-600 sm:px-3">
                            {row.sku}
                          </td>
                          <td className="px-2 py-3 text-gray-600 sm:px-3">
                            {row.stock}
                          </td>
                          <td className="px-2 py-3 text-gray-400 sm:px-3">
                            {row.status}
                          </td>
                          <td className="px-2 py-3 text-gray-600 sm:px-3">
                            {row.awbCode || row.trackingNumber ? (
                              row.trackingUrl ? (
                                <a href={row.trackingUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs font-medium">
                                  {row.awbCode || row.trackingNumber}
                                </a>
                              ) : (
                                <span className="text-xs font-medium">{row.awbCode || row.trackingNumber}</span>
                              )
                            ) : (
                              <span className="text-gray-400">—</span>
                            )}
                          </td>
                          <td className="px-2 py-3 text-gray-600 sm:px-3">
                            {row.courierName || <span className="text-gray-400">—</span>}
                          </td>
                          <td className="px-2 py-3 sm:px-3">
                            <div className="flex flex-wrap gap-1.5">
                              {isPending(row.status) && (
                                <button
                                  type="button"
                                  onClick={() => setShipmentModal(row)}
                                  className="flex items-center gap-1.5 whitespace-nowrap rounded bg-blue-600 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-blue-700 sm:px-3"
                                >
                                  Create Shipment
                                </button>
                              )}
                              {row.status === "Dispatched" && (
                                <button
                                  type="button"
                                  onClick={() => handleUpdateStatus(row.orderId, "In_Transit")}
                                  disabled={updatingOrders[row.orderId]}
                                  className="flex items-center gap-1.5 whitespace-nowrap rounded bg-indigo-600 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-50 sm:px-3"
                                >
                                  {updatingOrders[row.orderId] ? "..." : "In Transit"}
                                </button>
                              )}
                              {row.status === "In_Transit" && (
                                <button
                                  type="button"
                                  onClick={() => handleUpdateStatus(row.orderId, "Delivered")}
                                  disabled={updatingOrders[row.orderId]}
                                  className="flex items-center gap-1.5 whitespace-nowrap rounded bg-emerald-600 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-700 disabled:opacity-50 sm:px-3"
                                >
                                  {updatingOrders[row.orderId] ? "..." : "Delivered"}
                                </button>
                              )}
                              {(row.awbCode || row.trackingNumber) && !["Delivered", "Cancelled", "Refunded", "Hold"].includes(row.status) && (
                                <button
                                  type="button"
                                  onClick={() => handleDownloadLabel(row)}
                                  className="flex items-center gap-1.5 whitespace-nowrap rounded bg-teal-600 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-teal-700 sm:px-3"
                                >
                                  Download Label
                                </button>
                              )}
                              {(row.awbCode || row.trackingNumber) && !["Delivered", "Cancelled", "Refunded", "Hold"].includes(row.status) && (
                                <button
                                  type="button"
                                  onClick={() => handleTrackAWB(row)}
                                  className="flex items-center gap-1.5 whitespace-nowrap rounded bg-indigo-600 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-indigo-700 sm:px-3"
                                >
                                  Track
                                </button>
                              )}
                              {!["Delivered", "Cancelled", "Refunded", "Hold", "pending_supplier"].includes(row.status) && (
                                <button
                                  type="button"
                                  onClick={() => handleUpdateStatus(row.orderId, "Hold")}
                                  disabled={updatingOrders[row.orderId]}
                                  className="flex items-center gap-1.5 whitespace-nowrap rounded bg-amber-600 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-amber-700 disabled:opacity-50 sm:px-3"
                                >
                                  {updatingOrders[row.orderId] ? "..." : "Hold"}
                                </button>
                              )}
                              {["Delivered", "Cancelled", "Refunded", "Hold"].includes(row.status) && (
                                <span className="text-xs text-gray-400 capitalize">{row.status}</span>
                              )}
                            </div>
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
        <>
          <h2 className="mb-4 text-base font-semibold sm:text-lg">
            Manage Bulk Orders
          </h2>
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
                    <div className="flex flex-col gap-1 bg-gray-100 px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:px-4">
                      <span className="min-w-0 break-all text-sm font-semibold">
                        Order #{orderId}
                      </span>
                      <span className="shrink-0 text-xs text-gray-500">
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
                      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
                        <div className="w-full min-w-0 sm:w-auto">
                          <button
                            type="button"
                            onClick={() => fileRefs.current[orderId]?.click()}
                            className="flex w-full items-center justify-center gap-1.5 rounded border border-dashed border-blue-400 px-3 py-2 text-xs text-blue-600 transition-colors hover:bg-blue-50 sm:w-auto sm:justify-start"
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
                          className="min-h-[2.5rem] w-full min-w-0 rounded border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-400 sm:max-w-xs sm:flex-1"
                        />
                        <button
                          type="button"
                          onClick={() => handleUpload(orderId)}
                          disabled={state.uploading}
                          className="w-full rounded bg-blue-600 px-4 py-2.5 text-xs text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:py-2"
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
      {/* AWB Tracking Modal */}
      {trackingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b px-5 py-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Tracking — {trackingModal}
              </h3>
              <button
                onClick={() => { setTrackingModal(null); setTrackingData(null); }}
                className="text-2xl text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-5">
              {trackingLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
                </div>
              ) : trackingData?.error ? (
                <p className="text-center text-red-500">{trackingData.error}</p>
              ) : trackingData ? (
                <TrackingTimeline data={trackingData} />
              ) : (
                <p className="text-center text-gray-500">No tracking data.</p>
              )}
            </div>
            <div className="border-t px-5 py-3 text-right">
              <button
                onClick={() => { setTrackingModal(null); setTrackingData(null); }}
                className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TrackingTimeline({ data }) {
  // Velocity returns: { result: { "<awb>": { tracking_data: { shipment_track_activities: [...] } } } }
  let events = [];
  let shipmentInfo = null;

  if (data?.result) {
    const awbKey = Object.keys(data.result)[0];
    const awbData = data.result[awbKey]?.tracking_data;
    if (awbData) {
      events = awbData.shipment_track_activities || [];
      shipmentInfo = awbData.shipment_track?.[0] || null;
    }
  } else if (Array.isArray(data)) {
    events = data;
  } else if (data?.tracking_data?.shipment_track_activities) {
    events = data.tracking_data.shipment_track_activities;
    shipmentInfo = data.tracking_data.shipment_track?.[0] || null;
  }

  if (events.length === 0 && !shipmentInfo) {
    return <p className="text-center text-gray-500">No tracking events found.</p>;
  }

  return (
    <div className="space-y-4">
      {shipmentInfo && (
        <div className="rounded-lg bg-gray-50 p-3 text-sm space-y-1">
          <p><span className="font-medium text-gray-600">Status:</span> <span className="capitalize font-semibold text-gray-800">{shipmentInfo.current_status?.replace(/_/g, " ")}</span></p>
          {shipmentInfo.origin && <p><span className="font-medium text-gray-600">Origin:</span> {shipmentInfo.origin}</p>}
          {shipmentInfo.destination && <p><span className="font-medium text-gray-600">Destination:</span> {shipmentInfo.destination}</p>}
          {shipmentInfo.consignee_name && <p><span className="font-medium text-gray-600">Consignee:</span> {shipmentInfo.consignee_name}</p>}
        </div>
      )}
      <ol className="relative border-l-2 border-blue-200 ml-3">
        {events.map((ev, i) => (
          <li key={i} className="mb-6 ml-6">
            <span className="absolute -left-2 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 ring-4 ring-white">
              <span className="h-2 w-2 rounded-full bg-white" />
            </span>
            <div className="text-sm">
              <p className="font-medium text-gray-800">
                {ev.activity || ev.status || ev.Status || "Update"}
              </p>
              {(ev.location || ev.Location) && (
                <p className="text-xs text-gray-500">{ev.location || ev.Location}</p>
              )}
              {(ev.date || ev.Date || ev["sr-status-date"]) && (
                <p className="text-xs text-gray-400">
                  {new Date(ev.date || ev.Date || ev["sr-status-date"]).toLocaleString()}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

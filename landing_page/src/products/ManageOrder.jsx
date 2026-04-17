import { useState, useEffect, useRef } from "react";
import Pagination from "../ui/Pagination";
import BulkOrderTable from "./Bulkordertable";
import {
  getBulkOrders,
  uploadBiltiDetails,
  fetchAllAddresses,
  createShipment, // ← add this export to your profile.service.js
} from "../services/prodile/profile.service";
import { shopifyOrders } from "../services/prodile/profile.service";

const ORDER_HEADERS = [
  "Product",
  "SKU",
  "Stock",
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={(e) => e.target === e.currentTarget && !confirming && onClose()}
    >
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
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
        <div className="flex items-center justify-between px-5 py-4 border-t bg-gray-50">
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-600 font-medium">
              Use the same address for RTO?
            </span>
            <div className="flex items-center gap-2 text-xs">
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="rto"
                  checked={rtoSameAddress}
                  onChange={() => setRtoSameAddress(true)}
                  className="accent-blue-600"
                />
                Yes
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
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
            onClick={handleConfirm}
            disabled={!selectedAddress || confirming || loading || success}
            className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2 rounded text-sm font-semibold hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
    "Pending Supplier": ["pending_supplier"],
    Confirmed: ["confirmed"],
    Processing: ["processing"],
    Shipped: ["shipped"],
    "In Transit": ["in_transit"],
    Delivered: ["delivered"],
    Cancelled: ["cancelled"],
    Refunded: ["refunded"],
  };

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
        setBulkOrders(res?.data?.data.orders ?? []);
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

  // Receives the fully-built payload from the modal
  const handleConfirmShipment = async (payload) => {
    console.log("Shipment payload →", JSON.stringify(payload, null, 2));
    await createShipment(payload);
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
    <div>
      {/* Shipment Modal */}
      {shipmentModal && (
        <CreateShipmentModal
          row={shipmentModal}
          onClose={() => setShipmentModal(null)}
          onConfirm={handleConfirmShipment}
        />
      )}

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
                  className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${activeOrderTab === label ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`}
                >
                  {getCount(label)}
                </span>
              </button>
            ))}
          </div>

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
                          <td className="px-3 py-3">
                            <div className="font-medium text-gray-800">
                              {row.product}
                            </div>
                            <div className="text-xs text-gray-400">
                              {row.variantTitle}
                            </div>
                          </td>
                          <td className="px-3 py-3 text-gray-600">{row.sku}</td>
                          <td className="px-3 py-3 text-gray-600">
                            {row.stock}
                          </td>
                          <td className="px-3 py-3 text-gray-400">
                            {row.status}
                          </td>
                          <td className="px-3 py-3 text-gray-400">—</td>
                          <td className="px-3 py-3 text-gray-400">—</td>
                          <td className="px-3 py-3">
                            {row.status === "processing" ? (
                              <button
                                onClick={() => {
                                  if (row.labelUrl) {
                                    window.open(row.labelUrl, "_blank"); // open PDF
                                  } else {
                                    alert("Label not available");
                                  }
                                }}
                                className="flex items-center gap-1.5 bg-green-600 text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-green-700 transition-colors whitespace-nowrap"
                              >
                                <svg
                                  className="w-3 h-3"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M12 5v14m7-7H5"
                                  />
                                </svg>
                                Download Label
                              </button>
                            ) : (
                              <button
                                onClick={() => setShipmentModal(row)}
                                className="flex items-center gap-1.5 bg-gray-900 text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-black transition-colors whitespace-nowrap"
                              >
                                <svg
                                  className="w-3 h-3"
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
                                Create Shipment
                              </button>
                            )}
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

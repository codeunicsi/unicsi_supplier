import { useState, useRef } from "react";

const GRADIENT = "linear-gradient(135deg, #0097b2 0%, #7ed957 100%)";
// ── Stub sub-components (replace with your real imports) ──────────────────────
const Tabs = ({ tabItems, activeTab, onTabChange }) => (
  <div className="flex gap-1 flex-wrap border-b border-slate-200 mb-4">
    {tabItems.map((item) => (
      <button
        key={item}
        onClick={() => onTabChange(item)}
        className={`px-3 py-2 text-sm font-medium rounded-t-md transition-colors ${
          activeTab === item
            ? "bg-white border border-b-white border-slate-200 #34b28c -mb-px"
            : "text-slate-500 hover:text-slate-700"
        }`}
      >
        {item}
      </button>
    ))}
  </div>
);

const FiltersBar = ({ type }) => (
  <div className="flex gap-2 flex-wrap mb-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
    <input
      type="text"
      placeholder="Search…"
      className="text-sm border border-slate-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-300"
    />
    <select className="text-sm border border-slate-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-300">
      <option>All Categories</option>
    </select>
    <input
      type="date"
      className="text-sm border border-slate-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-300"
    />
    <button className="ml-auto text-sm bg-indigo-600 text-white px-4 py-1.5 rounded-md hover:bg-indigo-700 transition-colors">
      Filter
    </button>
  </div>
);

const ProductTable = ({ TableHeader }) => (
  <div className="overflow-x-auto rounded-lg border border-slate-200 mb-4">
    <table className="min-w-full text-sm">
      <thead className="bg-slate-50">
        <tr>
          {TableHeader.map((h) => (
            <th
              key={h}
              className="px-4 py-3 text-left font-semibold text-slate-600 whitespace-nowrap"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[1, 2, 3].map((row) => (
          <tr
            key={row}
            className="border-t border-slate-100 hover:bg-slate-50 transition-colors"
          >
            {TableHeader.map((h) => (
              <td key={h} className="px-4 py-3 text-slate-500">
                —
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Pagination = () => (
  <div className="flex justify-between items-center text-sm text-slate-500">
    <span>Showing 1–10 of 120</span>
    <div className="flex gap-1">
      {["←", "1", "2", "3", "→"].map((p) => (
        <button
          key={p}
          className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
        >
          {p}
        </button>
      ))}
    </div>
  </div>
);
// ─────────────────────────────────────────────────────────────────────────────

// ── Status badge ──────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
      status === "Closed"
        ? "bg-emerald-100 text-emerald-700"
        : "bg-amber-100 text-amber-700"
    }`}
  >
    <span
      className={`w-1.5 h-1.5 rounded-full ${
        status === "Closed" ? "bg-emerald-500" : "bg-amber-500"
      }`}
    />
    {status}
  </span>
);

// ── Bulk Order Row ────────────────────────────────────────────────────────────
const BulkOrderRow = ({ order, onUpdate }) => {
  const fileRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Upload file → status stays Open, Submit button appears
      onUpdate(order.id, {
        builtyFile: file,
        builtyUrl: URL.createObjectURL(file),
        status: "Open",
      });
    }
  };

  const handleRemove = () => {
    if (fileRef.current) fileRef.current.value = "";
    // Remove file → back to Open with no file, Submit disappears
    onUpdate(order.id, { builtyFile: null, builtyUrl: null, status: "Open" });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    // Simulate sending builty to admin (replace with real API call)
    await new Promise((res) => setTimeout(res, 1200));
    setSubmitting(false);
    // After submit → status becomes Closed
    onUpdate(order.id, { status: "Closed" });
  };

  const isClosed = order.status === "Closed";

  return (
    <tr className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
      {/* Order ID */}
      <td className="px-4 py-3 font-mono text-indigo-600 font-medium whitespace-nowrap">
        {order.orderId}
      </td>

      {/* Product Name */}
      <td className="px-4 py-3 text-slate-700 font-medium">
        {order.productName}
      </td>

      {/* Upload Builty */}
      <td className="px-4 py-3">
        {order.builtyUrl ? (
          <div className="flex items-center gap-2">
            <a
              href={order.builtyUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs text-indigo-600 hover:underline truncate max-w-[140px]"
            >
              <svg
                className="w-4 h-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0121 9.414V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="truncate">
                {order.builtyFile?.name ?? "builty.pdf"}
              </span>
            </a>
            {/* Remove only allowed when not yet submitted (Open) */}
            {!isClosed && (
              <button
                onClick={handleRemove}
                title="Remove file"
                className="shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-red-100 text-red-500 hover:bg-red-200 transition-colors"
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        ) : (
          <label
            className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-dashed border-indigo-300 text-indigo-600 text-xs font-medium hover:bg-indigo-50 transition-colors ${isClosed ? "opacity-50 pointer-events-none" : ""}`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            Upload Builty
            <input
              ref={fileRef}
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        )}
      </td>

      {/* Order Status */}
      <td className="px-4 py-3">
        <StatusBadge status={order.status} />
      </td>

      {/* Action */}
      <td className="px-4 py-3">
        {isClosed ? (
          /* After submit: locked, pending admin approval */
          <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Sent for Approval
          </span>
        ) : order.builtyUrl ? (
          /* File uploaded but not yet submitted → show Submit */
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-60 transition-colors shadow-sm"
          >
            {submitting ? (
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
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Sending…
              </>
            ) : (
              <>
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                Submit to Admin
              </>
            )}
          </button>
        ) : (
          /* No file yet */
          <span className="text-xs text-slate-400 italic">
            Upload builty first
          </span>
        )}
      </td>
    </tr>
  );
};

// ── BulkOrder panel ───────────────────────────────────────────────────────────
const initialBulkOrders = [
  {
    id: 1,
    orderId: "BLK-00123",
    productName: "Industrial Bearings Pack",
    builtyFile: null,
    builtyUrl: null,
    status: "Open",
  },
  {
    id: 2,
    orderId: "BLK-00124",
    productName: "Steel Rods Bundle (50 pcs)",
    builtyFile: null,
    builtyUrl: null,
    status: "Open",
  },
  {
    id: 3,
    orderId: "BLK-00125",
    productName: "PVC Pipe Set – 2 inch",
    builtyFile: null,
    builtyUrl: null,
    status: "Open",
  },
  {
    id: 4,
    orderId: "BLK-00126",
    productName: "Cement Bags x100",
    builtyFile: null,
    builtyUrl: null,
    status: "Open",
  },
];

const BulkOrderPanel = () => {
  const [orders, setOrders] = useState(initialBulkOrders);

  const handleUpdate = (id, patch) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, ...patch } : o)),
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-700">Bulk Orders</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Upload a builty document to close an order. Remove it to reopen.
          </p>
        </div>
        <div className="flex gap-2 text-xs">
          <span className="flex items-center gap-1 text-amber-600">
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
            Open: {orders.filter((o) => o.status === "Open").length}
          </span>
          <span className="flex items-center gap-1 text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
            Closed: {orders.filter((o) => o.status === "Closed").length}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              {[
                "Order ID",
                "Product Name",
                "Upload Builty",
                "Order Status",
                "Action",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left font-semibold text-slate-600 whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <BulkOrderRow
                key={order.id}
                order={order}
                onUpdate={handleUpdate}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
const ORDER_TYPE_TABS = ["Normal Order", "Bulk Order"];
const STATUS_TABS = [
  "On Hold",
  "Pending",
  "To Dispatched",
  "Ready To Ship",
  "Shipped",
  "Cancelled",
  "All",
];

export default function ManageOrder() {
  const [orderType, setOrderType] = useState("Normal Order");
  const [statusTab, setStatusTab] = useState("All");

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Page heading */}
      <h2 className="text-xl font-bold text-slate-800 mb-1">Manage Orders</h2>
      <p className="text-sm text-slate-400 mb-5">
        Track and manage all your orders in one place.
      </p>

      {/* Top-level order type switcher */}
      <div className="inline-flex rounded-xl border border-slate-200 bg-slate-100 p-1 mb-6 gap-1">
        {ORDER_TYPE_TABS.map((tab) => {
          const isActive = orderType === tab;

          return (
            <button
              key={tab}
              onClick={() => setOrderType(tab)}
              style={isActive ? { background: GRADIENT } : {}}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        {orderType === "Normal Order" ? (
          <>
            <h3 className="text-sm font-semibold text-slate-700 mb-4">
              Normal Orders
            </h3>
            <Tabs
              tabItems={STATUS_TABS}
              activeTab={statusTab}
              onTabChange={setStatusTab}
            />
            <FiltersBar type="order" />
            <ProductTable
              TableHeader={[
                "Product Details",
                "Pushed Date & Time",
                "C-Code",
                "Clout Price",
                "More Details",
              ]}
            />
            <Pagination />
          </>
        ) : (
          <BulkOrderPanel />
        )}
      </div>
    </div>
  );
}

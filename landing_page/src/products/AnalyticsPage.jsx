"use client";
import { useState, useEffect } from "react";
import { shopifyOrders } from "../services/prodile/profile.service";

// ─── Status → Tab Mapping ─────────────────────────────────────────────────────

const STATUS_TAB_MAP = {
  pending_supplier: "Arriving Today",
  pending: "Arriving Today",
  shipped: "In Transit",
  in_transit: "In Transit",
  out_for_delivery: "In Transit",
  delivered: "Delivered",
  completed: "Delivered",
};

function getTabForOrder(order) {
  const key = order.status?.toLowerCase().replace(/\s+/g, "_") ?? "";
  return STATUS_TAB_MAP[key] ?? "Arriving Today";
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const map = {
    pending_supplier: {
      cls: "bg-yellow-100 text-yellow-700",
      label: "Pending Supplier",
    },
    pending: { cls: "bg-yellow-100 text-yellow-700", label: "Pending" },
    shipped: { cls: "bg-blue-100 text-blue-700", label: "Shipped" },
    in_transit: { cls: "bg-blue-100 text-blue-700", label: "In Transit" },
    out_for_delivery: {
      cls: "bg-green-100 text-green-700",
      label: "Out for Delivery",
    },
    delivered: { cls: "bg-green-100 text-green-600", label: "Delivered" },
    completed: { cls: "bg-green-100 text-green-600", label: "Completed" },
  };
  const key = status?.toLowerCase().replace(/\s+/g, "_") ?? "";
  const cfg = map[key] ?? { cls: "bg-gray-100 text-gray-500", label: status };
  return (
    <span
      className={`inline-block px-3 py-0.5 rounded-full text-xs font-bold whitespace-nowrap ${cfg.cls}`}
    >
      {cfg.label}
    </span>
  );
}

// ─── Mini Chart (Overview) ────────────────────────────────────────────────────

const weeklyData = [
  { week: "23 Feb–01 Mar", rto: 79 },
  { week: "02–08 Mar", rto: 80 },
  { week: "09–15 Mar", rto: 78 },
  { week: "16–22 Mar", rto: 79 },
  { week: "23–29 Mar", rto: 77 },
  { week: "30 Mar–05 Apr", rto: 72 },
];

function MiniChart({ data }) {
  const max = 100,
    w = 420,
    h = 120,
    padX = 10,
    padY = 10;
  const xs = data.map(
    (_, i) => padX + (i / (data.length - 1)) * (w - 2 * padX),
  );
  const ys = data.map((d) => h - padY - (d.rto / max) * (h - 2 * padY));
  const polyline = xs.map((x, i) => `${x},${ys[i]}`).join(" ");
  const area =
    `${xs[0]},${h - padY} ` +
    xs.map((x, i) => `${x},${ys[i]}`).join(" ") +
    ` ${xs[xs.length - 1]},${h - padY}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" className="overflow-visible">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5a623" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#f5a623" stopOpacity="0.03" />
        </linearGradient>
      </defs>
      {[0, 20, 40, 60, 80, 100].map((v) => {
        const y = h - padY - (v / max) * (h - 2 * padY);
        return (
          <line
            key={v}
            x1={padX}
            x2={w - padX}
            y1={y}
            y2={y}
            stroke="#f0f0f0"
            strokeWidth="1"
          />
        );
      })}
      <polygon points={area} fill="url(#chartGrad)" />
      <polyline
        points={polyline}
        fill="none"
        stroke="#f5a623"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {xs.map((x, i) => (
        <circle
          key={i}
          cx={x}
          cy={ys[i]}
          r="3.5"
          fill="#f5a623"
          stroke="#fff"
          strokeWidth="1.5"
        />
      ))}
    </svg>
  );
}

// ─── Overview Tab ─────────────────────────────────────────────────────────────

function OverviewTab({ orders }) {
  const total = orders.length;
  const delivered = orders.filter((o) =>
    ["delivered", "completed"].includes(o.status),
  ).length;
  const pending = orders.filter((o) => o.status.includes("pending")).length;

  const kpis = [
    { label: "Total Orders", value: total, color: "text-blue-600" },
    { label: "Delivered", value: delivered, color: "text-green-600" },
    { label: "Pending", value: pending, color: "text-yellow-500" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* KPI + Chart row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="bg-white border border-gray-200 rounded-xl p-5"
          >
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              {k.label}
            </p>
            <p className={`text-4xl font-extrabold ${k.color}`}>{k.value}</p>
          </div>
        ))}
        <div className="bg-white border border-gray-200 rounded-xl p-5 col-span-1 md:col-span-1">
          <div className="flex justify-between items-center mb-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              RTO Weekly Trend
            </p>
            <span className="bg-gray-900 text-white rounded-full px-3 py-0.5 text-xs font-semibold">
              RTO
            </span>
          </div>
          <MiniChart data={weeklyData} />
          <div className="flex justify-between mt-1">
            {weeklyData.map((d, i) => (
              <span
                key={i}
                className="text-[9px] text-gray-400 text-center max-w-[60px]"
              >
                {d.week}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Summary table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100">
          <span className="text-sm font-bold text-gray-800">
            All Orders Summary
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                {["Order", "Customer", "Items", "Total", "Status", "Date"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-xs font-semibold text-gray-400 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-gray-400">
                    No orders yet.
                  </td>
                </tr>
              ) : (
                orders.map((o, i) => (
                  <tr
                    key={o.order_id}
                    className={`border-t border-gray-100 hover:bg-blue-50 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  >
                    <td className="px-4 py-3 font-bold text-blue-600">
                      {o.shopify_order_name}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {o.customer_first_name} {o.customer_last_name}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {o.items_json
                        .map((it) => `${it.title} ×${it.quantity}`)
                        .join(", ")}
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-800">
                      ₹{parseFloat(o.total_price).toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={o.status} />
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                      {formatDate(o.createdAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Order Table (In Transit / Arriving Today / Delivered) ────────────────────

function OrderTable({ orders, emptyMsg = "No orders found" }) {
  const [search, setSearch] = useState("");

  const filtered = orders.filter((o) => {
    const q = search.toLowerCase();
    return (
      !q ||
      o.shopify_order_name.toLowerCase().includes(q) ||
      o.customer_first_name.toLowerCase().includes(q) ||
      o.customer_last_name.toLowerCase().includes(q) ||
      o.customer_email.toLowerCase().includes(q) ||
      o.items_json.some(
        (it) =>
          it.sku.toLowerCase().includes(q) ||
          it.title.toLowerCase().includes(q),
      )
    );
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-wrap justify-between items-end gap-3">
        <div className="flex flex-wrap gap-3 items-end">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">
              Search Orders
            </label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Order #, customer, SKU…"
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm min-w-[220px] outline-none focus:border-blue-400 transition-colors"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSearch("")}
              className="border border-gray-200 bg-white rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              ↺ Reset
            </button>
            <button className="border border-gray-200 bg-white rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
              ↓ Excel
            </button>
          </div>
        </div>
        <span className="text-xs text-gray-400">
          {filtered.length} of {orders.length} orders
        </span>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                {[
                  "Order",
                  "Customer",
                  "Items",
                  "Shipping Address",
                  "Tracking",
                  "Total",
                  "Status",
                  "Date",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-semibold text-gray-400 whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <span className="text-4xl">📭</span>
                      <p className="text-sm font-semibold text-gray-600">
                        {emptyMsg}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((order, i) => (
                  <tr
                    key={order.order_id}
                    className={`border-t border-gray-100 hover:bg-blue-50 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  >
                    {/* Order */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <p className="font-bold text-blue-600">
                        {order.shopify_order_name}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        #{order.shopify_order_id}
                      </p>
                    </td>

                    {/* Customer */}
                    <td className="px-4 py-4">
                      <p className="font-semibold text-gray-800">
                        {order.customer_first_name} {order.customer_last_name}
                      </p>
                      {order.customer_email && (
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          {order.customer_email}
                        </p>
                      )}
                      {order.customer_phone && (
                        <p className="text-[11px] text-gray-400">
                          {order.customer_phone}
                        </p>
                      )}
                    </td>

                    {/* Items */}
                    <td className="px-4 py-4 max-w-[220px]">
                      {order.items_json.map((item, idx) => (
                        <div
                          key={idx}
                          className={
                            idx < order.items_json.length - 1 ? "mb-2" : ""
                          }
                        >
                          <p className="font-medium text-gray-800 leading-snug">
                            {item.title}
                          </p>
                          <div className="flex flex-wrap items-center gap-1.5 mt-1">
                            <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
                              {item.sku}
                            </span>
                            {item.variantTitle && (
                              <span className="text-[11px] text-gray-400">
                                {item.variantTitle}
                              </span>
                            )}
                            <span className="text-[11px] text-gray-500">
                              × {item.quantity}
                            </span>
                          </div>
                          <p className="text-[11px] text-green-600 font-semibold mt-0.5">
                            ₹{parseFloat(item.price).toLocaleString("en-IN")}
                          </p>
                        </div>
                      ))}
                    </td>

                    {/* Shipping Address */}
                    <td className="px-4 py-4 text-xs text-gray-500 max-w-[180px]">
                      <p>{order.shipping_address.address1}</p>
                      {order.shipping_address.address2 && (
                        <p>{order.shipping_address.address2}</p>
                      )}
                      <p>
                        {order.shipping_address.city},{" "}
                        {order.shipping_address.province}
                      </p>
                      <p>
                        {order.shipping_address.country} —{" "}
                        {order.shipping_address.zip}
                      </p>
                    </td>

                    {/* Tracking */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      {order.tracking_number ? (
                        <div>
                          <p className="font-semibold text-gray-800 text-xs">
                            {order.tracking_number}
                          </p>
                          {order.tracking_carrier && (
                            <p className="text-[11px] text-gray-400">
                              {order.tracking_carrier}
                            </p>
                          )}
                          {order.tracking_url && (
                            <a
                              href={order.tracking_url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[11px] text-blue-500 hover:underline"
                            >
                              Track →
                            </a>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-300 text-xs">—</span>
                      )}
                    </td>

                    {/* Total */}
                    <td className="px-4 py-4 font-bold text-gray-800 whitespace-nowrap">
                      ₹{parseFloat(order.total_price).toLocaleString("en-IN")}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <StatusBadge status={order.status} />
                      {order.dropshipper_order_status &&
                        order.dropshipper_order_status.toLowerCase() !==
                          order.status.toLowerCase() && (
                          <div className="mt-1">
                            <StatusBadge
                              status={order.dropshipper_order_status}
                            />
                          </div>
                        )}
                    </td>

                    {/* Date */}
                    <td className="px-4 py-4 text-xs text-gray-400 whitespace-nowrap">
                      {formatDate(order.createdAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const TABS = ["Overview", "In Transit", "Arriving Today", "Delivered"];

export default function ManageRTO() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await shopifyOrders();
        if (Array.isArray(res.data?.data)) {
          setOrders(res?.data?.data);
        } else {
          setError("Unexpected response from server.");
        }
      } catch (err) {
        setError(err?.message ?? "Failed to load orders.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const inTransit = orders.filter((o) => getTabForOrder(o) === "In Transit");
  const arrivingToday = orders.filter(
    (o) => getTabForOrder(o) === "Arriving Today",
  );
  const delivered = orders.filter((o) => getTabForOrder(o) === "Delivered");

  const tabBadges = {
    "In Transit": { count: inTransit.length, color: "bg-blue-500" },
    "Arriving Today": { count: arrivingToday.length, color: "bg-yellow-400" },
    Delivered: { count: delivered.length, color: "bg-green-500" },
  };

  return (
    <div className="font-sans bg-gray-50 min-h-screen px-8 py-7 text-gray-800">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center text-xl">
          📦
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight m-0">
          Manage RTO / Returns
        </h1>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-16 text-gray-400 text-sm">
          ⏳ Loading orders…
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="bg-red-50 text-red-600 rounded-xl px-5 py-4 text-sm font-semibold mb-5">
          ⚠️ {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Tabs */}
          <div className="flex border-b-2 border-gray-200 mb-6 gap-0">
            {TABS.map((tab) => {
              const badge = tabBadges[tab];
              const active = tab === activeTab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    flex items-center gap-2 px-5 py-2.5 text-sm font-medium cursor-pointer border-b-2 -mb-0.5
                    transition-all duration-150 bg-transparent border-x-0 border-t-0
                    ${
                      active
                        ? "border-b-gray-900 text-gray-900 font-bold"
                        : "border-b-transparent text-gray-400 hover:text-gray-600"
                    }
                  `}
                >
                  {tab}
                  {badge && badge.count > 0 && (
                    <span
                      className={`${badge.color} text-white rounded-full px-2 py-0.5 text-[11px] font-bold`}
                    >
                      {badge.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          {activeTab === "Overview" && <OverviewTab orders={orders} />}
          {activeTab === "In Transit" && (
            <OrderTable orders={inTransit} emptyMsg="No in-transit orders." />
          )}
          {activeTab === "Arriving Today" && (
            <OrderTable
              orders={arrivingToday}
              emptyMsg="No pending orders today."
            />
          )}
          {activeTab === "Delivered" && (
            <OrderTable
              orders={delivered}
              emptyMsg="No delivered orders yet."
            />
          )}
        </>
      )}
    </div>
  );
}

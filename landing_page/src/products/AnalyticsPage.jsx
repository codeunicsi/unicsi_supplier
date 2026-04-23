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

// ─── RTO Weekly Chart ─────────────────────────────────────────────────────────

const weeklyData = [
  { week: "23 Feb", rto: 79, returns: 0.6 },
  { week: "01 Mar", rto: 80, returns: 0.7 },
  { week: "08 Mar", rto: 78, returns: 0.8 },
  { week: "15 Mar", rto: 79, returns: 0.6 },
  { week: "22 Mar", rto: 77, returns: 0.7 },
  { week: "29 Mar", rto: 76, returns: 0.5 },
  { week: "05 Apr", rto: 72, returns: 0.7 },
];

function RTOChart({ data, mode }) {
  const values = data.map((d) => (mode === "RTO" ? d.rto : d.returns));
  const max = mode === "RTO" ? 100 : Math.max(...values) * 1.4;
  const w = 460,
    h = 140,
    padX = 36,
    padY = 14;
  const innerW = w - 2 * padX;
  const innerH = h - 2 * padY;
  const xs = data.map((_, i) => padX + (i / (data.length - 1)) * innerW);
  const ys = values.map((v) => h - padY - (v / max) * innerH);
  const polyline = xs.map((x, i) => `${x},${ys[i]}`).join(" ");
  const area =
    `${xs[0]},${h - padY} ` +
    xs.map((x, i) => `${x},${ys[i]}`).join(" ") +
    ` ${xs[xs.length - 1]},${h - padY}`;

  const yTicks =
    mode === "RTO" ? [0, 20, 40, 60, 80, 100] : [0, 0.2, 0.4, 0.6, 0.8, 1.0];

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" className="overflow-visible">
      <defs>
        <linearGradient id="chartGrad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5a623" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#f5a623" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {/* Y gridlines + labels */}
      {yTicks.map((v) => {
        const y = h - padY - (v / max) * innerH;
        return (
          <g key={v}>
            <line
              x1={padX}
              x2={w - padX}
              y1={y}
              y2={y}
              stroke="#eeeeee"
              strokeWidth="1"
            />
            <text
              x={padX - 4}
              y={y + 3.5}
              fontSize="8"
              textAnchor="end"
              fill="#bbb"
            >
              {v}
            </text>
          </g>
        );
      })}
      {/* Area fill */}
      <polygon points={area} fill="url(#chartGrad2)" />
      {/* Line */}
      <polyline
        points={polyline}
        fill="none"
        stroke="#f5a623"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Dots */}
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
      {/* X labels */}
      {data.map((d, i) => (
        <text
          key={i}
          x={xs[i]}
          y={h + 2}
          fontSize="8"
          textAnchor="middle"
          fill="#bbb"
        >
          {d.week}
        </text>
      ))}
    </svg>
  );
}

// ─── Overview Tab ─────────────────────────────────────────────────────────────

function OverviewTab({ orders }) {
  const [period, setPeriod] = useState("Last Month");
  const [chartMode, setChartMode] = useState("RTO");

  // ── Computed metrics ──────────────────────────────────────────────────────
  const total = orders.length;
  // const deliveredOrders = orders.filter((o) =>
  //   ["delivered", "completed"].includes(o.status?.toLowerCase()),
  // );
  const rtoOrders = orders.filter((o) =>
    ["shipped", "in_transit", "out_for_delivery"].includes(
      o.status?.toLowerCase().replace(/\s+/g, "_"),
    ),
  );
  const returnOrders = orders.filter((o) =>
    o.status?.toLowerCase().includes("return"),
  );

  const rtoPercent =
    total > 0 ? ((rtoOrders.length / total) * 100).toFixed(1) : "0.0";
  const returnPercent =
    total > 0 ? ((returnOrders.length / total) * 100).toFixed(1) : "0.0";

  // Dispatch time buckets (mock split for demo — replace with real data fields)
  const sameDayOrders = orders.filter((_, i) => i % 5 === 0);
  const nextDayOrders = orders.filter((_, i) => i % 5 !== 0 && i % 7 !== 0);
  const slaBreachers = orders.filter((_, i) => i % 7 === 0);

  const safeRto = (arr) =>
    arr.length > 0 ? ((rtoOrders.length / arr.length) * 100).toFixed(1) : "0.0";

  // Product-level aggregation
  const productMap = {};
  orders.forEach((o) => {
    (o.items_json || []).forEach((item) => {
      const key = item.sku || item.title;
      if (!productMap[key]) {
        productMap[key] = {
          title: item.title,
          sku: item.sku,
          image: item.image || null,
          totalOrders: 0,
          deliveredOrders: 0,
          rtoOrders: 0,
          returnOrders: 0,
        };
      }
      productMap[key].totalOrders += 1;
      const s = o.status?.toLowerCase().replace(/\s+/g, "_");
      if (["delivered", "completed"].includes(s))
        productMap[key].deliveredOrders += 1;
      if (["shipped", "in_transit", "out_for_delivery"].includes(s))
        productMap[key].rtoOrders += 1;
      if (s?.includes("return")) productMap[key].returnOrders += 1;
    });
  });
  const products = Object.values(productMap);

  return (
    <div className="flex flex-col gap-4">
      {/* ── Summary Header ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-800">Summary</h2>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="border border-gray-200 rounded px-3 py-1.5 text-xs text-gray-700 outline-none cursor-pointer bg-white"
        >
          {["Last Week", "Last Month", "Last 3 Months", "Last Year"].map(
            (p) => (
              <option key={p}>{p}</option>
            ),
          )}
        </select>
      </div>

      {/* ── Top Row: Metrics + Chart ────────────────────────────────────────── */}
      <div className="flex gap-4">
        {/* Left: Metric cards */}
        <div
          className="flex flex-col gap-3 flex-shrink-0"
          style={{ width: "420px" }}
        >
          {/* RTO % + Return % row */}
          <div className="border border-gray-200 rounded-lg bg-white">
            <div className="flex divide-x divide-gray-100">
              <div className="px-5 py-4 flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-xs text-gray-500">RTO %</span>
                  <span className="text-gray-300 text-xs cursor-pointer">
                    ⓘ
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {rtoPercent}%
                </p>
              </div>
              <div className="px-5 py-4 flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-xs text-gray-500">Return %</span>
                  <span className="text-gray-300 text-xs cursor-pointer">
                    ⓘ
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {returnPercent}%
                </p>
              </div>
            </div>
          </div>

          {/* RTO % by Dispatch Time */}
          <div className="border border-gray-200 rounded-lg bg-white px-5 py-4">
            <div className="flex items-center gap-1.5 mb-4">
              <span className="text-xs font-semibold text-gray-700">
                RTO % by Dispatch Time
              </span>
              <span className="text-gray-300 text-xs cursor-pointer">ⓘ</span>
            </div>
            <div className="flex gap-8">
              {/* Same Day */}
              <div>
                <p className="text-xs text-gray-500 mb-1">Same Day (D0)</p>
                <p className="text-2xl font-bold text-green-500">
                  {safeRto(sameDayOrders)}%
                </p>
                <p className="text-xs text-gray-400 mt-1">Orders:</p>
                <p className="text-xs font-semibold text-gray-700">
                  {sameDayOrders.length.toLocaleString("en-IN")}
                </p>
              </div>
              {/* Next Day */}
              <div>
                <p className="text-xs text-gray-500 mb-1">Next Day (D1)</p>
                <p className="text-2xl font-bold text-orange-400">
                  {safeRto(nextDayOrders)}%
                </p>
                <p className="text-xs text-gray-400 mt-1">Orders:</p>
                <p className="text-xs font-semibold text-gray-700">
                  {nextDayOrders.length.toLocaleString("en-IN")}
                </p>
              </div>
              {/* SLA Breached */}
              <div>
                <p className="text-xs text-gray-500 mb-1">SLA Breached</p>
                <p className="text-2xl font-bold text-red-500">
                  {safeRto(slaBreachers)}%
                </p>
                <p className="text-xs text-gray-400 mt-1">Orders:</p>
                <p className="text-xs font-semibold text-gray-700">
                  {slaBreachers.length.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: RTO Weekly Chart */}
        <div className="border border-gray-200 rounded-lg bg-white flex-1 px-5 py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-700">
              RTO Weekly
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => setChartMode("RTO")}
                className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                  chartMode === "RTO"
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                RTO
              </button>
              <button
                onClick={() => setChartMode("Returns")}
                className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                  chartMode === "Returns"
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                Returns
              </button>
            </div>
          </div>
          <div className="pb-4">
            <RTOChart data={weeklyData} mode={chartMode} />
          </div>
        </div>
      </div>

      {/* ── Product Table ───────────────────────────────────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {/* Pagination header */}
        <div className="flex items-center justify-end px-5 py-2 border-b border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>
              Showing 1-{Math.min(50, products.length)} of {products.length}
            </span>
            <button className="p-1 rounded hover:bg-gray-100 cursor-pointer text-gray-400 disabled:opacity-30">
              ‹
            </button>
            <button className="p-1 rounded hover:bg-gray-100 cursor-pointer text-gray-400">
              ›
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100">
                {[
                  "Product Details",
                  "SKU ID",
                  "Total Orders",
                  "Delivered Orders",
                  "RTO Orders",
                  "Return Orders",
                  "RTO %",
                  "Return %",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="py-12 text-center text-gray-400 text-sm"
                  >
                    No product data available.
                  </td>
                </tr>
              ) : (
                products.slice(0, 50).map((p, i) => {
                  const rto =
                    p.totalOrders > 0
                      ? ((p.rtoOrders / p.totalOrders) * 100).toFixed(0)
                      : 0;
                  const ret =
                    p.totalOrders > 0
                      ? ((p.returnOrders / p.totalOrders) * 100).toFixed(0)
                      : 0;
                  return (
                    <tr
                      key={i}
                      className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      {/* Product Details */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3 max-w-[260px]">
                          {p.image ? (
                            <img
                              src={p.image}
                              alt={p.title}
                              className="w-10 h-10 object-cover rounded border border-gray-100 flex-shrink-0"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gray-100 rounded border border-gray-100 flex items-center justify-center flex-shrink-0 text-gray-300 text-lg">
                              📦
                            </div>
                          )}
                          <span className="text-xs text-gray-700 leading-snug line-clamp-2">
                            {p.title}
                          </span>
                        </div>
                      </td>
                      {/* SKU ID */}
                      <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">
                        {p.sku || "—"}
                      </td>
                      {/* Total Orders */}
                      <td className="px-4 py-3 text-xs text-gray-700 font-medium">
                        {p.totalOrders}
                      </td>
                      {/* Delivered Orders */}
                      <td className="px-4 py-3 text-xs text-gray-700">
                        {p.deliveredOrders}
                      </td>
                      {/* RTO Orders */}
                      <td className="px-4 py-3 text-xs text-gray-700">
                        {p.rtoOrders}
                      </td>
                      {/* Return Orders */}
                      <td className="px-4 py-3 text-xs text-gray-700">
                        {p.returnOrders}
                      </td>
                      {/* RTO % */}
                      <td className="px-4 py-3 text-xs font-semibold text-green-600">
                        {rto}%
                      </td>
                      {/* Return % */}
                      <td className="px-4 py-3 text-xs font-semibold text-green-600">
                        {ret}%
                      </td>
                    </tr>
                  );
                })
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
                    <td className="px-4 py-4 whitespace-nowrap">
                      <p className="font-bold text-blue-600">
                        {order.shopify_order_name}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        #{order.shopify_order_id}
                      </p>
                    </td>
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
                    <td className="px-4 py-4 font-bold text-gray-800 whitespace-nowrap">
                      ₹{parseFloat(order.total_price).toLocaleString("en-IN")}
                    </td>
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
        if (Array.isArray(res?.data?.data)) {
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
      <h1 className="text-xl font-bold tracking-tight mb-5">
        Manage RTO / Returns
      </h1>

      {loading && (
        <div className="text-center py-16 text-gray-400 text-sm">
          ⏳ Loading orders…
        </div>
      )}

      {!loading && error && (
        <div className="bg-red-50 text-red-600 rounded-xl px-5 py-4 text-sm font-semibold mb-5">
          ⚠️ {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-5 gap-0">
            {TABS.map((tab) => {
              const badge = tabBadges[tab];
              const active = tab === activeTab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    flex items-center gap-2 px-5 py-2.5 text-sm font-medium cursor-pointer border-b-2 -mb-px
                    transition-all duration-150 bg-transparent border-x-0 border-t-0
                    ${
                      active
                        ? "border-b-gray-900 text-gray-900 font-semibold"
                        : "border-b-transparent text-gray-500 hover:text-gray-700"
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

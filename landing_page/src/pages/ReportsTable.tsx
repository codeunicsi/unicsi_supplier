import React, { useState, useEffect } from "react";
import {
  fetchReportOverview,
  fetchSalesTimeSeries,
  fetchTopProducts,
} from "../services/reports/report.service";

const GRADIENT = "linear-gradient(135deg, #0097b2 0%, #7ed957 100%)";

function formatCurrency(val) {
  const n = Number(val) || 0;
  return "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

function StatCard({ label, value, sub }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 14,
        border: "1.5px solid #e0f4f7",
        padding: "20px 22px",
        flex: "1 1 200px",
        minWidth: 180,
        boxShadow: "0 2px 12px rgba(0,151,178,0.06)",
      }}
    >
      <div style={{ fontSize: "0.8rem", color: "#777", fontWeight: 600, marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#111" }}>{value}</div>
      {sub && (
        <div style={{ fontSize: "0.78rem", color: "#0097b2", fontWeight: 500, marginTop: 4 }}>
          {sub}
        </div>
      )}
    </div>
  );
}

export default function ReportsTable() {
  const [overview, setOverview] = useState(null);
  const [sales, setSales] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({ start_date: "", end_date: "" });
  const [groupBy, setGroupBy] = useState("day");

  async function loadData() {
    setLoading(true);
    try {
      const params = {};
      if (dateRange.start_date) params.start_date = dateRange.start_date;
      if (dateRange.end_date) params.end_date = dateRange.end_date;

      const [overviewRes, salesRes, productsRes] = await Promise.all([
        fetchReportOverview(params),
        fetchSalesTimeSeries({ ...params, group_by: groupBy }),
        fetchTopProducts(params),
      ]);

      setOverview(overviewRes.data?.data || null);
      setSales(salesRes.data?.data || []);
      setTopProducts(productsRes.data?.data || []);
    } catch {
      // silently handle
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [dateRange, groupBy]);

  const orders = overview?.orders || {};
  const revenue = overview?.revenue || {};
  const products = overview?.products || {};
  const returns = overview?.returns || {};

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        boxSizing: "border-box",
        background: "#f4fbfc",
        padding: "clamp(16px, 4vw, 28px) clamp(16px, 4vw, 32px)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 24,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#000", margin: 0 }}>
            Reports
          </h1>
          <p style={{ color: "#555", margin: "4px 0 0", fontSize: "0.9rem" }}>
            Overview of your store performance and sales data.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <input
            type="date"
            value={dateRange.start_date}
            onChange={(e) => setDateRange((p) => ({ ...p, start_date: e.target.value }))}
            style={{ padding: "8px 12px", borderRadius: 8, border: "1.5px solid #d0eef3", fontSize: "0.85rem", outline: "none" }}
          />
          <span style={{ color: "#999", fontSize: "0.85rem" }}>to</span>
          <input
            type="date"
            value={dateRange.end_date}
            onChange={(e) => setDateRange((p) => ({ ...p, end_date: e.target.value }))}
            style={{ padding: "8px 12px", borderRadius: 8, border: "1.5px solid #d0eef3", fontSize: "0.85rem", outline: "none" }}
          />
          <select
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value)}
            style={{ padding: "8px 12px", borderRadius: 8, border: "1.5px solid #d0eef3", fontSize: "0.85rem", outline: "none", cursor: "pointer" }}
          >
            <option value="day">Daily</option>
            <option value="week">Weekly</option>
            <option value="month">Monthly</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 60, color: "#888" }}>Loading reports...</div>
      ) : (
        <>
          {/* Stats Cards */}
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 28 }}>
            <StatCard label="Total Orders" value={Number(orders.total_orders || 0).toLocaleString()} sub={`${orders.delivered || 0} delivered · ${orders.pending || 0} pending`} />
            <StatCard label="Total Revenue" value={formatCurrency(revenue.total_revenue)} sub={`Avg: ${formatCurrency(revenue.avg_order_value)}`} />
            <StatCard label="Your Payout" value={formatCurrency(revenue.total_payout)} sub={`Shipping: ${formatCurrency(revenue.total_shipping)}`} />
            <StatCard label="Products" value={Number(products.total_products || 0).toLocaleString()} sub={`${products.approved || 0} approved · ${products.active || 0} active`} />
            <StatCard label="Returns" value={Number(returns.total_returns || 0).toLocaleString()} sub={`Refunded: ${formatCurrency(returns.total_refund)}`} />
          </div>

          {/* Sales Time Series */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #e0f4f7", boxShadow: "0 2px 16px rgba(0,151,178,0.08)", marginBottom: 28, overflow: "hidden" }}>
            <div style={{ background: GRADIENT, padding: "14px 24px", display: "grid", gridTemplateColumns: "1fr 100px 100px 100px 120px 120px", gap: 12, minWidth: 680 }}>
              {["Period", "Orders", "Delivered", "Cancelled", "Revenue", "Payout"].map((h) => (
                <span key={h} style={{ fontSize: "0.76rem", fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</span>
              ))}
            </div>
            <div style={{ overflowX: "auto" }}>
              {sales.length === 0 ? (
                <div style={{ padding: "40px 24px", textAlign: "center", color: "#888", fontSize: "0.9rem" }}>No sales data for this period.</div>
              ) : (
                sales.map((row, i) => (
                  <div key={row.period} style={{ display: "grid", gridTemplateColumns: "1fr 100px 100px 100px 120px 120px", gap: 12, padding: "12px 24px", background: i % 2 === 0 ? "#fff" : "#f8fdfe", borderTop: "1px solid #e0f4f7", minWidth: 680, fontSize: "0.88rem" }}>
                    <span style={{ fontWeight: 600, color: "#333" }}>{row.period}</span>
                    <span>{row.total_orders}</span>
                    <span style={{ color: "#2e7d1e" }}>{row.delivered}</span>
                    <span style={{ color: "#c62828" }}>{row.cancelled}</span>
                    <span style={{ fontWeight: 600 }}>{formatCurrency(row.revenue)}</span>
                    <span style={{ color: "#0097b2", fontWeight: 600 }}>{formatCurrency(row.payout)}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Top Products */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #e0f4f7", boxShadow: "0 2px 16px rgba(0,151,178,0.08)", overflow: "hidden" }}>
            <div style={{ padding: "18px 24px", borderBottom: "1.5px solid #e0f4f7" }}>
              <h2 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "#111" }}>Top Selling Products</h2>
            </div>
            <div style={{ background: GRADIENT, padding: "12px 24px", display: "grid", gridTemplateColumns: "2fr 120px 100px 120px 100px", gap: 12, minWidth: 600 }}>
              {["Product", "SKU", "Qty Sold", "Revenue", "Orders"].map((h) => (
                <span key={h} style={{ fontSize: "0.76rem", fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</span>
              ))}
            </div>
            <div style={{ overflowX: "auto" }}>
              {topProducts.length === 0 ? (
                <div style={{ padding: "40px 24px", textAlign: "center", color: "#888", fontSize: "0.9rem" }}>No product data available.</div>
              ) : (
                topProducts.map((p, i) => (
                  <div key={p.product_id || i} style={{ display: "grid", gridTemplateColumns: "2fr 120px 100px 120px 100px", gap: 12, padding: "12px 24px", background: i % 2 === 0 ? "#fff" : "#f8fdfe", borderTop: "1px solid #e0f4f7", minWidth: 600, fontSize: "0.88rem" }}>
                    <span style={{ fontWeight: 600, color: "#333", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.product_title}</span>
                    <span style={{ color: "#666", fontSize: "0.82rem" }}>{p.sku || "—"}</span>
                    <span>{Number(p.total_qty_sold || 0).toLocaleString()}</span>
                    <span style={{ fontWeight: 600 }}>{formatCurrency(p.total_revenue)}</span>
                    <span>{p.order_count}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
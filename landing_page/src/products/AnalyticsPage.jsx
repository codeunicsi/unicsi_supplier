"use client";
import { useState } from "react";

// ─── Mock Data ───────────────────────────────────────────────────────────────

const overviewProducts = [
  { id: 1, img: "📦", name: "Latest anti slip to hold Mobile Holder device", sku: "car mount holder", total: 3, delivered: 0, rto: 0, returns: 0, rtoP: 0, returnP: 0 },
  { id: 2, img: "🔌", name: "Ultrasonic Pest Repeller Machine for Mosquito Rats Cockroach Home Plug in Electric Pest Repellent Pest Control Reject Aid (Red)", sku: "Pest Repeller", total: 4, delivered: 1, rto: 2, returns: 0, rtoP: 50, returnP: 0 },
  { id: 3, img: "🚗", name: "Rearview Mirror Car Camera", sku: "Rearview Mirror", total: 6, delivered: 2, rto: 4, returns: 0, rtoP: 66, returnP: 0 },
  { id: 4, img: "👓", name: "Reading Glasses (Buy 1 Get 1 Free)", sku: "Dual-Use Reading Glasses", total: 120, delivered: 20, rto: 95, returns: 5, rtoP: 79, returnP: 4 },
  { id: 5, img: "👶", name: "Baby Shaping Head Support Pillow (Limited Stock)", sku: "Baby Shaping Head Support Pillow", total: 30, delivered: 5, rto: 24, returns: 1, rtoP: 80, returnP: 3 },
];

const weeklyData = [
  { week: "23 Feb–01 Mar", rto: 79 },
  { week: "02–08 Mar", rto: 80 },
  { week: "09–15 Mar", rto: 78 },
  { week: "16–22 Mar", rto: 79 },
  { week: "23–29 Mar", rto: 77 },
  { week: "30 Mar–05 Apr", rto: 72 },
];

const inTransitData = [
  { img: "👓", name: "Reading Glasses (Buy 1 Get 1 Free)", variant: "Free Size", sku: "Dual-Use Reading Glasses", stock: 0, partners: [{ name: "XpressBees", qty: 1 }, { name: "Ekart", qty: 2 }] },
  { img: "👓", name: "Reading Glasses (Buy 1 Get 1 Free)", variant: "Free Size", sku: "FDDAILYGLASSESPOWER-+2.50", stock: 0, partners: [{ name: "Shadowfax", qty: 3 }, { name: "Delhivery", qty: 27 }, { name: "Ekart", qty: 38 }, { name: "Ekart", qty: 1 }] },
  { img: "👶", name: "Baby Shaping Head Support Pillow (Limited Stock🔥🔥)", variant: "Free Size", sku: "Baby Shaping Head Support Pillow - Assorted Colour", stock: 0, partners: [{ name: "Ekart", qty: 1 }] },
  { img: "👶", name: "OrthoBaby™ Baby Shaping Head Support Pillow", variant: "Free Size", sku: "Baby Shaping Head Support Pillow - Assorted Colour", stock: 0, partners: [{ name: "Delhivery", qty: 7 }, { name: "Ekart", qty: 1 }] },
  { img: "❄️", name: "Portable Mini Air Cooler (3-in-1 Fan, Cooler & Humidifier)", variant: "Free Size", sku: "Fan Air Cooler fan USB Electric Fan", stock: 0, partners: [{ name: "Ekart", qty: 1 }] },
  { img: "👶", name: "RelaxrCloud™ – Baby Head Shaping & Protection Pillow", variant: "Free Size", sku: "Baby Shaping Head Support Pillow - Assorted Colour", stock: 0, partners: [{ name: "Delhivery", qty: 20 }] },
];

const deliveredData = [
  { img: "👓", name: "Power Anti-blue Progressive Far And Near Dual-Use Reading +2.5 Glasses", variant: "Free Size", sku: "FDDAILYGLASSESPOWER-+1.00", stock: 0, partners: [{ name: "Ekart", qty: 4 }] },
  { img: "👓", name: "Reading Glasses (Buy 1 Get 1 Free)", variant: "Free Size", sku: "Dual-Use Reading Glasses", stock: 0, partners: [{ name: "Ekart", qty: 21 }, { name: "Shadowfax", qty: 3 }] },
  { img: "🧸", name: "Kidology Plush Toy Pillow", variant: "Free Size", sku: "Kidology Plush Toy Pillow", stock: 0, partners: [{ name: "Ekart", qty: 2 }] },
  { img: "🥣", name: "3-in-1 Multipurpose Kitchen Bowl™ | premium Stainless Steel Cutter + Grater + Drain Basket", variant: "Free Size", sku: "3 in 1 Multifunctional", stock: 0, partners: [{ name: "Ekart", qty: 15 }, { name: "Ekart Select", qty: 1 }] },
  { img: "👓", name: "Power Anti-blue Progressive Far And Near Dual-Use Reading +2.5 Glasses", variant: "Free Size", sku: "Dual-Use Reading Glasses", stock: 0, partners: [{ name: "Ekart", qty: 1 }] },
  { img: "🚗", name: "Car Logo Perfume Pendant – Hanging Air Freshener Diffuser for Rearview Mirror & Dashboard", variant: "Free Size", sku: "Car Logo Perfume Pendant Hanging", stock: 0, partners: [{ name: "XpressBees", qty: 1 }] },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function PartnerBadge({ name }) {
  const colors = {
    Ekart: "#e8f0fe",
    "Ekart Select": "#d2e3fc",
    XpressBees: "#fef3e2",
    Shadowfax: "#e6f4ea",
    Delhivery: "#fce8e6",
  };
  const textColors = {
    Ekart: "#1a73e8",
    "Ekart Select": "#0d47a1",
    XpressBees: "#e37400",
    Shadowfax: "#137333",
    Delhivery: "#c5221f",
  };
  const bg = colors[name] || "#f1f3f4";
  const color = textColors[name] || "#3c4043";
  return (
    <span style={{ background: bg, color, padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600, display: "inline-block", whiteSpace: "nowrap" }}>
      {name}
    </span>
  );
}

function MiniChart({ data }) {
  const max = 100;
  const w = 420, h = 120, padX = 10, padY = 10;
  const xs = data.map((_, i) => padX + (i / (data.length - 1)) * (w - 2 * padX));
  const ys = data.map(d => h - padY - (d.rto / max) * (h - 2 * padY));
  const polyline = xs.map((x, i) => `${x},${ys[i]}`).join(" ");
  const area = `${xs[0]},${h - padY} ` + xs.map((x, i) => `${x},${ys[i]}`).join(" ") + ` ${xs[xs.length - 1]},${h - padY}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5a623" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#f5a623" stopOpacity="0.03" />
        </linearGradient>
      </defs>
      {[0, 20, 40, 60, 80, 100].map(v => {
        const y = h - padY - (v / max) * (h - 2 * padY);
        return <line key={v} x1={padX} x2={w - padX} y1={y} y2={y} stroke="#f0f0f0" strokeWidth="1" />;
      })}
      <polygon points={area} fill="url(#chartGrad)" />
      <polyline points={polyline} fill="none" stroke="#f5a623" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {xs.map((x, i) => (
        <circle key={i} cx={x} cy={ys[i]} r="3.5" fill="#f5a623" stroke="#fff" strokeWidth="1.5" />
      ))}
    </svg>
  );
}

function RtoBadge({ value }) {
  const color = value === 0 ? "#34a853" : value < 30 ? "#fbbc04" : "#ea4335";
  return <span style={{ color, fontWeight: 700 }}>{value}%</span>;
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────

function OverviewTab() {
  const [filter, setFilter] = useState("Last Month");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Filter */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <select value={filter} onChange={e => setFilter(e.target.value)}
          style={{ border: "1px solid #dadce0", borderRadius: 8, padding: "6px 14px", fontSize: 13, color: "#3c4043", background: "#fff", cursor: "pointer", outline: "none" }}>
          <option>Last Month</option>
          <option>Last Week</option>
          <option>Last 3 Months</option>
        </select>
      </div>

      {/* KPI Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 2fr", gap: 16 }}>
        <div style={{ background: "#fff", border: "1px solid #e8eaed", borderRadius: 12, padding: "20px 24px" }}>
          <div style={{ fontSize: 12, color: "#5f6368", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 8 }}>RTO %</div>
          <div style={{ fontSize: 36, fontWeight: 800, color: "#ea4335" }}>77.7%</div>
        </div>
        <div style={{ background: "#fff", border: "1px solid #e8eaed", borderRadius: 12, padding: "20px 24px" }}>
          <div style={{ fontSize: 12, color: "#5f6368", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 8 }}>Return %</div>
          <div style={{ fontSize: 36, fontWeight: 800, color: "#34a853" }}>0.7%</div>
        </div>
        <div style={{ background: "#fff", border: "1px solid #e8eaed", borderRadius: 12, padding: "20px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: "#5f6368", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>RTO Weekly Trend</div>
            <div style={{ display: "flex", gap: 8 }}>
              <span style={{ background: "#1a1a2e", color: "#fff", borderRadius: 20, padding: "3px 12px", fontSize: 12, fontWeight: 600 }}>RTO</span>
              <span style={{ background: "#f1f3f4", color: "#5f6368", borderRadius: 20, padding: "3px 12px", fontSize: 12, fontWeight: 600 }}>Returns</span>
            </div>
          </div>
          <MiniChart data={weeklyData} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
            {weeklyData.map((d, i) => (
              <span key={i} style={{ fontSize: 9, color: "#9aa0a6", textAlign: "center", maxWidth: 60 }}>{d.week}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Dispatch breakdown */}
      <div style={{ background: "#fff", border: "1px solid #e8eaed", borderRadius: 12, padding: "20px 24px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#202124", marginBottom: 16 }}>RTO % by Dispatch Time</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0 }}>
          {[
            { label: "Same Day (D0)", pct: "78%", color: "#fbbc04", orders: 351 },
            { label: "Next Day (D1)", pct: "77.7%", color: "#f5a623", orders: 1849 },
            { label: "SLA Breached", pct: "77.3%", color: "#ea4335", orders: 249 },
          ].map((item, i) => (
            <div key={i} style={{ padding: "0 24px 0 0", borderRight: i < 2 ? "1px solid #f1f3f4" : "none", paddingLeft: i > 0 ? 24 : 0 }}>
              <div style={{ fontSize: 12, color: "#5f6368", marginBottom: 6 }}>{item.label}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: item.color }}>{item.pct}</div>
              <div style={{ fontSize: 12, color: "#80868b", marginTop: 4 }}>Orders: <strong style={{ color: "#202124" }}>{item.orders.toLocaleString()}</strong></div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Table */}
      <div style={{ background: "#fff", border: "1px solid #e8eaed", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f1f3f4" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#202124" }}>Product Performance</span>
          <span style={{ fontSize: 12, color: "#80868b" }}>Showing 1–50 of 300</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#f8f9fa" }}>
                {["Product Details", "SKU ID", "Total Orders", "Delivered Orders", "RTO Orders", "Return Orders", "RTO %", "Return %"].map(h => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontWeight: 600, color: "#5f6368", fontSize: 12, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {overviewProducts.map((p, i) => (
                <tr key={p.id} style={{ borderTop: "1px solid #f1f3f4", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 24 }}>{p.img}</span>
                    <span style={{ color: "#202124", fontWeight: 500, maxWidth: 220 }}>{p.name}</span>
                  </td>
                  <td style={{ padding: "12px 16px", color: "#5f6368" }}>{p.sku}</td>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>{p.total}</td>
                  <td style={{ padding: "12px 16px" }}>{p.delivered}</td>
                  <td style={{ padding: "12px 16px" }}>{p.rto}</td>
                  <td style={{ padding: "12px 16px" }}>{p.returns}</td>
                  <td style={{ padding: "12px 16px" }}><RtoBadge value={p.rtoP} /></td>
                  <td style={{ padding: "12px 16px" }}><RtoBadge value={p.returnP} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ProductTable({ data, emptyMsg = "No data found" }) {
  const [view, setView] = useState("Aggregated");
  const [partner, setPartner] = useState("");
  const [sku, setSku] = useState("");

  const filtered = data.filter(d =>
    (partner === "" || d.partners.some(p => p.name === partner)) &&
    (sku === "" || d.sku.toLowerCase().includes(sku.toLowerCase()))
  );

  const partners = [...new Set(data.flatMap(d => d.partners.map(p => p.name)))];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Controls */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: "#5f6368", display: "block", marginBottom: 4 }}>Shipping Partner:</label>
            <select value={partner} onChange={e => setPartner(e.target.value)}
              style={{ border: "1px solid #dadce0", borderRadius: 8, padding: "7px 14px", fontSize: 13, color: "#3c4043", minWidth: 160, outline: "none", background: "#fff" }}>
              <option value="">-- Select Option --</option>
              {partners.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: "#5f6368", display: "block", marginBottom: 4 }}>SKU ID:</label>
            <input value={sku} onChange={e => setSku(e.target.value)} placeholder="Enter SKU ID"
              style={{ border: "1px solid #dadce0", borderRadius: 8, padding: "7px 14px", fontSize: 13, color: "#3c4043", minWidth: 180, outline: "none" }} />
          </div>
          <div style={{ paddingTop: 18, display: "flex", gap: 8 }}>
            <button onClick={() => { setPartner(""); setSku(""); }}
              style={{ border: "1px solid #dadce0", background: "#fff", borderRadius: 8, padding: "7px 16px", cursor: "pointer", fontSize: 13, fontWeight: 500, color: "#3c4043", display: "flex", alignItems: "center", gap: 6 }}>
              ↺ Reset
            </button>
            <button style={{ background: "#1a1a2e", color: "#fff", border: "none", borderRadius: 8, padding: "7px 20px", cursor: "pointer", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
              ✓ Apply
            </button>
            <button style={{ border: "1px solid #dadce0", background: "#fff", borderRadius: 8, padding: "7px 16px", cursor: "pointer", fontSize: 13, fontWeight: 500, color: "#3c4043", display: "flex", alignItems: "center", gap: 6 }}>
              ↓ Excel
            </button>
          </div>
        </div>
        <div style={{ display: "flex", background: "#f1f3f4", borderRadius: 20, padding: 3, gap: 2 }}>
          {["Aggregated", "Order Level"].map(v => (
            <button key={v} onClick={() => setView(v)}
              style={{ background: view === v ? "#1a1a2e" : "transparent", color: view === v ? "#fff" : "#5f6368", border: "none", borderRadius: 17, padding: "5px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "#fff", border: "1px solid #e8eaed", borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#f8f9fa" }}>
              {["Product Details", "Variant", "SKU ID", "Qty In Stock", "Shipping Partner", "Qty In RTO/Return"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#5f6368", fontSize: 12, whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: "40px 16px", textAlign: "center", color: "#80868b", fontSize: 14 }}>{emptyMsg}</td></tr>
            ) : (
              filtered.map((item, i) => (
                item.partners.map((partner, j) => (
                  <tr key={`${i}-${j}`} style={{ borderTop: "1px solid #f1f3f4", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                    {j === 0 && (
                      <>
                        <td rowSpan={item.partners.length} style={{ padding: "14px 16px", verticalAlign: "middle" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{ width: 44, height: 44, borderRadius: 10, background: "#f1f3f4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{item.img}</div>
                            <span style={{ color: "#202124", fontWeight: 500, maxWidth: 220, lineHeight: 1.4 }}>{item.name}</span>
                          </div>
                        </td>
                        <td rowSpan={item.partners.length} style={{ padding: "14px 16px", color: "#5f6368", verticalAlign: "middle" }}>{item.variant}</td>
                        <td rowSpan={item.partners.length} style={{ padding: "14px 16px", color: "#1a73e8", fontWeight: 500, verticalAlign: "middle" }}>{item.sku}</td>
                        <td rowSpan={item.partners.length} style={{ padding: "14px 16px", verticalAlign: "middle", textAlign: "center" }}>
                          <span style={{ background: "#fce8e6", color: "#c5221f", borderRadius: 6, padding: "2px 10px", fontSize: 12, fontWeight: 700 }}>{item.stock}</span>
                        </td>
                      </>
                    )}
                    <td style={{ padding: "8px 16px", verticalAlign: "middle" }}><PartnerBadge name={partner.name} /></td>
                    <td style={{ padding: "8px 16px", verticalAlign: "middle", fontWeight: 700, color: "#202124" }}>{partner.qty}</td>
                  </tr>
                ))
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ArrivingTodayTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Controls */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          {[{ label: "Delivered Date:", placeholder: "-- Select Option --", type: "select" }, { label: "Shipping Partner:", placeholder: "-- Select Option --", type: "select" }, { label: "SKU ID:", placeholder: "Enter SKU ID", type: "input" }].map((f, i) => (
            <div key={i}>
              <label style={{ fontSize: 11, fontWeight: 600, color: "#5f6368", display: "block", marginBottom: 4 }}>{f.label}</label>
              {f.type === "select" ? (
                <select style={{ border: "1px solid #dadce0", borderRadius: 8, padding: "7px 14px", fontSize: 13, color: "#9aa0a6", minWidth: 160, outline: "none", background: "#fff" }}>
                  <option>{f.placeholder}</option>
                </select>
              ) : (
                <input placeholder={f.placeholder} style={{ border: "1px solid #dadce0", borderRadius: 8, padding: "7px 14px", fontSize: 13, minWidth: 180, outline: "none" }} />
              )}
            </div>
          ))}
          <div style={{ paddingTop: 18, display: "flex", gap: 8 }}>
            <button style={{ border: "1px solid #dadce0", background: "#fff", borderRadius: 8, padding: "7px 16px", cursor: "pointer", fontSize: 13, fontWeight: 500, color: "#3c4043" }}>↺ Reset</button>
            <button style={{ background: "#1a1a2e", color: "#fff", border: "none", borderRadius: 8, padding: "7px 20px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>✓ Apply</button>
            <button style={{ border: "1px solid #dadce0", background: "#fff", borderRadius: 8, padding: "7px 16px", cursor: "pointer", fontSize: 13, fontWeight: 500, color: "#3c4043" }}>↓ Excel</button>
          </div>
        </div>
        <div style={{ display: "flex", background: "#f1f3f4", borderRadius: 20, padding: 3, gap: 2 }}>
          {["Aggregated", "Order Level"].map((v, i) => (
            <button key={v} style={{ background: i === 0 ? "#1a1a2e" : "transparent", color: i === 0 ? "#fff" : "#5f6368", border: "none", borderRadius: 17, padding: "5px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>{v}</button>
          ))}
        </div>
      </div>

      {/* Empty state */}
      <div style={{ background: "#fff", border: "1px solid #e8eaed", borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#f8f9fa" }}>
              {["Product Details", "Variant", "SKU ID", "Qty In Stock", "Shipping Partner", "Qty In RTO/Return"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#5f6368", fontSize: 12, whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} style={{ padding: "60px 16px", textAlign: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                  <div style={{ fontSize: 40 }}>📭</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#3c4043" }}>No data found</div>
                  <div style={{ fontSize: 13, color: "#80868b" }}>No RTO/returns arriving today for the selected filters.</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const TABS = ["Overview", "In Transit", "Arriving Today", "Delivered"];

export default function ManageRTO() {
  const [activeTab, setActiveTab] = useState("Overview");

  const tabBadges = {
    "In Transit": { count: 12, color: "#1a73e8" },
    "Arriving Today": { count: 0, color: "#ea4335" },
    "Delivered": { count: 8, color: "#34a853" },
  };

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#f8f9fa", minHeight: "100vh", padding: "28px 32px", color: "#202124" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        button, select, input { font-family: inherit; }
        tr:hover { background: #f0f7ff !important; transition: background 0.15s; }
      `}</style>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <div style={{ width: 42, height: 42, borderRadius: 12, background: "linear-gradient(135deg, #1a1a2e, #16213e)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>📦</div>
        <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0, letterSpacing: "-0.5px" }}>Manage RTO / Returns</h1>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, borderBottom: "2px solid #e8eaed", marginBottom: 24 }}>
        {TABS.map(tab => {
          const badge = tabBadges[tab];
          const active = tab === activeTab;
          return (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{
                background: "none", border: "none", borderBottom: active ? "2px solid #1a1a2e" : "2px solid transparent",
                marginBottom: -2, padding: "10px 20px", cursor: "pointer", fontWeight: active ? 700 : 500,
                fontSize: 14, color: active ? "#1a1a2e" : "#5f6368", display: "flex", alignItems: "center", gap: 8,
                transition: "all 0.2s"
              }}>
              {tab}
              {badge && badge.count > 0 && (
                <span style={{ background: badge.color, color: "#fff", borderRadius: 10, padding: "1px 7px", fontSize: 11, fontWeight: 700 }}>{badge.count}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === "Overview" && <OverviewTab />}
      {activeTab === "In Transit" && <ProductTable data={inTransitData} />}
      {activeTab === "Arriving Today" && <ArrivingTodayTab />}
      {activeTab === "Delivered" && <ProductTable data={deliveredData} />}
    </div>
  );
}
import { useState } from "react";

const GRADIENT = "linear-gradient(135deg, #0097b2 0%, #7ed957 100%)";
const GRADIENT_HOVER = "linear-gradient(135deg, #007a91 0%, #65c040 100%)";

type StatusType = "Completed" | "Processing" | "Failed";

interface Report {
  id: number;
  name: string;
  requestedOn: string;
  status: StatusType;
}

const REPORTS: Report[] = [
  {
    id: 1,
    name: "GST_Report_Loox Shop4b9f84e3-ec4d-4292-b1d0-85bffdcd1c1c",
    requestedOn: "04 Mar 2026 05:32 AM",
    status: "Completed",
  },
  {
    id: 2,
    name: "GST_Report_Loox Shope5fdfce1-a26f-4b03-8ff2-a7743b533289",
    requestedOn: "09 Feb 2026 14:59 PM",
    status: "Completed",
  },
  {
    id: 3,
    name: "GST_Report_Loox Shop35d8bc04-a846-4af8-afc9-1e0b35e7bd5f",
    requestedOn: "04 Feb 2026 05:32 AM",
    status: "Processing",
  },
  {
    id: 4,
    name: "GST_Report_Loox Shopf846154e-54d6-43e6-b97b-4cdcf39f2e7e",
    requestedOn: "07 Jan 2026 20:57 PM",
    status: "Completed",
  },
  {
    id: 5,
    name: "GST_Report_Loox Shop3cca41a3-6995-441e-8583-afbd19745eed",
    requestedOn: "04 Jan 2026 05:32 AM",
    status: "Completed",
  },
  {
    id: 6,
    name: "GST_Report_Loox Shopca6bea87-296a-4b5f-8647-1c10c4861f26",
    requestedOn: "12 Dec 2025 16:49 PM",
    status: "Failed",
  },
  {
    id: 7,
    name: "GST_Report_Loox Shop7fa2c019-13b4-4e91-bc44-9d2e6f3a8d01",
    requestedOn: "01 Dec 2025 09:15 AM",
    status: "Completed",
  },
  {
    id: 8,
    name: "GST_Report_Loox Shop2b3d8e4f-77cc-4d12-b561-8a9e0f1c2345",
    requestedOn: "20 Nov 2025 11:40 AM",
    status: "Processing",
  },
  {
    id: 9,
    name: "GST_Report_Loox Shopd9e1f832-5a6b-4c78-a923-1b4c7d8e9f01",
    requestedOn: "05 Nov 2025 08:22 AM",
    status: "Completed",
  },
  {
    id: 10,
    name: "GST_Report_Loox Shop6c2f1a94-3e5d-4b87-c012-9d8e7f6a5b43",
    requestedOn: "28 Oct 2025 17:05 PM",
    status: "Completed",
  },
];

const PAGE_SIZE = 5;

// ── Status Badge ──────────────────────────────────────────────────────────────
const STATUS_STYLES: Record<
  StatusType,
  { background: string; color: string; border: string }
> = {
  Completed: {
    background: "rgba(126,217,87,0.12)",
    color: "#2e7d1e",
    border: "1.5px solid rgba(126,217,87,0.45)",
  },
  Processing: {
    background: "rgba(0,151,178,0.1)",
    color: "#0097b2",
    border: "1.5px solid rgba(0,151,178,0.35)",
  },
  Failed: {
    background: "rgba(229,57,53,0.08)",
    color: "#c62828",
    border: "1.5px solid rgba(229,57,53,0.3)",
  },
};

function StatusBadge({ status }: { status: StatusType }) {
  const s = STATUS_STYLES[status] ?? STATUS_STYLES.Completed;
  return (
    <span
      style={{
        ...s,
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "4px 12px",
        borderRadius: 20,
        fontSize: "0.78rem",
        fontWeight: 700,
        letterSpacing: "0.01em",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: s.color,
          flexShrink: 0,
          boxShadow: `0 0 4px ${s.color}`,
        }}
      />
      {status}
    </span>
  );
}

// ── Download Button ───────────────────────────────────────────────────────────
function DownloadButton({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  // Icon stroke follows the button text color explicitly — not currentColor
  // because currentColor on an SVG inside a gradient-background button
  // resolves from the nearest CSS color, which may lag behind the transition.
  const iconStroke = hovered ? "#ffffff" : "#0097b2";

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "7px 16px",
        borderRadius: 9,
        border: hovered ? "none" : "1.5px solid #0097b2",
        background: hovered ? GRADIENT : "transparent",
        color: hovered ? "#fff" : "#0097b2",
        fontSize: "0.82rem",
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.2s ease",
        boxShadow: hovered ? "0 3px 12px rgba(0,151,178,0.25)" : "none",
        whiteSpace: "nowrap",
      }}
    >
      {/* Explicit stroke color — never relies on currentColor */}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke={iconStroke} // ← explicit, driven by React state
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transition: "stroke 0.2s ease", flexShrink: 0 }}
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      Download
    </button>
  );
}

// ── Nav arrow button (extracted so hooks aren't called inside .map) ───────────
function NavArrow({
  arrow,
  disabled,
  onClick,
}: {
  arrow: string;
  disabled: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 32,
        height: 32,
        borderRadius: 8,
        border: "1.5px solid #d0eef3",
        background: disabled ? "#f0f0f0" : hovered ? GRADIENT : "#fff",
        color: disabled ? "#bbb" : hovered ? "#fff" : "#0097b2",
        fontSize: "1rem",
        fontWeight: 700,
        cursor: disabled ? "default" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s",
        boxShadow:
          hovered && !disabled ? "0 2px 8px rgba(0,151,178,0.2)" : "none",
      }}
    >
      {arrow}
    </button>
  );
}

// ── Page number button (extracted for same reason) ────────────────────────────
function PageButton({
  page,
  active,
  onClick,
}: {
  page: number;
  active: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 34,
        height: 34,
        borderRadius: 9,
        border: active ? "none" : "1.5px solid #d0eef3",
        background: active
          ? GRADIENT
          : hovered
            ? "rgba(0,151,178,0.08)"
            : "#fff",
        color: active ? "#fff" : hovered ? "#0097b2" : "#555",
        fontSize: "0.82rem",
        fontWeight: active ? 700 : 500,
        cursor: "pointer",
        transition: "all 0.2s",
        boxShadow: active ? "0 2px 10px rgba(0,151,178,0.25)" : "none",
      }}
    >
      {page}
    </button>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function ReportsTable() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(REPORTS.length / PAGE_SIZE);
  const paginated = REPORTS.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4fbfc",
        padding: "28px 32px",
      }}
    >
      {/* ── Header ── */}
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
          <h1
            style={{
              fontSize: "1.75rem",
              fontWeight: 800,
              color: "#000",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Reports
          </h1>
          <p style={{ color: "#555", margin: "4px 0 0", fontSize: "0.9rem" }}>
            Find all your requested reports here in one place.
          </p>
        </div>

        {/* Top pagination */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: "0.85rem", color: "#555" }}>
            Showing{" "}
            <strong style={{ color: "#000" }}>
              {(page - 1) * PAGE_SIZE + 1}–
              {Math.min(page * PAGE_SIZE, REPORTS.length)}
            </strong>{" "}
            Reports of{" "}
            <strong style={{ color: "#000" }}>{REPORTS.length}</strong>
          </span>
          <div style={{ display: "flex", gap: 6 }}>
            <NavArrow
              arrow="‹"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            />
            <NavArrow
              arrow="›"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            />
          </div>
        </div>
      </div>

      {/* ── Table ── */}
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          border: "1.5px solid #e0f4f7",
          overflow: "hidden",
          boxShadow: "0 2px 16px rgba(0,151,178,0.08)",
        }}
      >
        {/* Header row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 220px 160px 150px",
            background: GRADIENT,
            padding: "14px 24px",
            gap: 16,
          }}
        >
          {["Report Name", "Requested On", "Status", "Actions"].map((h) => (
            <span
              key={h}
              style={{
                fontSize: "0.76rem",
                fontWeight: 700,
                color: "#fff",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {h}
            </span>
          ))}
        </div>

        {/* Data rows */}
        {paginated.map((report, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={report.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 220px 160px 150px",
                padding: "18px 24px",
                gap: 16,
                alignItems: "center",
                background: isEven ? "#fff" : "#f8fdfe",
                borderBottom:
                  idx < paginated.length - 1 ? "1px solid #e8f6f9" : "none",
                transition: "background 0.15s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#edf8fb")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = isEven ? "#fff" : "#f8fdfe")
              }
            >
              <span
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#000",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {report.name}
              </span>
              <span style={{ fontSize: "0.875rem", color: "#444" }}>
                {report.requestedOn}
              </span>
              <div>
                <StatusBadge status={report.status} />
              </div>
              <div>
                <DownloadButton
                  onClick={() => alert(`Downloading: ${report.name}`)}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Bottom Pagination ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 6,
          marginTop: 20,
        }}
      >
        {Array.from({ length: totalPages }, (_, i) => (
          <PageButton
            key={i}
            page={i + 1}
            active={page === i + 1}
            onClick={() => setPage(i + 1)}
          />
        ))}
      </div>
    </div>
  );
}

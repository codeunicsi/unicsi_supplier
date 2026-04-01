import React, { useState } from "react";

const GRADIENT = "linear-gradient(135deg, #0097b2 0%, #7ed957 100%)";
const GRADIENT_HOVER = "linear-gradient(135deg, #007a91 0%, #65c040 100%)";

type StatusType = "Completed" | "Processing" | "Failed";

interface Report {
  id: number;
  name: string;
  requestedOn: string;
  status: StatusType;
}

const REPORTS: Report[] = [];

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
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke={iconStroke}
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

// ── Nav arrow button ──────────────────────────────────────────────────────────
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

// ── Page number button ────────────────────────────────────────────────────────
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

  const handleDownload = (reportName: string) => {
    const link = document.createElement("a");
    link.href = "/GST_Report.zip"; // place your zip file inside the /public folder
    link.download = `${reportName}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
          {REPORTS.length === 0 ? (
            <span style={{ fontSize: "0.85rem", color: "#555" }}>
              <strong style={{ color: "#000" }}>0</strong> reports
            </span>
          ) : (
            <>
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
                  disabled={page === 1 || totalPages === 0}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                />
                <NavArrow
                  arrow="›"
                  disabled={page >= totalPages || totalPages === 0}
                  onClick={() => setPage((p) => p + 1)}
                />
              </div>
            </>
          )}
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
        {REPORTS.length === 0 ? (
          <div
            style={{
              padding: "48px 24px",
              textAlign: "center",
              fontSize: "0.9rem",
              color: "#555",
              fontWeight: 500,
            }}
          >
            You don&apos;t have any reports to show.
          </div>
        ) : (
          paginated.map((report, idx) => {
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
                  (e.currentTarget.style.background = isEven
                    ? "#fff"
                    : "#f8fdfe")
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
                  <DownloadButton onClick={() => handleDownload(report.name)} />
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ── Bottom Pagination ── */}
      {totalPages > 0 && (
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
      )}
    </div>
  );
}

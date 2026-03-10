const GRADIENT = "linear-gradient(135deg, #0097b2 0%, #7ed957 100%)";

const ICONS = {
  orders: (
    <svg width="13" height="13" viewBox="0 0 15 15" fill="none">
      <path
        d="M7.84863 2.77148C11.9344 2.77148 14.0112 5.78504 14.6279 6.87305C14.7651 7.11507 14.7651 7.40251 14.6279 7.64453C14.0112 8.73252 11.9344 11.7461 7.84863 11.7461C3.763 11.746 1.686 8.73246 1.06934 7.64453C0.932308 7.40262 0.932302 7.11496 1.06934 6.87305C1.686 5.78511 3.763 2.77163 7.84863 2.77148ZM7.85059 4.76562C6.47378 4.76562 5.35742 5.88198 5.35742 7.25879C5.35749 8.63554 6.47382 9.75195 7.85059 9.75195C9.22717 9.75173 10.3427 8.6354 10.3428 7.25879C10.3428 5.88212 9.22721 4.76584 7.85059 4.76562Z"
        fill="#fff"
      />
    </svg>
  ),
  sales: (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  default: (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
};

export default function AnalyticsCard({
  title,
  value,
  percentage,
  description,
  icon,
  trend = "up",
}) {
  const isUp = trend !== "down";
  const resolvedIcon =
    typeof icon === "string"
      ? (ICONS[icon] ?? ICONS.default)
      : (icon ?? ICONS.default);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "130px",
        borderRadius: "16px",
        border: "1.5px solid #e0f4f7",
        background: "#fff",
        boxShadow: "0 2px 12px rgba(0,151,178,0.08)",
        padding: "14px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "10px",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,151,178,0.16)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,151,178,0.08)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Corner glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 60,
          height: 60,
          background:
            "linear-gradient(225deg, rgba(0,151,178,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Row 1: Icon + Title + Dots */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "6px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            minWidth: 0,
            flex: 1,
          }}
        >
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: "7px",
              flexShrink: 0,
              background: GRADIENT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 6px rgba(0,151,178,0.25)",
            }}
          >
            {resolvedIcon}
          </div>
          <p
            style={{
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "#444",
              margin: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            gap: "3px",
            flexShrink: 0,
            padding: "4px",
            cursor: "pointer",
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "#0097b2",
                opacity: 0.65,
              }}
            />
          ))}
        </div>
      </div>

      {/* Row 2: Value (left) + Badge (right) */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "8px",
        }}
      >
        <div style={{ minWidth: 0, flex: 1 }}>
          <div
            style={{
              fontSize: "1.6rem",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              background: GRADIENT,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {value}
          </div>
          {description && (
            <p
              style={{
                fontSize: "0.68rem",
                color: "#888",
                margin: "3px 0 0",
                fontWeight: 500,
                lineHeight: 1.3,
              }}
            >
              {description}
            </p>
          )}
        </div>

        {/* Badge */}
        <div
          style={{
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: isUp ? "rgba(126,217,87,0.15)" : "rgba(229,57,53,0.1)",
            border: `1.5px solid ${isUp ? "rgba(126,217,87,0.45)" : "rgba(229,57,53,0.3)"}`,
            borderRadius: "10px",
            padding: "5px 8px",
            minWidth: "50px",
          }}
        >
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 800,
              color: isUp ? "#2e7d1e" : "#c62828",
              lineHeight: 1,
            }}
          >
            {/* Strip arrow characters from percentage prop since we render our own */}
            {typeof percentage === "string"
              ? percentage.replace(/[↑↓]/g, "").trim()
              : percentage}
          </span>
          <span
            style={{
              fontSize: "0.62rem",
              color: isUp ? "#4caf50" : "#e53935",
              marginTop: "2px",
            }}
          >
            {isUp ? "↑" : "↓"}
          </span>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          background: GRADIENT,
          borderRadius: "0 0 16px 16px",
        }}
      />
    </div>
  );
}

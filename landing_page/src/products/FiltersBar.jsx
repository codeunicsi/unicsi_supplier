import Button from "../ui/Button";
import Dropdown from "../ui/Dropdown";
import DateRangePicker from "../ui/DateRangePicker";

const GRADIENT = "linear-gradient(135deg, #0097b2 0%, #7ed957 100%)";
const GRADIENT_HOVER = "linear-gradient(135deg, #007a91 0%, #65c040 100%)";

function DateFilter() {
  return (
    <div
      style={{
        border: "1.5px solid #d0eef3",
        borderRadius: "10px",
        overflow: "hidden",
        background: "#f0fafc",
      }}
    >
      <DateRangePicker onChange={(range) => console.log(range)} />
    </div>
  );
}

function DropdownFilter({ options, value }) {
  return (
    <div style={{ position: "relative" }}>
      <Dropdown
        options={options}
        value={value}
        onChange={(val) => console.log(val)}
        style={{
          border: "1.5px solid #d0eef3",
          borderRadius: "10px",
          padding: "7px 14px",
          background: "#f0fafc",
          color: "#1a1a1a",
          fontSize: "0.875rem",
          fontWeight: 500,
          cursor: "pointer",
          outline: "none",
          appearance: "none",
        }}
      />
    </div>
  );
}

function SearchBox() {
  return (
    <div
      style={{ position: "relative", display: "flex", alignItems: "center" }}
    >
      {/* Search icon */}
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0097b2"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ position: "absolute", left: "11px", pointerEvents: "none" }}
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="text"
        placeholder="Search..."
        style={{
          paddingLeft: "34px",
          paddingRight: "14px",
          paddingTop: "8px",
          paddingBottom: "8px",
          border: "1.5px solid #d0eef3",
          borderRadius: "10px",
          background: "#f0fafc",
          fontSize: "0.875rem",
          color: "#1a1a1a",
          outline: "none",
          width: "200px",
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "#0097b2";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,151,178,0.12)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "#d0eef3";
          e.currentTarget.style.boxShadow = "none";
        }}
      />
    </div>
  );
}

function GradientButton({ children, onClick, secondary = false }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 18px",
        borderRadius: "10px",
        border: secondary ? "1.5px solid #0097b2" : "none",
        background: secondary ? "transparent" : GRADIENT,
        color: secondary ? "#0097b2" : "#fff",
        fontSize: "0.875rem",
        fontWeight: 600,
        cursor: "pointer",
        whiteSpace: "nowrap",
        boxShadow: secondary ? "none" : "0 2px 10px rgba(0,151,178,0.2)",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        if (secondary) {
          e.currentTarget.style.background = GRADIENT;
          e.currentTarget.style.color = "#fff";
          e.currentTarget.style.borderColor = "transparent";
        } else {
          e.currentTarget.style.background = GRADIENT_HOVER;
          e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,151,178,0.3)";
        }
      }}
      onMouseLeave={(e) => {
        if (secondary) {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "#0097b2";
          e.currentTarget.style.borderColor = "#0097b2";
        } else {
          e.currentTarget.style.background = GRADIENT;
          e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,151,178,0.2)";
        }
      }}
    >
      {children}
    </button>
  );
}

function ActionButtons() {
  return (
    <>
      <GradientButton>Show Pending Orders</GradientButton>
      <GradientButton secondary>Clear All Filters</GradientButton>
    </>
  );
}

export default function FiltersBar({ type }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "12px",
        background: "#ffffff",
        padding: "14px 18px",
        borderRadius: "14px",
        border: "1.5px solid #e0f4f7",
        boxShadow: "0 2px 12px rgba(0,151,178,0.07)",
        marginBottom: "16px",
        flexWrap: "wrap",
      }}
    >
      {type === "manage-product" && (
        <>
          <DateFilter />
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <DropdownFilter
              options={["NDR Date", "Today", "Last 7 Days"]}
              value="NDR Date"
            />
            <DropdownFilter
              options={["Delivery Attempt", "First Attempt", "Second Attempt"]}
              value="Delivery Attempt"
            />
            <ActionButtons />
          </div>
        </>
      )}

      {[
        "manage-product-requirements",
        "order",
        "manage-product-2",
        "analytics",
      ].includes(type) && (
        <>
          <DateFilter />
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <DropdownFilter
              options={["NDR Date", "Today", "Last 7 Days"]}
              value="NDR Date"
            />
            <SearchBox />
          </div>
        </>
      )}
    </div>
  );
}

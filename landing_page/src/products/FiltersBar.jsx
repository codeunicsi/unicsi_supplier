import Button from "../ui/Button";
import Dropdown from "../ui/Dropdown";
import DateRangePicker from "../ui/DateRangePicker";

const GRADIENT = "linear-gradient(135deg, #0097b2 0%, #7ed957 100%)";
const GRADIENT_HOVER = "linear-gradient(135deg, #007a91 0%, #65c040 100%)";

function DateFilter() {
  return (
    <div
      className="w-full min-w-0 sm:max-w-[min(100%,440px)] sm:flex-shrink-0"
      style={{
        border: "1.5px solid #d0eef3",
        borderRadius: "10px",
        overflow: "hidden",
        background: "#f0fafc",
        boxSizing: "border-box",
      }}
    >
      <DateRangePicker
        className="flex-wrap sm:flex-nowrap"
        onChange={(range) => console.log(range)}
      />
    </div>
  );
}

function DropdownFilter({ options, value }) {
  return (
    <div className="relative w-full min-w-0 sm:w-auto sm:max-w-[min(100%,280px)]">
      <Dropdown
        options={options}
        value={value}
        onChange={(val) => console.log(val)}
        className="cursor-pointer font-medium text-[#1a1a1a] outline-none"
        style={{
          border: "1.5px solid #d0eef3",
          borderRadius: "10px",
          padding: "7px 14px",
          background: "#f0fafc",
          fontSize: "0.875rem",
          appearance: "none",
        }}
      />
    </div>
  );
}

function SearchBox() {
  return (
    <div
      className="relative flex min-w-0 w-full max-w-full items-center sm:max-w-[min(100%,320px)] sm:flex-shrink-0"
      style={{ boxSizing: "border-box" }}
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
        className="min-w-0 w-full max-w-full"
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
          width: "100%",
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

function GradientButton({ children, onClick, secondary = false, stretch = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        stretch ? "w-full min-w-0 max-w-full box-border sm:w-auto sm:max-w-none" : ""
      }
      style={{
        ...(stretch
          ? { whiteSpace: "normal", lineHeight: 1.35 }
          : { whiteSpace: "nowrap" }),
        padding: "8px 18px",
        borderRadius: "10px",
        border: secondary ? "1.5px solid #0097b2" : "none",
        background: secondary ? "transparent" : GRADIENT,
        color: secondary ? "#0097b2" : "#fff",
        fontSize: "0.875rem",
        fontWeight: 600,
        cursor: "pointer",
        textAlign: "center",
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
    <div className="flex w-full min-w-0 flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-end">
      <GradientButton stretch>Show Pending Orders</GradientButton>
      <GradientButton stretch secondary>
        Clear All Filters
      </GradientButton>
    </div>
  );
}

export default function FiltersBar({ type }) {
  return (
    <div
      className="mb-4 flex w-full min-w-0 max-w-full flex-col gap-3 rounded-[14px] border-[1.5px] border-[#e0f4f7] bg-white p-3 shadow-[0_2px_12px_rgba(0,151,178,0.07)] sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3 sm:p-[14px_18px]"
      style={{
        boxSizing: "border-box",
      }}
    >
      {type === "manage-product" && (
        <>
          <DateFilter />
          <div className="flex w-full min-w-0 flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-2.5">
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
          <div className="flex w-full min-w-0 flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-2.5">
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

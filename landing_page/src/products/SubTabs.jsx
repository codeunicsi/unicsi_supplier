import { useState } from "react";

export default function SubTabs({ tabItems }) {
  const [active, setActive] = useState(tabItems[0]);

  return (
    <div
      className="mb-6 flex min-w-0 w-full max-w-full flex-wrap justify-stretch gap-1 p-1 sm:w-fit sm:flex-nowrap sm:justify-start"
      style={{
        background: "#f0fafc",
        borderRadius: "14px",
        border: "1.5px solid #d0eef3",
      }}
    >
      {tabItems.map((tab) => {
        const isActive = active === tab;
        return (
          <button
            type="button"
            key={tab}
            onClick={() => setActive(tab)}
            className="min-h-[40px] min-w-0 flex-1 px-3 py-2 sm:flex-none sm:px-5"
            style={{
              position: "relative",
              fontSize: "0.875rem",
              fontWeight: isActive ? 700 : 500,
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              transition: "all 0.22s ease",
              background: isActive
                ? "linear-gradient(135deg, #0097b2 0%, #7ed957 100%)"
                : "transparent",
              color: isActive ? "#ffffff" : "#4a4a4a",
              boxShadow: isActive ? "0 2px 10px rgba(0,151,178,0.25)" : "none",
              whiteSpace: "nowrap",
              letterSpacing: isActive ? "0.01em" : "normal",
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.background = "rgba(0,151,178,0.08)";
                e.currentTarget.style.color = "#0097b2";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#4a4a4a";
              }
            }}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}

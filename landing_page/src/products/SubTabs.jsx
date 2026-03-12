import { useState } from "react";

export default function SubTabs({ tabItems }) {
  const [active, setActive] = useState(tabItems[0]);

  return (
    <div
      className="flex justify-start gap-1 mb-6 p-1 w-fit"
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
            key={tab}
            onClick={() => setActive(tab)}
            style={{
              position: "relative",
              padding: "8px 20px",
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

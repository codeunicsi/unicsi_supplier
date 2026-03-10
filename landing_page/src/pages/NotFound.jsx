// components/NotFound.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const GRADIENT = "linear-gradient(135deg, #0097b2 0%, #7ed957 100%)";
const GRADIENT_HOVER = "linear-gradient(135deg, #007a91 0%, #65c040 100%)";

export default function NotFound() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f4fbfc",
      }}
    >
      {/* Card */}
      <div
        style={{
          textAlign: "center",
          maxWidth: 420,
          width: "100%",
          margin: "0 16px",
          background: "#fff",
          borderRadius: 24,
          border: "1.5px solid #e0f4f7",
          boxShadow: "0 8px 40px rgba(0,151,178,0.12)",
          padding: "48px 40px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top gradient bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 5,
            background: GRADIENT,
          }}
        />

        {/* Corner glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 120,
            height: 120,
            background:
              "linear-gradient(225deg, rgba(0,151,178,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 100,
            height: 100,
            background:
              "linear-gradient(45deg, rgba(126,217,87,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Icon circle */}
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: GRADIENT,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
            boxShadow: "0 6px 20px rgba(0,151,178,0.25)",
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        {/* 404 */}
        <div
          style={{
            fontSize: "5rem",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            background: GRADIENT,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: 12,
          }}
        >
          404
        </div>

        {/* Title */}
        <p
          style={{
            fontSize: "1.3rem",
            fontWeight: 700,
            color: "#000",
            margin: "0 0 8px",
          }}
        >
          Page Not Found
        </p>

        {/* Description */}
        <p
          style={{
            fontSize: "0.9rem",
            color: "#666",
            lineHeight: 1.6,
            margin: "0 0 32px",
          }}
        >
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Go Back Button */}
        <button
          onClick={() => navigate(-1)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "12px 28px",
            background: hovered ? GRADIENT_HOVER : GRADIENT,
            color: "#fff",
            border: "none",
            borderRadius: 12,
            fontSize: "0.9rem",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: hovered
              ? "0 6px 20px rgba(0,151,178,0.35)"
              : "0 3px 12px rgba(0,151,178,0.25)",
            transition: "all 0.2s ease",
            transform: hovered ? "translateY(-1px)" : "translateY(0)",
          }}
        >
          <ArrowLeft size={18} color="#fff" />
          Go Back
        </button>
      </div>
    </div>
  );
}

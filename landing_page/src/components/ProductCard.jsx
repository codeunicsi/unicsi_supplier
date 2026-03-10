// components/products/ProductCard.jsx
import { useState } from "react";

const GRADIENT = "linear-gradient(135deg, #0097b2 0%, #7ed957 100%)";
const GRADIENT_HOVER = "linear-gradient(135deg, #007a91 0%, #65c040 100%)";

export default function ProductCard({ product }) {
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <div
      style={{
        width: "220px",
        borderRadius: "16px",
        border: "1.5px solid #e0f4f7",
        background: "#fff",
        boxShadow: "0 2px 12px rgba(0,151,178,0.08)",
        overflow: "hidden",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,151,178,0.16)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,151,178,0.08)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Image */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "130px",
          overflow: "hidden",
        }}
      >
        <img
          src={product?.images?.[0]?.image_url}
          alt="Product"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        {/* Gradient overlay strip at bottom of image */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "40px",
            background:
              "linear-gradient(to top, rgba(0,151,178,0.15), transparent)",
          }}
        />
      </div>

      {/* Body */}
      <div style={{ padding: "10px 12px 12px" }}>
        {/* Title + Orders */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "6px",
          }}
        >
          <h4
            style={{
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "#000",
              margin: 0,
              flex: 1,
              lineHeight: 1.3,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "130px",
            }}
          >
            {product?.title}
          </h4>
          {/* Orders badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "3px",
              background: "rgba(0,151,178,0.08)",
              borderRadius: "20px",
              padding: "2px 7px",
            }}
          >
            <svg width="11" height="12" viewBox="0 0 12 13" fill="none">
              <g clipPath="url(#clip0_328_1023)">
                <path
                  d="M2.91561 3.2531H3.84782V4.65141H8.50888V3.2531H9.4411V5.58363H10.3733V3.2531C10.3733 2.74038 9.95381 2.32088 9.4411 2.32088H7.49277C7.29701 1.7802 6.78429 1.38867 6.17835 1.38867C5.57242 1.38867 5.0597 1.7802 4.86393 2.32088H2.91561C2.40289 2.32088 1.9834 2.74038 1.9834 3.2531V9.77858C1.9834 10.2913 2.40289 10.7108 2.91561 10.7108H5.71225V9.77858H2.91561V3.2531ZM6.17835 2.32088C6.43471 2.32088 6.64446 2.53063 6.64446 2.78699C6.64446 3.04335 6.43471 3.2531 6.17835 3.2531C5.922 3.2531 5.71225 3.04335 5.71225 2.78699C5.71225 2.53063 5.922 2.32088 6.17835 2.32088Z"
                  fill="#0097b2"
                />
                <path
                  d="M10.373 6.28125L7.81405 8.84483L6.41107 7.44652L5.71191 8.14567L7.81405 10.2432L11.0721 6.98041L10.373 6.28125Z"
                  fill="#7ed957"
                />
              </g>
              <defs>
                <clipPath id="clip0_328_1023">
                  <rect
                    width="11.1865"
                    height="11.1865"
                    fill="white"
                    transform="translate(0.584961 0.921875)"
                  />
                </clipPath>
              </defs>
            </svg>
            <span
              style={{ fontSize: "0.72rem", fontWeight: 700, color: "#0097b2" }}
            >
              26
            </span>
          </div>
        </div>

        {/* Price */}
        <div style={{ marginBottom: "8px" }}>
          <span
            style={{
              fontSize: "0.95rem",
              fontWeight: 800,
              color: "#000",
              background: GRADIENT,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ₹ 3,999
          </span>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#f4fbfc",
            borderRadius: "10px",
            padding: "6px 8px",
            marginBottom: "10px",
            border: "1px solid #e0f4f7",
          }}
        >
          {/* Stock */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2px",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 19 19" fill="none">
              <path
                d="M12.8608 5.94745H15.1603C15.2994 5.94758 15.4335 5.99934 15.5366 6.09269C15.6397 6.18604 15.7044 6.31433 15.7184 6.45272L16.0608 9.87732H14.9313L14.6506 7.07027H12.8608V8.7545C12.8608 8.90339 12.8016 9.04619 12.6963 9.15147C12.5911 9.25676 12.4483 9.31591 12.2994 9.31591C12.1505 9.31591 12.0077 9.25676 11.9024 9.15147C11.7971 9.04619 11.738 8.90339 11.738 8.7545V7.07027H7.24668V8.7545C7.24668 8.90339 7.18753 9.04619 7.08224 9.15147C6.97696 9.25676 6.83416 9.31591 6.68527 9.31591C6.53637 9.31591 6.39358 9.25676 6.28829 9.15147C6.18301 9.04619 6.12386 8.90339 6.12386 8.7545V7.07027H4.33296L3.4347 16.0528H9.49232V17.1756H2.81379C2.73537 17.1756 2.65784 17.1591 2.5862 17.1272C2.51455 17.0953 2.45037 17.0488 2.3978 16.9906C2.34523 16.9325 2.30543 16.8639 2.28096 16.7894C2.25649 16.7149 2.2479 16.6361 2.25574 16.5581L3.26628 6.45272C3.28019 6.31433 3.34497 6.18604 3.44807 6.09269C3.55117 5.99934 3.68524 5.94758 3.82432 5.94745H6.12386V5.55558C6.12386 3.60861 7.62395 2.01758 9.49232 2.01758C11.3607 2.01758 12.8608 3.60861 12.8608 5.55558V5.94857V5.94745ZM11.738 5.94745V5.55558C11.738 4.21494 10.7252 3.1404 9.49232 3.1404C8.25946 3.1404 7.24668 4.21494 7.24668 5.55558V5.94857H11.738V5.94745ZM15.2715 14.3012C15.3227 14.2455 15.3846 14.2007 15.4536 14.1695C15.5226 14.1384 15.5971 14.1215 15.6728 14.1198C15.7485 14.1182 15.8237 14.1319 15.8939 14.1601C15.9641 14.1883 16.028 14.2304 16.0815 14.2839C16.1351 14.3374 16.1773 14.4011 16.2055 14.4713C16.2338 14.5415 16.2476 14.6167 16.2461 14.6924C16.2446 14.768 16.2278 14.8426 16.1967 14.9116C16.1657 14.9806 16.121 15.0426 16.0653 15.0939L13.8197 17.3396C13.7144 17.4448 13.5716 17.504 13.4227 17.504C13.2739 17.504 13.1311 17.4448 13.0258 17.3396L10.7802 15.0939C10.7266 15.0421 10.6838 14.9802 10.6544 14.9117C10.625 14.8432 10.6095 14.7695 10.6088 14.695C10.6082 14.6205 10.6224 14.5465 10.6506 14.4775C10.6788 14.4085 10.7205 14.3459 10.7732 14.2931C10.8259 14.2404 10.8886 14.1987 10.9576 14.1705C11.0266 14.1423 11.1005 14.1281 11.1751 14.1287C11.2496 14.1294 11.3233 14.1449 11.3918 14.1743C11.4603 14.2037 11.5222 14.2465 11.574 14.3001L12.8608 15.588V11.5615C12.8608 11.4127 12.9199 11.2699 13.0252 11.1646C13.1305 11.0593 13.2733 11.0001 13.4222 11.0001C13.5711 11.0001 13.7139 11.0593 13.8192 11.1646C13.9244 11.2699 13.9836 11.4127 13.9836 11.5615V15.588L15.2715 14.3001V14.3012Z"
                fill="#0097b2"
              />
            </svg>
            <span
              style={{ fontSize: "0.68rem", fontWeight: 700, color: "#000" }}
            >
              2.5k
            </span>
            <span style={{ fontSize: "0.6rem", color: "#777" }}>Stock</span>
          </div>

          <div
            style={{ width: "1px", height: "32px", background: "#d0eef3" }}
          />

          {/* Shipping */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2px",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 19 19" fill="none">
              <path
                d="M3.00954 9.87736H9.74646V11.0002H3.00954V9.87736ZM1.88672 7.07031H7.50082V8.19313H1.88672V7.07031Z"
                fill="#0097b2"
              />
              <path
                d="M17.5607 10.218L15.8765 6.28812C15.8332 6.18715 15.7612 6.1011 15.6695 6.04063C15.5778 5.98015 15.4704 5.94791 15.3605 5.9479H13.6763V4.82508C13.6763 4.67619 13.6171 4.53339 13.5119 4.42811C13.4066 4.32282 13.2638 4.26367 13.1149 4.26367H4.13232V5.38649H12.5535V12.4356C12.2978 12.5843 12.074 12.7821 11.895 13.0175C11.716 13.253 11.5853 13.5215 11.5104 13.8076H7.98247C7.84583 13.2784 7.52086 12.8172 7.06849 12.5104C6.61612 12.2037 6.0674 12.0724 5.52518 12.1413C4.98296 12.2102 4.48448 12.4744 4.12316 12.8846C3.76184 13.2947 3.5625 13.8225 3.5625 14.3691C3.5625 14.9156 3.76184 15.4434 4.12316 15.8535C4.48448 16.2637 4.98296 16.5279 5.52518 16.5968C6.0674 16.6657 6.61612 16.5344 7.06849 16.2277C7.52086 15.9209 7.84583 15.4597 7.98247 14.9305H11.5104C11.6325 15.4123 11.9118 15.8396 12.3041 16.1449C12.6964 16.4501 13.1792 16.6159 13.6763 16.6159C14.1734 16.6159 14.6562 16.4501 15.0485 16.1449C15.4408 15.8396 15.7201 15.4123 15.8422 14.9305H17.0447C17.1936 14.9305 17.3364 14.8713 17.4417 14.766C17.547 14.6607 17.6062 14.5179 17.6062 14.3691V10.4392C17.6061 10.3631 17.5907 10.2879 17.5607 10.218Z"
                fill="#0097b2"
              />
            </svg>
            <span
              style={{ fontSize: "0.68rem", fontWeight: 700, color: "#000" }}
            >
              XL
            </span>
            <span style={{ fontSize: "0.6rem", color: "#777" }}>Size</span>
          </div>

          <div
            style={{ width: "1px", height: "32px", background: "#d0eef3" }}
          />

          {/* Variants */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2px",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 19 19" fill="none">
              <g clipPath="url(#clip0_328_1039)">
                <path
                  d="M11.0197 2.01758L16.6338 5.38604M16.6338 5.38604V11.5615M16.6338 5.38604L9.33544 9.87732M15.5109 14.93L9.33544 18.2985M9.33544 18.2985L3.15993 14.93M9.33544 18.2985V9.87732M2.03711 11.5615V5.19516L7.65121 2.01758M2.03711 5.38604L9.33544 9.87732"
                  stroke="#0097b2"
                  strokeWidth="0.544397"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_328_1039">
                  <rect
                    width="17.9651"
                    height="17.9651"
                    fill="white"
                    transform="translate(0.352539 0.894531)"
                  />
                </clipPath>
              </defs>
            </svg>
            <span
              style={{ fontSize: "0.68rem", fontWeight: 700, color: "#000" }}
            >
              8
            </span>
            <span style={{ fontSize: "0.6rem", color: "#777" }}>Vars</span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          style={{
            width: "100%",
            padding: "9px 0",
            borderRadius: "10px",
            border: "none",
            background: btnHovered ? GRADIENT_HOVER : GRADIENT,
            color: "#fff",
            fontSize: "0.82rem",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: btnHovered
              ? "0 4px 14px rgba(0,151,178,0.3)"
              : "0 2px 8px rgba(0,151,178,0.18)",
            transition: "all 0.2s ease",
            letterSpacing: "0.02em",
          }}
        >
          Start Selling
        </button>
      </div>
    </div>
  );
}

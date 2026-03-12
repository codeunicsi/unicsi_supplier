// components/products/ProductCard.jsx
import { useState, useEffect, useRef, useCallback } from "react";

const GRADIENT = "linear-gradient(135deg, #0097b2 0%, #7ed957 100%)";
const GRADIENT_HOVER = "linear-gradient(135deg, #007a91 0%, #65c040 100%)";

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);
  const [leftArrowHovered, setLeftArrowHovered] = useState(false);
  const [rightArrowHovered, setRightArrowHovered] = useState(false);
  const autoplayRef = useRef(null);

  const images = product.images || [product.image];
  const hasMultiple = images.length > 1;

  const nextImg = useCallback(() => {
    setCurrentImg((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImg = useCallback(() => {
    setCurrentImg((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (hovered && hasMultiple) {
      autoplayRef.current = setInterval(nextImg, 1800);
    } else {
      clearInterval(autoplayRef.current);
      if (!hovered) setCurrentImg(0);
    }
    return () => clearInterval(autoplayRef.current);
  }, [hovered, hasMultiple, nextImg]);

  const ArrowBtn = ({
    onClick,
    onMouseEnter,
    onMouseLeave,
    isHovered,
    side,
  }) => (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: "absolute",
        top: "50%",
        [side]: "8px",
        transform: "translateY(-50%)",
        zIndex: 10,
        width: "28px",
        height: "28px",
        borderRadius: "50%",
        border: "none",
        background: isHovered
          ? "rgba(0,151,178,0.95)"
          : "rgba(255,255,255,0.9)",
        color: isHovered ? "#fff" : "#0097b2",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        transition: "all 0.18s ease",
        padding: 0,
        opacity: hovered ? 1 : 0,
        pointerEvents: hovered ? "auto" : "none",
      }}
    >
      {side === "left" ? (
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      ) : (
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      )}
    </button>
  );

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setBtnHovered(false);
        setLeftArrowHovered(false);
        setRightArrowHovered(false);
      }}
      style={{
        width: "220px",
        borderRadius: "16px",
        border: hovered ? "1.5px solid #0097b2" : "1.5px solid #e0f4f7",
        background: "#fff",
        boxShadow: hovered
          ? "0 8px 28px rgba(0,151,178,0.18)"
          : "0 2px 12px rgba(0,151,178,0.08)",
        overflow: "hidden",
        transform: hovered
          ? "translateY(-4px) scale(1.01)"
          : "translateY(0) scale(1)",
        transition: "all 0.22s ease",
        cursor: "default",
        position: "relative",
      }}
    >
      {/* ── Image / Carousel ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "190px",
          overflow: "hidden",
        }}
      >
        {/* Sliding strip */}
        <div
          style={{
            display: "flex",
            width: `${images.length * 100}%`,
            height: "100%",
            transform: `translateX(-${(currentImg * 100) / images.length}%)`,
            transition: "transform 0.42s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          {images.map((src, i) => (
            <div
              key={i}
              style={{
                width: `${100 / images.length}%`,
                height: "100%",
                flexShrink: 0,
              }}
            >
              <img
                src={src}
                alt={product.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transform:
                    hovered && i === currentImg ? "scale(1.04)" : "scale(1)",
                  transition: "transform 0.45s ease",
                }}
              />
            </div>
          ))}
        </div>

        {/* Bottom gradient */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "60px",
            background: "linear-gradient(to top, rgba(0,0,0,0.3), transparent)",
            pointerEvents: "none",
          }}
        />

        {/* Left / Right arrows */}
        {hasMultiple && (
          <>
            <ArrowBtn
              onClick={prevImg}
              onMouseEnter={() => setLeftArrowHovered(true)}
              onMouseLeave={() => setLeftArrowHovered(false)}
              isHovered={leftArrowHovered}
              side="left"
            />
            <ArrowBtn
              onClick={nextImg}
              onMouseEnter={() => setRightArrowHovered(true)}
              onMouseLeave={() => setRightArrowHovered(false)}
              isHovered={rightArrowHovered}
              side="right"
            />
          </>
        )}

        {/* Dot indicators (multi-image only, shown on hover) */}
        {hasMultiple && (
          <div
            style={{
              position: "absolute",
              bottom: "9px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "4px",
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.2s ease",
              zIndex: 5,
            }}
          >
            {images.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrentImg(i)}
                style={{
                  width: i === currentImg ? "16px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  background:
                    i === currentImg ? "#fff" : "rgba(255,255,255,0.5)",
                  transition: "all 0.25s ease",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        )}

        {/* Exp. TP + Orders — hidden on hover when multi-image (replaced by dots) */}
        <div
          style={{
            position: "absolute",
            bottom: "8px",
            left: "10px",
            right: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            opacity: hovered && hasMultiple ? 0 : 1,
            transition: "opacity 0.18s ease",
            pointerEvents: "none",
            zIndex: 4,
          }}
        >
          <span
            style={{
              fontSize: "0.65rem",
              color: "#fff",
              fontWeight: 600,
              textShadow: "0 1px 4px rgba(0,0,0,0.5)",
            }}
          >
            Exp. TP
          </span>

          {/* Orders badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "3px",
              background: "rgba(255,255,255,0.92)",
              borderRadius: "20px",
              padding: "2px 7px",
            }}
          >
            <svg width="11" height="12" viewBox="0 0 12 13" fill="none">
              <g clipPath="url(#clip0)">
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
                <clipPath id="clip0">
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
              style={{ fontSize: "0.7rem", fontWeight: 700, color: "#0097b2" }}
            >
              {product.orders}
            </span>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ padding: "10px 12px 12px" }}>
        {/* Price */}
        <div style={{ marginBottom: "3px" }}>
          <span
            style={{
              fontSize: "1rem",
              fontWeight: 800,
              background: GRADIENT,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ₹ {product.price.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Title */}
        <h4
          style={{
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "#111",
            margin: "0 0 10px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {product.title}
        </h4>

        {/* CTA — slides in on hover */}
        <div
          style={{
            overflow: "hidden",
            maxHeight: hovered ? "50px" : "0px",
            opacity: hovered ? 1 : 0,
            transition: "max-height 0.25s ease, opacity 0.2s ease",
          }}
        >
          <button
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
            style={{
              width: "100%",
              padding: "9px 0",
              borderRadius: "10px",
              border: "none",
              background: btnHovered ? GRADIENT_HOVER : "#111",
              color: "#fff",
              fontSize: "0.85rem",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: btnHovered
                ? "0 4px 14px rgba(0,151,178,0.3)"
                : "0 2px 8px rgba(0,0,0,0.18)",
              transition: "all 0.2s ease",
              letterSpacing: "0.02em",
            }}
          >
            Start Selling
          </button>
        </div>
      </div>
    </div>
  );
}

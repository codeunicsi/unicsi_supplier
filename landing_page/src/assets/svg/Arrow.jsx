import React from "react";

export default function Arrow({ className = ""}) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M15.0596 6.6272L21.446 13.0137L15.0596 19.4001"
        stroke="white"
        strokeWidth="2.10427"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.55957 13.0139H21.267"
        stroke="white"
        strokeWidth="2.10427"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

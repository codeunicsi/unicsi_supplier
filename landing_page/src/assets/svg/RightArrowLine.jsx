import React from "react";

export default function RightArrowLine({ className = "" }) {
  return (
    <svg
      width="57"
      height="57"
      viewBox="0 0 57 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="-0.780367"
        y="0.780367"
        width="54.6257"
        height="54.6257"
        rx="17.9484"
        transform="matrix(-1 0 0 1 55.4393 0)"
        stroke="#8E8E8E"
        stroke-width="1.56073"
      />
      <path
        d="M35.4184 26.5321H16.4218V29.6536H35.4184L27.0467 38.0252L29.2538 40.2324L41.3936 28.0929L29.2538 15.9531L27.0467 18.1603L35.4184 26.5321Z"
        fill="#8E8E8E"
      />
    </svg>
  );
}
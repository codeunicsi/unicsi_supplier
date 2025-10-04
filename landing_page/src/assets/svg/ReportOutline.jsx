import React from "react";

export default function ReportOutline({size ="1.5rem", activePage}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.3445 1.31738H0.75V17.6824H14.25V7.04588M8.3445 1.31738L14.25 7.04588M8.3445 1.31738V7.04588H14.25M3.75 20.7499H17.25V10.2499M3 10.2499H12M3 6.49988H6M3 13.9999H12"
        stroke={ activePage === "Manage RTO / Returns" ? "#FFFFFF" : "#943A09"}
        stroke-linejoin="round"
      />
    </svg>
  );
}

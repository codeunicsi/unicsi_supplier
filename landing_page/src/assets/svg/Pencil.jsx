import React from "react";

export default function Pencil({ className = ""}) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8.952 23.2412L1.55273 26.1945L4.50602 18.7952M8.952 23.2412L24.3278 7.86537M8.952 23.2412L8.36046 19.3859L4.50602 18.7952M4.50602 18.7952L19.8819 3.4194M24.3278 7.86537L19.8819 3.4194M24.3278 7.86537L25.7083 6.48488C26.936 5.25716 26.936 3.26663 25.7083 2.0389C24.4806 0.811183 22.4901 0.811182 21.2623 2.0389L19.8819 3.4194"
        stroke="black"
        stroke-width="2.08252"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

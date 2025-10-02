import React from "react";

export default function Heart({ className = "", size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 33 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >

      <path
        data-figma-bg-blur-radius="1.10703"
        d="M3.02631 15.5224C-0.294773 11.0943 0.812257 4.45213 6.3474 2.23807C11.8825 0.0240103 15.2036 4.45213 16.3107 6.66618C17.4177 4.45213 21.8458 0.0240103 27.381 2.23807C32.9161 4.45213 32.9161 11.0943 29.595 15.5224C26.2739 19.9505 16.3107 28.8068 16.3107 28.8068C16.3107 28.8068 6.3474 19.9505 3.02631 15.5224Z"
        fill="black"
        fill-opacity="0.2"
        stroke="white"
        stroke-width="2.21406"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <defs>
        <clipPath
          id="bgblur_0_425_4434_clip_path"
          transform="translate(1.05039 0.579807)"
        >
          <path d="M3.02631 15.5224C-0.294773 11.0943 0.812257 4.45213 6.3474 2.23807C11.8825 0.0240103 15.2036 4.45213 16.3107 6.66618C17.4177 4.45213 21.8458 0.0240103 27.381 2.23807C32.9161 4.45213 32.9161 11.0943 29.595 15.5224C26.2739 19.9505 16.3107 28.8068 16.3107 28.8068C16.3107 28.8068 6.3474 19.9505 3.02631 15.5224Z" />
        </clipPath>
      </defs>
    </svg>
  );
}

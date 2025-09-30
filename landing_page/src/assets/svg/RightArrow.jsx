import React from "react";

export default function RightArrow({ className }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <foreignObject x="-180" y="-180" width="384" height="384">
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style="backdrop-filter:blur(90px);clip-path:url(#bgblur_0_328_2946_clip_path);height:100%;width:100%"
        ></div>
      </foreignObject>
      <g data-figma-bg-blur-radius="180">
        <rect
          x="0.25"
          y="23.75"
          width="23.5"
          height="23.5"
          rx="11.75"
          transform="rotate(-90 0.25 23.75)"
          fill="white"
        />
        <rect
          x="0.25"
          y="23.75"
          width="23.5"
          height="23.5"
          rx="11.75"
          transform="rotate(-90 0.25 23.75)"
          stroke="url(#paint0_radial_328_2946)"
          stroke-width="0.5"
        />
        <g opacity="0.8">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.0522 12.0009L14.55 7.46527C14.8829 7.12914 14.8829 6.58702 14.55 6.25089C14.3914 6.09032 14.175 6 13.9494 6C13.7237 6 13.5073 6.09032 13.3487 6.25089L8.25022 11.3928C7.91626 11.7286 7.91626 12.2714 8.25022 12.6072L13.3485 17.7491C13.5073 17.9097 13.7237 18 13.9494 18C14.175 18 14.3914 17.9097 14.5502 17.7491C14.8829 17.4129 14.8829 16.8708 14.5498 16.5347L10.0522 12.0009Z"
            fill="url(#paint1_radial_328_2946)"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.0522 12.0009L14.55 7.46527C14.8829 7.12914 14.8829 6.58702 14.55 6.25089C14.3914 6.09032 14.175 6 13.9494 6C13.7237 6 13.5073 6.09032 13.3487 6.25089L8.25022 11.3928C7.91626 11.7286 7.91626 12.2714 8.25022 12.6072L13.3485 17.7491C13.5073 17.9097 13.7237 18 13.9494 18C14.175 18 14.3914 17.9097 14.5502 17.7491C14.8829 17.4129 14.8829 16.8708 14.5498 16.5347L10.0522 12.0009Z"
            fill="#202020"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.0522 12.0009L14.55 7.46527C14.8829 7.12914 14.8829 6.58702 14.55 6.25089C14.3914 6.09032 14.175 6 13.9494 6C13.7237 6 13.5073 6.09032 13.3487 6.25089L8.25022 11.3928C7.91626 11.7286 7.91626 12.2714 8.25022 12.6072L13.3485 17.7491C13.5073 17.9097 13.7237 18 13.9494 18C14.175 18 14.3914 17.9097 14.5502 17.7491C14.8829 17.4129 14.8829 16.8708 14.5498 16.5347L10.0522 12.0009Z"
            fill="#202020"
            style="mix-blend-mode:overlay"
          />
        </g>
      </g>
      <defs>
        <clipPath
          id="bgblur_0_328_2946_clip_path"
          transform="translate(180 180)"
        >
          <rect
            x="0.25"
            y="23.75"
            width="23.5"
            height="23.5"
            rx="11.75"
            transform="rotate(-90 0.25 23.75)"
          />
        </clipPath>
        <radialGradient
          id="paint0_radial_328_2946"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(20.3797 0.169015 -0.0150755 20.3797 12 36)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FCA420" />
          <stop offset="1" stop-color="#943A09" />
        </radialGradient>
        <radialGradient
          id="paint1_radial_328_2946"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(11.3998 12) rotate(-180) scale(3.4 6)"
        >
          <stop stop-color="#CC8B8B" />
          <stop offset="1" stop-color="#A33B3B" />
        </radialGradient>
      </defs>
    </svg>
  );
}

import React from "react";

export default function CircleUpRightArrow({ className = "", size = 18 }) {
return (
    <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="M19.9936 38.8515C30.2543 38.8515 38.5722 30.5336 38.5722 20.2729C38.5722 10.0122 30.2543 1.69434 19.9936 1.69434C9.73294 1.69434 1.41504 10.0122 1.41504 20.2729C1.41504 30.5336 9.73294 38.8515 19.9936 38.8515Z"
            stroke="white"
            strokeWidth="1.80764"
        />
        <g transform="translate(13 13)">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                    d="M12.1465 2.12242L1.4209 12.8481M12.1465 2.12242C11.2077 1.18363 6.78007 2.10343 5.44297 2.12242M12.1465 2.12242C13.0853 3.06123 12.1656 7.48889 12.1465 8.82599"
                    stroke="white"
                    strokeWidth="1.80764"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </g>
    </svg>
);
}


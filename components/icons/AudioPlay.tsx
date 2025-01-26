import { SVGProps } from "react";

export const AudioPlay = (props?: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="74"
      height="75"
      viewBox="0 0 74 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Circle */}
      <rect
        x="0.711742"
        y="1.12599"
        width="72.576"
        height="72.576"
        rx="36.288"
        fill="#FFFEFE"
      />
      <rect
        x="0.711742"
        y="1.12599"
        width="72.576"
        height="72.576"
        rx="36.288"
        stroke="#D1D5DB"
        strokeWidth="1.152"
      />

      <path
        d="M29 37.5L45 46.5V28.5L29 37.5Z"
        fill="#1C274C"
        transform="scale(-1, 1) translate(-74, 0)"
      />
    </svg>
  );
};

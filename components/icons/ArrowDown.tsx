import { SVGProps } from "react";

export const ArrowDown = (props?: SVGProps<SVGSVGElement> ) => {
  return (
    <svg
      width="32"
      height="33"
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.6655 13.6937C21.1562 13.1843 20.3304 13.1843 19.821 13.6937L16.1783 17.3363L12.5356 13.6937C12.0263 13.1843 11.2005 13.1843 10.6911 13.6937C10.1818 14.203 10.1818 15.0288 10.6911 15.5382L15.2561 20.1031C15.7654 20.6125 16.5912 20.6125 17.1006 20.1031L21.6655 15.5382C22.1749 15.0288 22.1749 14.203 21.6655 13.6937Z"
        fill={props?.fill || "#FDFCFC"}
      />
    </svg>
  );
};

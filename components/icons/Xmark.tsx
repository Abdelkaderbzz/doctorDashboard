import { SVGProps } from "react";

export const Xmark = (props?: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      xmlns="http://www.w3.org/2000/svg"
      fill="#FDFCFC"
      {...props}
    >
      <path d="M19.8222 5.34386L13.0596 12.1064L19.8222 18.8689L18.7615 19.9296L11.999 13.167L5.23644 19.9296L4.17578 18.8689L10.9383 12.1064L4.17578 5.34386L5.23644 4.2832L11.999 11.0457L18.7615 4.2832L19.8222 5.34386Z" />
    </svg>
  );
};

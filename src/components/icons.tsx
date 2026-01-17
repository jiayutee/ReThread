import type { SVGProps } from "react";

export function ReThreadLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2l3.09 6.31L22 9.39l-4.91 4.26L18.18 22 12 18.31 5.82 22 7.09 13.65 2 9.39l6.91-1.08L12 2z"></path>
      <path d="M5.82 22l1.27-8.35L2 9.39l6.91-1.08L12 2l3.09 6.31L22 9.39l-4.91 4.26L18.18 22"></path>
      <path d="M12 18.31V2"></path>
    </svg>
  );
}

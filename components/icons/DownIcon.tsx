import { SVGProps } from 'react'

export const DownIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    {...props}
  >
    <path
      d="M14 5l-6.5 7L1 5"
      stroke="currentColor"
      strokeLinecap="square"
    ></path>
  </svg>
)

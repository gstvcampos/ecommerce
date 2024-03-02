import { SVGProps } from 'react'

export const PrevIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    viewBox="0 0 20 20"
    {...props}
  >
    <path d="m4 10 9 9 1.4-1.5L7 10l7.4-7.5L13 1z" />
  </svg>
)

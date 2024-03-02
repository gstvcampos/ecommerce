import { SVGProps } from 'react'

export const DeleteIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={26}
    viewBox="0 0 72 72"
    {...props}
  >
    <g
      style={{
        fill: 'none',
        stroke: 'currentColor',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeMiterlimit: 10,
        strokeWidth: 2,
      }}
    >
      <path d="M31 16v-4h10v4M51 25v31a4 4 0 0 1-4 4H25a4 4 0 0 1-4-4V25M17 16h38v4H17zM41 28.25V55M31 28.25V55" />
    </g>
  </svg>
)

import { SVGProps } from 'react'

export const UserIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={26}
    fill="none"
    viewBox="0 0 15 15"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="square"
      d="M10.5 3.498a2.999 2.999 0 0 1-3 2.998 2.999 2.999 0 1 1 3-2.998zm2 10.992h-10v-1.996a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1.997z"
      clipRule="evenodd"
    />
  </svg>
)

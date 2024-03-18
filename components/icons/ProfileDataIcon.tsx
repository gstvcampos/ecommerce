import { SVGProps } from 'react'

export const ProfileDataIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width={36}
    height={36}
    {...props}
  >
    <path d="M12 4a5 5 0 1 1-5 5 5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7 7 7 0 0 0-7-7zM22 30h-2v-5a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v5H2v-5a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7zM22 4h10v2H22zM22 9h10v2H22zM22 14h7v2h-7z" />
    <path fill="none" d="M0 0h32v32H0z" />
  </svg>
)

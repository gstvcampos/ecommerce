import { SVGProps } from 'react'

export const ImagePlaceholderIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    width={44}
    height={44}
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M4 3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
      clipRule="evenodd"
    />
  </svg>
)

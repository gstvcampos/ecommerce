import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
  return (
    <Link href={'/'} className="relative block h-12 w-24 md:h-20 md:w-40 px-3">
      <Image
        src="/logo.webp"
        alt="logo vasco store"
        fill
        priority
        className="object-contain"
      />
    </Link>
  )
}

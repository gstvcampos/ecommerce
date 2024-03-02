import { ArrowLeftIcon } from '@/components/icons/ArrowLeftIcon'
import Image from 'next/image'
import Link from 'next/link'

export default function HeaderAuth() {
  return (
    <header className="border-b-[1px] w-full">
      <div className="max-w-screen-xl mx-auto p-1 sm:p-2 lg:p-3 flex items-center justify-between">
        <Link href={'/'} className="inline-flex gap-2 items-center font-bold">
          <ArrowLeftIcon />
        </Link>
        <Link
          href={'/'}
          className="relative block h-12 w-24 md:h-20 md:w-40 px-3"
        >
          <Image
            src="/logo.webp"
            alt="logo vasco store"
            fill
            className="object-contain"
          />
        </Link>
        <span></span>
      </div>
    </header>
  )
}

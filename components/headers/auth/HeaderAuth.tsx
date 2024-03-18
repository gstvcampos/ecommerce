import { LogoIcon } from '@/components/icons/LogoIcon'
import Link from 'next/link'

export default function HeaderAuth() {
  return (
    <header className="border-b-[1px] w-full">
      <div className="max-w-screen-xl mx-auto p-1 sm:p-2 lg:p-3 flex items-center justify-center">
        <Link
          href={'/'}
          className="relative block"
          aria-label="Logo da Loja - Retorna à página inicial"
        >
          <LogoIcon />
        </Link>
      </div>
    </header>
  )
}

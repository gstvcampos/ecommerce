import Drawer from '@/components/Drawer'
import { LogoIcon } from '@/components/icons/LogoIcon'
import { MenuIcon } from '@/components/icons/MenuIcon'
import Link from 'next/link'
import NavButtons from './NavButtons'
import NavItems from './NavItems'
import SearchInput from './SearchInput'

export default function Header() {
  return (
    <div className="w-full">
      <header className="flex items-center justify-between max-w-screen-xl mx-auto min-h-16">
        <div className="flex-none md:hidden">
          <Drawer id="menu" title="todas as categorias" icon={<MenuIcon />}>
            <NavItems />
          </Drawer>
        </div>
        <Link
          href={'/'}
          className="px-8"
          aria-label="Logo da Loja - Retorna à página inicial"
        >
          <LogoIcon />
        </Link>
        <SearchInput className="hidden md:inline-block" />
        <NavButtons />
      </header>
      <nav className="md:bg-primary md:text-primary-content">
        <div className="md:hidden pb-2 px-4">
          <SearchInput />
        </div>
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="hidden md:inline-flex items-center mx-auto min-h-11">
            <NavItems />
          </div>
        </div>
      </nav>
    </div>
  )
}

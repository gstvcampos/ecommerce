import Drawer from '@/components/Drawer'
import { MenuIcon } from '../../../icons/MenuIcon'
import Logo from './Logo'
import NavButtons from './NavButtons'
import NavItems from './NavItems'
import SearchInput from './SearchInput'

export default function Header() {
  return (
    <div className="w-full border-b">
      <header className="flex items-center justify-between p-1 max-w-screen-xl mx-auto">
        <div className="flex-none md:hidden">
          <Drawer id="menu" title="todas as categorias" icon={<MenuIcon />}>
            <NavItems />
          </Drawer>
        </div>
        <Logo />
        <SearchInput className="hidden md:inline-block" />
        <NavButtons />
      </header>
      <nav className="p-1">
        <SearchInput className="md:hidden pb-2" />
        <div className="hidden md:inline-flex justify-center w-full">
          <NavItems />
        </div>
      </nav>
    </div>
  )
}

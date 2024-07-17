'use client'

import logout from '@/actions/auth/logout'
import { HomeIcon } from '@/components/icons/HomeIcon'
import { LogoIcon } from '@/components/icons/LogoIcon'
import { LogoutIcon } from '@/components/icons/LogoutIcon'
import { TagsIcon } from '@/components/icons/TagsIcon'
import { cn } from '@/lib/ultis'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Aside() {
  const pathname = usePathname()

  return (
    <aside className="w-64 min-w-64 rounded-br-3xl p-5 bg-base-300 shadow-lg">
      <LogoIcon className="mx-auto" />
      <div className="space-y-3 pt-8 pb-32">
        <Link
          replace={false}
          href="/admin"
          className={cn(
            'btn w-full justify-start hover:bg-secondary hover:text-secondary-content',
            pathname.includes('home') && 'bg-secondary text-secondary-content',
          )}
        >
          <HomeIcon className="h-6 w-6" />
          Home
        </Link>
        <Link
          replace={false}
          href="/admin/produtos"
          className={cn(
            'btn w-full justify-start hover:bg-secondary hover:text-secondary-content',
            pathname.includes('map') && 'bg-secondary text-secondary-content',
          )}
        >
          <TagsIcon className="h-6 w-6" />
          Produtos
        </Link>
      </div>
      <button
        onClick={() => logout()}
        className="btn w-full justify-start hover:bg-secondary hover:text-secondary-content"
      >
        <LogoutIcon className="h-6 w-6" />
        <span>Sair</span>
      </button>{' '}
    </aside>
  )
}

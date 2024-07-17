import { signOut } from '@/auth'
import { AddressIcon } from '@/components/icons/AddressIcon'
import { LogoutIcon } from '@/components/icons/LogoutIcon'
import { OrderIcon } from '@/components/icons/OrderIcon'
import { ProfileDataIcon } from '@/components/icons/ProfileDataIcon'
import MaxWidthWrapper from '@/components/layouts/MaxWidthWrapper'
import { revalidatePath } from 'next/cache'
import Link from 'next/link'

export default async function MinhaConta() {
  return (
    <MaxWidthWrapper className="grid md:grid-cols-2 gap-6 py-12 min-h-96 max-w-screen-md">
      <Link
        className="inline-flex items-center gap-4 border p-5 hover:underline"
        href={'/minha-conta/dados-pessoais'}
      >
        <ProfileDataIcon />
        Dados pessoais
      </Link>
      <Link
        className="inline-flex items-center gap-4 border p-5 hover:underline"
        href={'/minha-conta/enderecos'}
      >
        <AddressIcon />
        Endereços
      </Link>
      <Link
        className="inline-flex items-center gap-4 border p-5 hover:underline"
        href={'/minha-conta/pedidos'}
      >
        <OrderIcon />
        Pedidos
      </Link>
      <form
        action={async () => {
          'use server'
          await signOut()
          revalidatePath('/')
        }}
        className="inline-flex border p-5 hover:underline"
      >
        <button type="submit" className="inline-flex items-center gap-4">
          <LogoutIcon />
          Logout
        </button>
      </form>
    </MaxWidthWrapper>
  )
}

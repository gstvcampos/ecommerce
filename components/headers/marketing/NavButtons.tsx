import { auth, signOut } from '@/auth'
import { CartIcon } from '@/components/icons/CartIcon'
import { UserIcon } from '@/components/icons/UserIcon'
import { getCart } from '@/db/cart'
import { revalidatePath } from 'next/cache'
import Link from 'next/link'

export default async function NavButtons() {
  const session = await auth()
  const cart = await getCart()

  return (
    <div className="flex px-2 justify-end items-center">
      <div className="dropdown dropdown-hover dropdown-end">
        <div tabIndex={0} role="button " className="btn btn-ghost">
          <UserIcon />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 w-40"
        >
          {session ? (
            <>
              <li>
                <Link href={'/minha-conta/dados-pessoais'}>Minha conta</Link>
              </li>
              <li>
                <Link href={'/minha-conta/enderecos'}>Endereços</Link>
              </li>
              <li>
                <Link href={'/minha-conta/pedidos'}>Pedidos</Link>
              </li>
              <li>
                <form
                  action={async () => {
                    'use server'
                    await signOut()
                    revalidatePath('/')
                  }}
                  className="inline-flex items-center"
                >
                  <button type="submit">Sair</button>
                </form>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href={'/auth/login'}>Entrar</Link>
              </li>
              <li>
                <Link href={'/auth/cadastro'}>Cadastrar</Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <Link href={'/carrinho'} className="btn btn-ghost relative">
        <CartIcon />
        <span className="absolute z-10 bg-white rounded-full text-black top-0 right-0 text-sm px-1 font-bold">
          {cart?.size || 0}
        </span>
      </Link>
    </div>
  )
}

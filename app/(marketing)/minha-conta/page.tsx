import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'
import { signOut } from '@/auth'

export default async function MinhaConta() {
  return (
    <MaxWidthWrapper className="flex flex-col gap-6 py-12 min-h-96">
      <Link className="hover:underline" href={'/minha-conta/dados-pessoais'}>
        Dados pessoais
      </Link>
      <Link className="hover:underline" href={'/minha-conta/enderecos'}>
        Endereços
      </Link>
      <Link className="hover:underline" href={'/minha-conta/pedidos'}>
        Pedidos
      </Link>
      <form
        action={async () => {
          'use server'
          await signOut()
        }}
        className="inline-flex items-center"
      >
        <button type="submit">Sair</button>
      </form>
    </MaxWidthWrapper>
  )
}

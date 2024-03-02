import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { ArrowLeftIcon } from '@/components/icons/ArrowLeftIcon'
import Link from 'next/link'

export default async function Pedidos() {
  return (
    <MaxWidthWrapper className="py-12 min-h-96">
      <Link
        href={'/minha-conta'}
        className="flex items-center text-sm hover:underline ml-3"
      >
        <ArrowLeftIcon className="h-5" />
        Voltar
      </Link>
      <h2 className="py-4 font-bold text-2xl">Pedidos</h2>
      <div>listapedidos</div>
    </MaxWidthWrapper>
  )
}

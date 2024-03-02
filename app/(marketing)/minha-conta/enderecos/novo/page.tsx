import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { ArrowLeftIcon } from '@/components/icons/ArrowLeftIcon'
import Link from 'next/link'
import FormCreateAddress from './FormCreateAddress'

export default async function NewAddress() {
  return (
    <MaxWidthWrapper className="py-12 min-h-96">
      <Link
        href={'/minha-conta/enderecos'}
        className="flex items-center text-sm hover:underline ml-3"
      >
        <ArrowLeftIcon className="h-5" />
        Voltar
      </Link>
      <h2 className="py-4 font-bold text-2xl">Novo endereço</h2>
      <div>
        <FormCreateAddress />
      </div>
    </MaxWidthWrapper>
  )
}

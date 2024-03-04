import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import FormCreateAddress from '@/components/forms/marketing/FormCreateAddress'
import { ArrowLeftIcon } from '@/components/icons/ArrowLeftIcon'
import Link from 'next/link'

export default async function NewAddress() {
  return (
    <MaxWidthWrapper className="py-12 min-h-96 max-w-xl">
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

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { ArrowLeftIcon } from '@/components/icons/ArrowLeftIcon'
import { getUserById } from '@/db/user'
import Link from 'next/link'
import { auth } from '@/auth'
import FormEditUser from './FormEditUser'

export default async function DadosPessoais() {
  const session = await auth()
  const user = await getUserById(session?.user.id)

  return (
    <MaxWidthWrapper className="py-12 min-h-96">
      <Link
        href={'/minha-conta'}
        className="flex items-center text-sm hover:underline ml-3"
      >
        <ArrowLeftIcon className="h-5" />
        Voltar
      </Link>
      <h2 className="py-4 font-bold text-2xl">Dados pessoais</h2>
      <FormEditUser user={user} />
    </MaxWidthWrapper>
  )
}

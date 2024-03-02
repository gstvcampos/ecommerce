import { auth } from '@/auth'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { ArrowLeftIcon } from '@/components/icons/ArrowLeftIcon'
import { prisma } from '@/db/prisma'
import Link from 'next/link'
import DeleteAddressButton from './DeleteAddressButton'

export default async function Enderecos() {
  const session = await auth()
  const userAddresses = await prisma.address.findMany({
    where: { userId: session?.user.id },
  })

  return (
    <MaxWidthWrapper className="py-12 min-h-96">
      <Link
        href={'/minha-conta'}
        className="flex items-center text-sm hover:underline ml-3"
      >
        <ArrowLeftIcon className="h-5" />
        Voltar
      </Link>
      <div className="flex items-center justify-between">
        <h2 className="py-4 font-bold text-2xl">Endereços</h2>
        <Link className="btn btn-outline" href={'/minha-conta/enderecos/novo'}>
          Adicionar endereço
        </Link>
      </div>
      <div className="flex gap-4 p-4 flex-wrap">
        {userAddresses.map((address) => (
          <div key={address.id} className="border h-44 w-56 p-4 relative">
            <div>
              <p className="font-bold">{address.city} </p>
              <p className="text-sm">{address.neighborhood}</p>
              <p className="text-sm">
                {address.street} <span>{address.number}</span>
              </p>
            </div>
            <DeleteAddressButton
              addressId={address.id}
              userId={address.userId}
            />
          </div>
        ))}
      </div>
    </MaxWidthWrapper>
  )
}

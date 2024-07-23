import { CartIcon } from '@/components/icons/CartIcon'
import { UserIcon } from '@/components/icons/UserIcon'
import MaxWidthWrapper from '@/components/layouts/MaxWidthWrapper'
import { prisma } from '@/db/prisma'
import { formatPrice } from '@/lib/ultis'

export default async function AdminHome() {
  const anonymousCartsCount = await prisma.cart.count({
    where: { userId: undefined },
  })
  const registeredUsersCount = await prisma.user.count({
    where: { role: 'USER' },
  })

  let totalValue = 0

  const carts = await prisma.cart.findMany({
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  })

  carts.forEach((cart) => {
    cart.items.forEach((item) => {
      totalValue += item.quantity * item.product.price
    })
  })

  return (
    <MaxWidthWrapper className="py-8">
      <h1 className="text-3xl pb-8 font-bold">Home</h1>
      <div className="flex gap-5 justify-center">
        <div className="text-center rounded-3xl shadow-lg flex overflow-hidden">
          <div className="bg-blue-500 w-40 h-40 flex items-center justify-center text-9xl">
            <CartIcon className="w-20 h-20" />
          </div>
          <div className="w-40 bg-base-200 flex flex-col justify-center px-4">
            <p className="text-5xl pb-2">{anonymousCartsCount}</p>
            <h2 className="text-sm text-gray-400">
              Carrinhos <br />
              anonimos
            </h2>
          </div>
        </div>

        <div className="text-center rounded-3xl shadow-lg flex overflow-hidden">
          <div className="bg-red-500 w-40 h-40 flex items-center justify-center text-9xl">
            <UserIcon className="w-20 h-20" />
          </div>
          <div className="w-40 bg-base-200 flex flex-col justify-center px-4">
            <p className="text-5xl pb-2">{registeredUsersCount}</p>
            <h2 className="text-sm text-gray-400">
              Usuarios <br />
              cadastrados
            </h2>
          </div>
        </div>

        <div className="text-center rounded-3xl shadow-lg flex overflow-hidden">
          <div className="bg-green-500 w-40 h-40 flex items-center justify-center text-8xl">
            $
          </div>
          <div className="bg-base-200 flex flex-col justify-center px-4">
            <p className="text-5xl pb-2">{formatPrice(Number(totalValue))}</p>
            <h2 className="text-sm text-gray-400">Valor total nos carrinhos</h2>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

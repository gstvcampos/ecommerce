import setProductQuantity from '@/actions/setProductQuantity'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import CartEntry from '@/components/cart/CartEntry'
import ResumeCart from '@/components/cart/ResumeCart'
import { getCart } from '@/db/cart'
import Link from 'next/link'

export default async function CartPage() {
  const cart = await getCart()
  return (
    <MaxWidthWrapper className="py-8 flex justify-between flex-wrap">
      <div className="w-full md:w-2/3 p-4">
        <h2 className="text-2xl font-bold">Meu Carrinho</h2>
        {cart?.items.map((cartItem) => (
          <CartEntry
            cartItem={cartItem}
            key={cartItem.id}
            setProductQuantity={setProductQuantity}
          />
        ))}
        {!cart?.items.length && <div>carrinho vazio</div>}
      </div>
      <div className="w-full md:w-1/3 p-4 gap-4 flex flex-col">
        <ResumeCart subTotal={cart?.subtotal || 0} />
        <Link href={'/pagamento'} className="btn btn-primary w-full">
          IR PARA PAGAMENTO
        </Link>
        <Link href={'/'} className="btn btn-primary w-full">
          CONTINUAR COMPRANDO
        </Link>
      </div>
    </MaxWidthWrapper>
  )
}

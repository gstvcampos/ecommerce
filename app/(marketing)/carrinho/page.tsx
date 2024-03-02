import setProductQuantity from '@/actions/setProductQuantity'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { getCart } from '@/db/cart'
import CartEntry from './CartEntry'
import Redirect from './Redirect'
import ResumeCart from './ResumeCart'

export default async function CartPage() {
  const cart = await getCart()
  return (
    <MaxWidthWrapper className="py-8 flex justify-between flex-wrap">
      <div className="w-2/3 p-4">
        <h2 className="text-xl">Meu Carrinho</h2>
        {cart?.items.map((cartItem) => (
          <CartEntry
            cartItem={cartItem}
            key={cartItem.id}
            setProductQuantity={setProductQuantity}
          />
        ))}
        {!cart?.items.length && <div>carrinho vazio</div>}
      </div>
      <div className="w-1/3 p-4 gap-4 flex flex-col">
        <ResumeCart subTotal={cart?.subtotal || 0} />
        <Redirect />
      </div>
    </MaxWidthWrapper>
  )
}

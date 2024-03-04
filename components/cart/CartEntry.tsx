'use client'

import { CartItemWithProduct } from '@/db/cart'
import { formatPrice } from '@/lib/ultis'
import Image from 'next/image'
import Link from 'next/link'
import { useTransition } from 'react'

interface CartEntryProps {
  cartItem: CartItemWithProduct
  setProductQuantity: (productId: string, quantity: number) => Promise<void>
}

export default function CartEntry({
  cartItem: { product, quantity },
  setProductQuantity,
}: CartEntryProps) {
  const [isPending, startTransition] = useTransition()

  const quantityOptions: JSX.Element[] = []
  for (let i = 1; i <= 99; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>,
    )
  }
  return (
    <>
      <div className="divider"></div>
      <div className="flex flex-wrap justify-between gap-3">
        <div className="flex gap-4">
          <div className="relative h-32 w-24">
            <Image
              src={product.imageUrls[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <Link href={'/products/' + product.id} className="font-bold">
              {product.name}
            </Link>
            <div className="flex items-center py-2 gap-2">
              <div>{formatPrice(product.price)}</div>
              <div className="my-1 flex items-center gap-2">
                <select
                  className="select-bordered select select-sm max-w-16"
                  defaultValue={quantity}
                  onChange={(e) => {
                    const newQuantity = parseInt(e.currentTarget.value)
                    startTransition(async () => {
                      await setProductQuantity(product.id, newQuantity)
                    })
                  }}
                >
                  <option value={0}>0 (Remover)</option>
                  {quantityOptions}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div>
          {formatPrice(product.price * quantity)}
          {isPending && <span className="loading loading-spinner loading-sm" />}
        </div>
      </div>
    </>
  )
}

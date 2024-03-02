'use client'

import { useTransition } from 'react'

interface AddToCartButtonProps {
  productId: string
  incrementProductQuantity: (productId: string) => Promise<void>
}

export default function AddToCartButton({
  productId,
  incrementProductQuantity,
}: AddToCartButtonProps) {
  const [isPending, startTransition] = useTransition()

  return (
    <button
      className="btn btn-outline"
      onClick={() => {
        startTransition(async () => {
          await incrementProductQuantity(productId)
        })
      }}
    >
      COMPRAR
      {isPending && <span className="loading loading-spinner loading-md" />}
    </button>
  )
}

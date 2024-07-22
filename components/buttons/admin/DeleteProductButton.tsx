'use client'

import { DeleteIcon } from '@/components/icons/DeleteIcon'
import { DialogContext } from '@/contexts/DialogContext'
import { useContext, useTransition } from 'react'

export default function DeleteProductButton({
  productId,
}: {
  productId: string
}) {
  const { toggleDelProduct } = useContext(DialogContext)
  const [isPending, startTransition] = useTransition()

  const handleDeleteClick = () => {
    startTransition(() => {
      console.log(productId)
    })
  }

  return (
    <button
      onClick={handleDeleteClick}
      disabled={isPending}
      className="inline-block w-10"
    >
      {isPending ? (
        <span className="loading loading-ring loading-lg"></span>
      ) : (
        <button onClick={toggleDelProduct}>
          <DeleteIcon className="w-8 h-8" />
        </button>
      )}
    </button>
  )
}

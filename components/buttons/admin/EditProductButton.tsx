'use client'

import { EditIcon } from '@/components/icons/EditIcon'
import { DialogContext } from '@/contexts/DialogContext'
import { useContext, useTransition } from 'react'

export default function EditProductButton({
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
          <EditIcon className="w-8 h-8" />
        </button>
      )}
    </button>
  )
}

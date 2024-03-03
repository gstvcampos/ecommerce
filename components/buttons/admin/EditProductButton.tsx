'use client'

import { EditIcon } from '@/components/icons/EditIcon'
import { useTransition } from 'react'

export default function EditProductButton({
  productId,
}: {
  productId: string
}) {
  const [isPending, startTransition] = useTransition()

  const handleDeleteClick = () => {
    startTransition(() => {
      // action aqui
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
        <EditIcon className="w-8 h-8" />
      )}
    </button>
  )
}

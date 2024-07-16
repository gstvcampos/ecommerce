'use client'

import { deleteAddress } from '@/actions/marketing/deleteAddress'
import { DeleteIcon } from '@/components/icons/DeleteIcon'
import { useTransition } from 'react'

export default function DeleteAddressButton({
  addressId,
  userId,
}: {
  addressId: string
  userId: string
}) {
  const [isPending, startTransition] = useTransition()

  const handleDeleteClick = () => {
    startTransition(() => {
      deleteAddress(addressId, userId)
    })
  }

  return (
    <button
      onClick={handleDeleteClick}
      disabled={isPending}
      className="absolute bottom-2 right-2"
    >
      {isPending ? (
        <span className="loading loading-ring loading-lg"></span>
      ) : (
        <DeleteIcon className="w-8 h-8" />
      )}
    </button>
  )
}

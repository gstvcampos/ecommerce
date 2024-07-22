'use client'

import { DeleteIcon } from '@/components/icons/DeleteIcon'
import DeleteProductModal from '@/components/modals/DeleteProductModal'
import { DialogContext } from '@/contexts/DialogContext'
import { useContext } from 'react'

export default function DeleteProductButton({
  productId,
}: {
  productId: string
}) {
  const { toggleDelProduct } = useContext(DialogContext)

  return (
    <>
      <button onClick={toggleDelProduct}>
        <DeleteIcon className="w-8 h-8" />
      </button>
      <DeleteProductModal productId={productId} />
    </>
  )
}

'use client'

import { DeleteIcon } from '@/components/icons/DeleteIcon'
import DeleteProductModal from '@/components/modals/DeleteProductModal'
import { DialogContext } from '@/contexts/DialogContext'
import { Product } from '@prisma/client'
import { useContext } from 'react'

export default function DeleteProductButton({ product }: { product: Product }) {
  const { toggleDelProduct } = useContext(DialogContext)

  return (
    <>
      <button onClick={toggleDelProduct}>
        <DeleteIcon className="w-8 h-8" />
      </button>
      <DeleteProductModal product={product} />
    </>
  )
}

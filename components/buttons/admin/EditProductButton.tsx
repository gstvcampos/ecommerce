'use client'

import { EditIcon } from '@/components/icons/EditIcon'
import EditProductModal from '@/components/modals/EditProductModal'
import { DialogContext } from '@/contexts/DialogContext'
import { Product } from '@prisma/client'
import { useContext } from 'react'

export default function EditProductButton({ product }: { product: Product }) {
  const { toggleDelProduct } = useContext(DialogContext)

  return (
    <>
      <button onClick={toggleDelProduct} className="inline-block w-10">
        <EditIcon className="w-8 h-8" />
      </button>
      <EditProductModal product={product} />
    </>
  )
}

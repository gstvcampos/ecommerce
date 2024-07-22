'use client'

import { DialogContext } from '@/contexts/DialogContext'
import { Product } from '@prisma/client'
import { useContext } from 'react'
import FormEditProduct from '../forms/admin/FormEditProduct'
import { CloseIcon } from '../icons/CloseIcon'

export default function EditProductModal({ product }: { product: Product }) {
  const { openEditProduct, toggleEditProduct } = useContext(DialogContext)

  return (
    <>
      {openEditProduct && (
        <div className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-50">
          <div className="flex min-h-screen items-center justify-center">
            <div className="rounded-lg bg-base-100 p-6">
              <div className="flex justify-between items-center pb-6">
                <h3 className="text-center text-xl font-bold text-primary">
                  Editar Produto
                </h3>
                <button onClick={toggleEditProduct}>
                  <CloseIcon className="h-8 w-8" />
                </button>
              </div>

              <FormEditProduct product={product} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

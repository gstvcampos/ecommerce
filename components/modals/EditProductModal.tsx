'use client'

import { DialogContext } from '@/contexts/DialogContext'
import { Product } from '@prisma/client'
import { useContext } from 'react'
import FormEditProduct from '../forms/admin/FormEditProduct'

export default function EditProductModal({ product }: { product: Product }) {
  const { openEditProduct } = useContext(DialogContext)

  return (
    <>
      {openEditProduct && (
        <div className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-50">
          <div className="flex min-h-screen items-center justify-center">
            <div className="rounded-lg bg-zinc-900 p-6">
              <h3 className="mb-4 text-center text-xl font-bold text-gray-300">
                Editar Produto
              </h3>
              <FormEditProduct product={product} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

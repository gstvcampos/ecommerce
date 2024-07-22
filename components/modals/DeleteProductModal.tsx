'use client'

import { deleteProduct } from '@/actions/admin/deleteProduct'
import { DialogContext } from '@/contexts/DialogContext'
import { Product } from '@prisma/client'
import { useContext } from 'react'
import toast from 'react-hot-toast'

export default function DeleteProductModal({ product }: { product: Product }) {
  const { openDelProduct, toggleDelProduct } = useContext(DialogContext)

  const handleDelete = async (productId: string) => {
    deleteProduct(productId).then((data) => {
      if (data?.error) {
        toast.error(data.error)
        toggleDelProduct()
      }

      if (data?.success) {
        toast.success(data.success)
        toggleDelProduct()
      }
    })
  }

  return (
    <>
      {openDelProduct && (
        <div className="fixed inset-0 z-10 overflow-y-auto bg-black/50">
          <div className="flex min-h-screen items-center justify-center">
            <div className="rounded-lg bg-base-100 p-6">
              <h3 className="text-center font-bold pb-3">
                EXCLUIR <br />
                {product.name}
              </h3>
              <div className="flex justify-between">
                <button
                  className="rounded bg-error text-primary px-4 py-2"
                  onClick={toggleDelProduct}
                >
                  Cancelar
                </button>
                <button
                  className="rounded bg-success text-primary px-4 py-2"
                  onClick={() => handleDelete(product.id)}
                >
                  Deletar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

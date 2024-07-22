'use client'

import { DialogContext } from '@/contexts/DialogContext'
import { useContext } from 'react'

export default function DeleteProductModal({
  productId,
}: {
  productId: string
}) {
  const { openDelProduct, toggleDelProduct } = useContext(DialogContext)

  const handleDelete = async (id: string) => {
    console.log(id)
  }

  return (
    <>
      {openDelProduct && (
        <div className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-50">
          <div className="flex min-h-screen items-center justify-center">
            <div className="rounded-lg bg-zinc-900 p-6">
              <h3 className="mb-4 text-center text-xl font-bold text-gray-300">
                Excluir cliente
              </h3>
              <p className="mb-4 text-center text-sm text-gray-300">
                Tem certeza de que quer excluir esse produto?
              </p>
              <div className="flex justify-between">
                <button
                  className="text-white:bg-red-900 rounded bg-red-600 px-4 py-2"
                  onClick={toggleDelProduct}
                >
                  Cancelar
                </button>
                <button
                  className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-900"
                  onClick={() => handleDelete(productId)}
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

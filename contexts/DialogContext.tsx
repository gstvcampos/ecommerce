'use client'

import { ReactNode, createContext, useState } from 'react'

interface DialogContextType {
  openDelProduct: boolean
  toggleDelProduct: () => void
  openEditProduct: boolean
  toggleEditProduct: () => void
}

export const DialogContext = createContext({} as DialogContextType)

export function DialogProvider({ children }: { children: ReactNode }) {
  const [openDelProduct, setOpenDelProduct] = useState(false)
  const [openEditProduct, setOpenEditProduct] = useState(false)

  function toggleDelProduct() {
    setOpenDelProduct((state) => !state)
  }

  function toggleEditProduct() {
    setOpenEditProduct((state) => !state)
  }

  return (
    <DialogContext.Provider
      value={{
        openDelProduct,
        toggleDelProduct,
        openEditProduct,
        toggleEditProduct,
      }}
    >
      {children}
    </DialogContext.Provider>
  )
}

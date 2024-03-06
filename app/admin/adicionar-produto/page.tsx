'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import FormAddProduct from '@/components/forms/admin/FormAddProduct'

export default function AddProduct() {
  return (
    <MaxWidthWrapper className="py-8">
      <h1 className="mb-3 text-lg font-bold">add Product</h1>
      <FormAddProduct />
    </MaxWidthWrapper>
  )
}

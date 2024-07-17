import FormAddProduct from '@/components/forms/admin/FormAddProduct'
import MaxWidthWrapper from '@/components/layouts/MaxWidthWrapper'

export default function AddProduct() {
  return (
    <MaxWidthWrapper className="py-12 min-h-96 max-w-xl">
      <h1 className="mb-3 text-lg font-bold">add Product</h1>
      <FormAddProduct />
    </MaxWidthWrapper>
  )
}

import DropdownSort from '@/components/layouts/DropdownSort'
import MaxWidthWrapper from '@/components/layouts/MaxWidthWrapper'
import PaginationBar from '@/components/layouts/PaginationBar'
import ProductCard from '@/components/product/ProductCard'
import { countSearchProducts, getSearchProducts } from '@/db/products'
import { calcPagination } from '@/lib/ultis'

interface SearchPageProps {
  params: {
    search: string
  }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function CategoryPage({
  params: { search },
  searchParams,
}: SearchPageProps) {
  const page = Number(searchParams?.page) || 1

  let sort = searchParams?.sort
  if (sort instanceof Array) {
    sort = sort[0]
  }
  if (sort !== 'asc' && sort !== 'desc') {
    sort = undefined
  }

  const countItems = await countSearchProducts(search)
  const { totalPages, itemsPeerPage, skip } = calcPagination(page, countItems)
  const products = await getSearchProducts(search, itemsPeerPage, skip, sort)

  return (
    <>
      <MaxWidthWrapper>
        <div className="flex py-4 justify-between">
          <h2>Você pesquisou por: {search}</h2>
          <div className="flex items-center">
            <DropdownSort searchParams={searchParams} />
          </div>
        </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper className="pt-4">
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
        <PaginationBar totalPages={totalPages} searchParams={searchParams} />
      </MaxWidthWrapper>
    </>
  )
}

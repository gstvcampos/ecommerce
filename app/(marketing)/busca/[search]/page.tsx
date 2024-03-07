import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import PaginationBar from '@/components/PaginationBar'
import ProductCard from '@/components/ProductCard'
import DrawerFilter from '@/components/search/DrawerFilter'
import DropdownSort from '@/components/search/DropdownSort'
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
  const countItems = await countSearchProducts(search)
  const { totalPages, itemsPeerPage, skip } = calcPagination(page, countItems)
  const products = await getSearchProducts(search, itemsPeerPage, skip)

  return (
    <>
      <MaxWidthWrapper>
        <div className="flex py-4 justify-between">
          <h2>Você pesquisou por: {search}</h2>
          <div className="flex items-center">
            <DrawerFilter searchParams={searchParams} />
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

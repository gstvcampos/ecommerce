import Breadcrumbs from '@/components/Breadcrumbs'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import PaginationBar from '@/components/PaginationBar'
import ProductCard from '@/components/ProductCard'
import DrawerFilter from '@/components/search/DrawerFilter'
import DropdownSort from '@/components/search/DropdownSort'
import { countProducts, getProducts } from '@/db/products'
import { calcPagination } from '@/lib/ultis'

interface CategoryPageProps {
  params: {
    slug: string[]
  }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function CategoryPage({
  params: { slug },
  searchParams,
}: CategoryPageProps) {
  const page = Number(searchParams?.page) || 1
  const [department, category] = slug

  const countItems = await countProducts(department, category)
  const { skip, totalPages, itemsPeerPage } = calcPagination(page, countItems)
  const products = await getProducts(department, category, itemsPeerPage, skip)

  return (
    <>
      <MaxWidthWrapper>
        <Breadcrumbs items={slug} />
        <div className="flex justify-between items-center">
          <h2 className="uppercase">{slug[0]}</h2>
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

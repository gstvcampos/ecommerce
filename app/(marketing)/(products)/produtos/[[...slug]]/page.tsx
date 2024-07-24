import Breadcrumbs from '@/components/layouts/Breadcrumbs'
import DrawerFilter from '@/components/layouts/DrawerFilter'
import DropdownSort from '@/components/layouts/DropdownSort'
import MaxWidthWrapper from '@/components/layouts/MaxWidthWrapper'
import PaginationBar from '@/components/layouts/PaginationBar'
import ProductCard from '@/components/product/ProductCard'
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
  const category = searchParams?.category?.toString()
  const [department] = slug

  let sort = searchParams?.sort
  if (sort instanceof Array) {
    sort = sort[0]
  }
  if (sort !== 'asc' && sort !== 'desc') {
    sort = undefined
  }

  const countItems = await countProducts(department, category)
  const { skip, totalPages, itemsPeerPage } = calcPagination(page, countItems)
  const products = await getProducts(
    department,
    category,
    itemsPeerPage,
    skip,
    sort,
  )

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

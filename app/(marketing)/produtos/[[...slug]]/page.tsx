import Breadcrumbs from '@/components/Breadcrumbs'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import PaginationBar from '@/components/PaginationBar'
import ProductCard from '@/components/ProductCard'
import DrawerFilter from '@/components/search/DrawerFilter'
import DropdownSort from '@/components/search/DropdownSort'
import { getProducts } from '@/db/products'

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
  const pageSize = 3
  const skip = Number(searchParams?.page || 1 - 1) * pageSize
  const products = await getProducts(slug[0], slug[1], pageSize, skip)

  const totalItemsCount = await getProducts(slug[0], slug[1])
  const totalPages = Math.ceil(totalItemsCount.length / pageSize)

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
      <MaxWidthWrapper className="pb-20 pt-4">
        <ul className="flex flex-wrap gap-4 md:gap-6 w-full">
          {products.map((product) => (
            <li
              key={product.id}
              className="w-1/3 md:w-1/4 flex-grow shrink-0 max-w-96"
            >
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
        <PaginationBar totalPages={totalPages} searchParams={searchParams} />
      </MaxWidthWrapper>
    </>
  )
}

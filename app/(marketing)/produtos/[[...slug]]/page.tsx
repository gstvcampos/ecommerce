import Breadcrumbs from '@/components/Breadcrumbs'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import PaginationBar from '@/components/PaginationBar'
import ProductCard from '@/components/ProductCard'
import DrawerFilter from '@/components/search/DrawerFilter'
import DropdownSort from '@/components/search/DropdownSort'
import { countProducts, getProducts } from '@/db/products'

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
  const itemsPeerPage = 3
  const skip = Number(page - 1) * itemsPeerPage
  const [department, category] = slug

  const products = await getProducts(department, category, itemsPeerPage, skip)
  const totalItemsCount = await countProducts(department, category)
  const totalPages = Math.ceil(totalItemsCount / itemsPeerPage)

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

import Breadcrumbs from '@/components/Breadcrumbs'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductCard from '@/components/ProductCard'
import DrawerSearchFilter from '@/components/search/DrawerSearchFilter'
import DropdownSearchSort from '@/components/search/DropdownSearchSort'
import { getProducts } from '@/db/products'

interface CategoryPageProps {
  params: {
    slug: string[]
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const products = await getProducts(params.slug[0], params.slug[1])

  return (
    <>
      <MaxWidthWrapper>
        <Breadcrumbs items={params.slug} />
        <div className="flex justify-between items-center">
          <h2 className="uppercase">{params.slug[0]}</h2>
          <div className="flex items-center">
            <DrawerSearchFilter />
            <DropdownSearchSort />
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
      </MaxWidthWrapper>
    </>
  )
}

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
    <MaxWidthWrapper className="pb-20">
      <Breadcrumbs items={params.slug} />
      <div className="flex justify-between items-center">
        <h2 className="uppercase">{params.slug[0]}</h2>
        <div className="flex items-center">
          <DrawerSearchFilter />
          <DropdownSearchSort />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </MaxWidthWrapper>
  )
}

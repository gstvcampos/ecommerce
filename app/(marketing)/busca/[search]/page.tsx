import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductCard from '@/components/ProductCard'
import DrawerSearchFilter from '@/components/search/DrawerSearchFilter'
import DropdownSearchSort from '@/components/search/DropdownSearchSort'
import { getSearchProducts } from '@/db/products'

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
  const sortParams = searchParams?.sort
  const selectSize = searchParams?.size
  const selectCategory = searchParams?.category
  const products = await getSearchProducts(search)

  return (
    <>
      <MaxWidthWrapper>
        <div className="flex py-4 justify-between">
          <h2>Você pesquisou por: {search}</h2>
          <div className="flex items-center">
            <DrawerSearchFilter
              selectCategory={selectCategory}
              selectSize={selectSize}
              selectSort={sortParams}
            />
            <DropdownSearchSort
              selectCategory={selectCategory}
              selectSize={selectSize}
            />
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

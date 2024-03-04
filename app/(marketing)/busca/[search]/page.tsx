import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductCard from '@/components/ProductCard'
import DrawerSearchFilter from '@/components/search/DrawerSearchFilter'
import DropdownSearchSort from '@/components/search/DropdownSearchSort'
import { prisma } from '@/db/prisma'
import { notFound } from 'next/navigation'
import { cache } from 'react'

interface SearchPageProps {
  params: {
    search: string
  }
  searchParams?: { [key: string]: string | string[] | undefined }
}

const getProducts = cache(async (search: string) => {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { department: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } },
      ],
    },
  })
  if (!products) notFound()
  return products
})

export default async function CategoryPage({
  params: { search },
  searchParams,
}: SearchPageProps) {
  const sortParams = searchParams?.sort
  const filterParams = searchParams?.filter
  console.log(sortParams)
  console.log(filterParams)
  const products = await getProducts(search)

  return (
    <MaxWidthWrapper>
      <div className="flex py-4 justify-between">
        <h2>Você pesquisou por: {search}</h2>
        <div className="flex items-center">
          <DrawerSearchFilter />
          <DropdownSearchSort />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </MaxWidthWrapper>
  )
}

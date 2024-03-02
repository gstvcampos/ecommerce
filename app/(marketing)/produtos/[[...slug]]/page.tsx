import Breadcrumbs from '@/components/Breadcrumbs'
import Drawer from '@/components/Drawer'
import Dropdown from '@/components/Dropdown'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductCard from '@/components/ProductCard'
import { prisma } from '@/db/prisma'
import { notFound } from 'next/navigation'
import { cache } from 'react'

interface CategoryPageProps {
  params: {
    slug: string[]
  }
}

const getProducts = cache(async (department: string, category?: string) => {
  const products = await prisma.product.findMany({
    where: {
      department,
      category,
    },
  })
  if (!products) notFound()
  return products
})

export default async function CategoryPage({ params }: CategoryPageProps) {
  const products = await getProducts(params.slug[0], params.slug[1])

  return (
    <MaxWidthWrapper className="pb-20">
      <Breadcrumbs items={params.slug} />
      <div className="flex justify-between items-center">
        <h2 className="uppercase">{params.slug[0]}</h2>
        <div className="flex items-center">
          <Drawer id="filter" title="filtrar por" label="Filtrar">
            <ul>
              <li>
                <details open>
                  <summary>Tamanho</summary>
                  <ul>
                    <li>
                      <a>P</a>
                    </li>
                    <li>
                      <a>M</a>
                    </li>
                    <li>
                      <a>G</a>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <details open>
                  <summary>Estilo</summary>
                  <ul>
                    <li>
                      <a>Casual</a>
                    </li>
                    <li>
                      <a>Regata</a>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </Drawer>
          <Dropdown
            label="Ordenar"
            items={[
              'Preço crescente',
              'Preço decrescente',
              'Promoções',
              'Mais procurados',
            ]}
          />
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

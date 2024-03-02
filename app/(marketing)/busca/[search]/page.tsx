import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductCard from '@/components/ProductCard'
import { prisma } from '@/db/prisma'
import { notFound } from 'next/navigation'
import { cache } from 'react'

interface SearchPageProps {
  params: {
    search: string
  }
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
}: SearchPageProps) {
  const products = await getProducts(search)

  return (
    <MaxWidthWrapper>
      <div className="flex py-4 justify-between">
        <h2>Você pesquisou por: {search}</h2>
        <div className="flex items-center">
          <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <label htmlFor="my-drawer" className="btn btn-outline">
                Filtrar
              </label>
            </div>
            <div className="drawer-side z-10">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                <div className="flex justify-between">
                  <h3>FILTRAR POR</h3>
                  <button className="btn btn-square btn-outline">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <li>
                  <details open>
                    <summary>Tamanho</summary>
                    <ul>
                      <li>
                        <a>Submenu 1</a>
                      </li>
                      <li>
                        <a>Submenu 2</a>
                      </li>
                    </ul>
                  </details>
                </li>
                <li>
                  <details open>
                    <summary>Estilo</summary>
                    <ul>
                      <li>
                        <a>Submenu 1</a>
                      </li>
                      <li>
                        <a>Submenu 2</a>
                      </li>
                    </ul>
                  </details>
                </li>
              </ul>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-outline m-1">
              Ordenar
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Preço crescente</a>
              </li>
              <li>
                <a>Preço decrescente</a>
              </li>
              <li>
                <a>Promoções</a>
              </li>
              <li>
                <a>Mais procurados</a>
              </li>
            </ul>
          </div>
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

import MaxWidthWrapper from '@/components/layouts/MaxWidthWrapper'
import { prisma } from '@/db/prisma'
import Link from 'next/link'

export default async function AdminProducts() {
  const products = await prisma.product.findMany()

  return (
    <MaxWidthWrapper className="py-8">
      <div className="flex items-center justify-between">
        <h2 className="py-4 font-bold text-2xl">Todos os produtos</h2>
        <Link className="btn btn-outline" href={'/admin/adicionar-produto'}>
          Adicionar produto
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Departamento</th>
              <th>Categoria</th>
              <th>Preço</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.department}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MaxWidthWrapper>
  )
}

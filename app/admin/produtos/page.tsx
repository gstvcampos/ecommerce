import DeleteProductButton from '@/components/buttons/admin/DeleteProductButton'
import EditProductButton from '@/components/buttons/admin/EditProductButton'
import MaxWidthWrapper from '@/components/layouts/MaxWidthWrapper'
import { prisma } from '@/db/prisma'
import Image from 'next/image'
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
              <th></th>
              <th>Produto</th>
              <th>
                Categoria / <br />
                Departamento
              </th>
              <th>Preço</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <Image
                          src={product.imageUrls[0]}
                          alt={product.name}
                          sizes="(min-width: 640px) 25vw, 50vw"
                          fill
                          className="object-cover object-center absolute top-0 left-0"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{product.name}</td>
                <td>
                  <div>
                    <div className="text-sm opacity-50">{product.category}</div>
                    <div className="font-bold">{product.department}</div>
                  </div>
                </td>
                <td>{product.price}</td>
                <th className="flex">
                  <DeleteProductButton productId={product.id} />
                  <EditProductButton productId={product.id} />
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MaxWidthWrapper>
  )
}

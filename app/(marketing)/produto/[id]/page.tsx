import { incrementProductQuantity } from '@/actions/incrementProductQuantity'
import Breadcrumbs from '@/components/Breadcrumbs'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import AddToCartButton from '@/components/buttons/marketing/AddToCartButton'
import { CarouselGalleryWidget } from '@/components/sliders/CarouselGalleryWidget'
import { prisma } from '@/db/prisma'
import { formatPrice } from '@/lib/ultis'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cache } from 'react'

interface ProductDetailProps {
  params: {
    id: string
  }
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } })
  if (!product) notFound()
  return product
})

export async function generateMetadata({
  params: { id },
}: ProductDetailProps): Promise<Metadata> {
  const product = await getProduct(id)

  return {
    title: product.name + 'teststore',
    description: product.description,
  }
}

export default async function ProductDetail({
  params: { id },
}: ProductDetailProps) {
  const product = await getProduct(id)

  return (
    <MaxWidthWrapper className="pb-20">
      <Breadcrumbs
        items={[
          product.department,
          product.category,
          product.name.toLowerCase(),
        ]}
      />
      <div className="flex flex-col md:flex-row">
        <CarouselGalleryWidget imageUrls={product.imageUrls} />
        <div className="join join-vertical md:w-2/5 p-1">
          <h1 className="text-3xl font-bold py-4 w-full">{product.name}</h1>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-semibold">
              {formatPrice(product.price)}
            </span>
            <AddToCartButton
              productId={product.id}
              incrementProductQuantity={incrementProductQuantity}
            />
          </div>
          <div className="collapse collapse-plus p-0">
            <input type="checkbox" defaultChecked />
            <div className="collapse-title">Descrição</div>
            <div className="collapse-content p-0">
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

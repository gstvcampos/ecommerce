import { incrementProductQuantity } from '@/actions/marketing/incrementProductQuantity'
import AddToCartButton from '@/components/buttons/marketing/AddToCartButton'
import Breadcrumbs from '@/components/layouts/Breadcrumbs'
import MaxWidthWrapper from '@/components/layouts/MaxWidthWrapper'
import { CarouselGalleryWidget } from '@/components/sliders/CarouselGalleryWidget'
import { getProductById } from '@/db/products'
import { formatPrice } from '@/lib/ultis'
import { Metadata } from 'next'

interface ProductDetailProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params: { id },
}: ProductDetailProps): Promise<Metadata> {
  const product = await getProductById(id)

  return {
    title: product.name + 'teststore',
    description: product.description,
  }
}

export default async function ProductDetail({
  params: { id },
}: ProductDetailProps) {
  const product = await getProductById(id)

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

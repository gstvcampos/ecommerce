import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import CarouselProducts from '@/components/sliders/CarouselProducts'
import { prisma } from '@/db/prisma'

export default async function Home() {
  const products = await prisma.product.findMany()
  return (
    <>
      <MaxWidthWrapper>
        <CarouselProducts products={products} title="lançamentos" />
        <CarouselProducts products={products} title="masculino" />
      </MaxWidthWrapper>
    </>
  )
}

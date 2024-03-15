import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Banner from '@/components/sliders/Banner'
import CarouselProducts from '@/components/sliders/CarouselProducts'
import { prisma } from '@/db/prisma'

export default async function Home() {
  const products = await prisma.product.findMany()
  const firstEightProducts = products.slice(0, 8)
  const slides = ['/banner1.webp', '/banner2.webp', '/banner3.webp']

  return (
    <>
      <Banner slides={slides} />
      <MaxWidthWrapper>
        <CarouselProducts products={firstEightProducts} title="lançamentos" />
        <CarouselProducts products={firstEightProducts} title="masculino" />
      </MaxWidthWrapper>
    </>
  )
}

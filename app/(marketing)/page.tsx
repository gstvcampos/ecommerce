import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Banner from '@/components/sliders/Banner'
import CarouselProducts from '@/components/sliders/CarouselProducts'
import { prisma } from '@/db/prisma'

export default async function Home() {
  const products = await prisma.product.findMany()
  const slides = ['/estadio.webp', '/estadio1.webp', '/estadio2.webp']
  return (
    <>
      <Banner slides={slides} />
      <MaxWidthWrapper>
        <CarouselProducts products={products} title="lançamentos" />
        <CarouselProducts products={products} title="masculino" />
      </MaxWidthWrapper>
    </>
  )
}

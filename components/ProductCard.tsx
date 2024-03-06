import { formatPrice } from '@/lib/ultis'
import { Product } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={'/produto/' + product.id}
      className="card text-sm h-full shadow-lg"
      replace
    >
      <div className="overflow-hidden">
        <div className="relative block w-full pt-[100%]">
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            fill
            className="object-cover object-center absolute top-0 left-0"
          />
        </div>
      </div>
      <div className="flex flex-col items-end p-2">
        <h2 className="font-bold line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h2>{' '}
        <p className="font-bold text-lg">{formatPrice(product.price)}</p>
      </div>
    </Link>
  )
}

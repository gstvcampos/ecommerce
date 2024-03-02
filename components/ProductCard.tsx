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
      className="block border text-sm max-w-64"
      replace
    >
      <div className="relative block h-72 w-full">
        <Image
          src={product.imageUrls[0]}
          alt={product.name}
          fill
          className="object-cover"
        />
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

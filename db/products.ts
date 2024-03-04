import { notFound } from 'next/navigation'
import { cache } from 'react'
import { prisma } from './prisma'

export const getSearchProducts = cache(async (search: string) => {
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

export const getProducts = cache(
  async (department: string, category?: string) => {
    const products = await prisma.product.findMany({
      where: {
        department,
        category,
      },
    })
    if (!products) notFound()
    return products
  },
)

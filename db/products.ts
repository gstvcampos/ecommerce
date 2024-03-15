import { notFound } from 'next/navigation'
import { cache } from 'react'
import { prisma } from './prisma'

export const countProducts = cache(
  async (department: string, category?: string) => {
    const count = await prisma.product.count({
      where: {
        department,
        category,
      },
    })
    return count
  },
)

export const getProducts = cache(
  async (
    department: string,
    category?: string,
    itemsPeerPage?: number,
    skip?: number,
    sort?: 'asc' | 'desc',
  ) => {
    const products = await prisma.product.findMany({
      where: {
        department,
        category,
      },
      take: itemsPeerPage,
      skip,
      orderBy: {
        price: sort,
      },
    })
    if (!products) notFound()
    return products
  },
)

export const countSearchProducts = cache(async (search: string) => {
  const count = await prisma.product.count({
    where: {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { department: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } },
      ],
    },
  })
  return count
})

export const getSearchProducts = cache(
  async (
    search: string,
    itemsPeerPage?: number,
    skip?: number,
    sort?: 'asc' | 'desc',
  ) => {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { department: { contains: search, mode: 'insensitive' } },
          { category: { contains: search, mode: 'insensitive' } },
        ],
      },
      take: itemsPeerPage,
      skip,
      orderBy: {
        price: sort,
      },
    })
    if (!products) notFound()
    return products
  },
)

export const getProductById = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } })
  if (!product) notFound()
  return product
})

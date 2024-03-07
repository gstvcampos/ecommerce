import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number) {
  return price.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  })
}

export function calcPagination(page: number, countItems: number) {
  const itemsPeerPage = 4
  const skip = (page - 1) * itemsPeerPage
  const totalPages = Math.ceil(countItems / itemsPeerPage)
  return { skip, totalPages, itemsPeerPage }
}

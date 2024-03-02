'use server'

import { prisma } from '@/db/prisma'
import { revalidatePath } from 'next/cache'
import { createCart, getCart } from '../db/cart'

export async function incrementProductQuantity(productId: string) {
  const cart = (await getCart()) ?? (await createCart())

  const articleInCart = cart.items.find((item) => item.productId === productId)

  if (articleInCart) {
    await prisma.cartItem.update({
      where: { id: articleInCart.id },
      data: { quantity: { increment: 1 } },
    })
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity: 1,
      },
    })
  }

  revalidatePath('layout')
}
